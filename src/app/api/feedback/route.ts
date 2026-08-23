import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/feedback
 *
 * Client-testimonial form (feedback.itqanstudio.com → /feedback). Emails the
 * submission to Ibrahim over the same SES SMTP transport as /api/contact —
 * the answers ARE the testimonial raw material, and his inbox is where every
 * other lead already lands, so v1 deliberately has no database.
 *
 * Body: { name, company?, role?, email?, rating, built, changed, quote,
 *         improve?, publishOk, project?, website? }
 * `website` is a honeypot: hidden field, humans never fill it. A filled value
 * returns a fake success and sends nothing.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SMTP_TIMEOUT_MS = 15_000;
/** Longest answer we accept — testimonials are paragraphs, not essays. */
const MAX_ANSWER = 2_000;
const MAX_SHORT = 150;

function str(value: unknown, max: number): string {
  // Strip C0/C1 control chars EXCEPT \n (U+000A) - answers are multi-line, but nothing
  // else control-shaped belongs in text that lands in an email body. Written as unicode
  // ESCAPES on purpose: literal control bytes in source are invisible and uneditable.
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0009\u000B-\u001F\u007F-\u009F]/g, "")
    .trim()
    .slice(0, max);
}

/** Single-line variant for fields that can reach the email SUBJECT — `str()` deliberately
 *  preserves newlines for multi-line answers, which a subject must never contain. */
function shortStr(value: unknown, max: number): string {
  return str(value, max).replace(/\n/g, " ").trim();
}

function line(label: string, value: string): string {
  return value ? `${label}: ${value}\n` : "";
}

/**
 * The client IP as established by OUR proxy, not by the client.
 *
 * Traefik (the only hop in front of this container) APPENDS the real peer address to any
 * X-Forwarded-For the client sent — so the FIRST value is attacker-writable and the LAST
 * value is the one our own edge observed. Keying the rate limiter on the first value would
 * hand out a fresh bucket per spoofed header, which on an endpoint that sends a real email
 * per request means unbounded sends and SES reputation damage. Deployment assumption
 * (single Traefik hop) is the same one the in-memory limiter itself already makes.
 */
function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",");
    const last = parts[parts.length - 1]?.trim();
    if (last) return last;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  // One real email per submission → cap per-IP like the other public senders.
  const limit = rateLimit(`feedback:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Honeypot: pretend success, send nothing.
  if (str(payload.website, MAX_SHORT)) {
    return NextResponse.json({ ok: true });
  }

  const name = shortStr(payload.name, MAX_SHORT);
  const company = shortStr(payload.company, MAX_SHORT);
  const role = shortStr(payload.role, MAX_SHORT);
  const email = shortStr(payload.email, MAX_SHORT);
  const built = str(payload.built, MAX_ANSWER);
  const changed = str(payload.changed, MAX_ANSWER);
  const quote = str(payload.quote, MAX_ANSWER);
  const improve = str(payload.improve, MAX_ANSWER);
  const project = shortStr(payload.project, MAX_SHORT);
  const publishOk = payload.publishOk === true;
  const rating = Number(payload.rating);

  if (!name) {
    return NextResponse.json({ ok: false, error: "Name is required" }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ ok: false, error: "Rating 1-5 required" }, { status: 400 });
  }
  // The one answer the form exists to collect.
  if (!quote) {
    return NextResponse.json(
      { ok: false, error: "The recommendation answer is required" },
      { status: 400 }
    );
  }

  const smtpHost = process.env.SES_SMTP_HOST;
  const smtpPort = process.env.SES_SMTP_PORT;
  const smtpUser = process.env.SES_SMTP_USERNAME;
  const smtpPass = process.env.SES_SMTP_PASSWORD;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !toEmail || !fromEmail) {
    console.error("[feedback] SES SMTP / contact envs not fully set");
    return NextResponse.json(
      { ok: false, error: "Form not configured" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: { user: smtpUser, pass: smtpPass },
    connectionTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  });

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
  const bodyText =
    line("Project", project) +
    line("Name", name) +
    line("Company", company) +
    line("Role", role) +
    line("Email", email) +
    `Rating: ${stars} (${rating}/5)\n` +
    `May publish with name: ${publishOk ? "YES" : "no — internal only"}\n` +
    (built ? `\nWhat we built together:\n${built}\n` : "") +
    (changed ? `\nWhat changed for them:\n${changed}\n` : "") +
    `\nTheir words (the testimonial):\n${quote}\n` +
    (improve ? `\nWhat we should do better:\n${improve}\n` : "");

  try {
    await transporter.sendMail({
      from: `Itqan Studio <${fromEmail}>`,
      to: toEmail,
      ...(email ? { replyTo: email } : {}),
      subject: `[feedback] ${stars} ${name}${project ? ` · ${project}` : ""}`,
      text: bodyText,
    });
  } catch (err) {
    console.error("[feedback] send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
