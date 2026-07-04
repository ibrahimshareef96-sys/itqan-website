import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/contact
 *
 * Contact page inquiry form (ContactForm.tsx). Sends the message over
 * Amazon SES SMTP via nodemailer straight to Ibrahim's inbox — replaces the
 * earlier Formspree submission (Kit/Formspree removal pass).
 *
 * Body: { name, email, company?, website?, budget?, phone?, message, intent? }
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SMTP_TIMEOUT_MS = 15_000;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  website?: unknown;
  budget?: unknown;
  phone?: unknown;
  message?: unknown;
  intent?: unknown;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/** Format a labeled line for the plain-text email body, omitting empty values. */
function line(label: string, value: string): string {
  return value ? `${label}: ${value}\n` : "";
}

export async function POST(req: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const name = str(payload.name);
  const email = str(payload.email);
  const company = str(payload.company);
  const website = str(payload.website);
  const budget = str(payload.budget);
  const phone = str(payload.phone);
  const message = str(payload.message);
  const intent = str(payload.intent);

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "Name is required" },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Valid email required" },
      { status: 400 }
    );
  }
  if (!message) {
    return NextResponse.json(
      { ok: false, error: "Message is required" },
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
    console.error("[contact] SES SMTP / contact envs not fully set");
    return NextResponse.json(
      { ok: false, error: "Contact form not configured" },
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

  const bodyText =
    line("Name", name) +
    line("Email", email) +
    line("Company", company) +
    line("Website", website) +
    line("Budget", budget) +
    line("Phone", phone) +
    line("Intent", intent) +
    `\nMessage:\n${message}\n`;

  try {
    await transporter.sendMail({
      from: `Itqan Studio <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `[itqanstudio.com] Inquiry from ${name}`,
      text: bodyText,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] SES send failed:", msg);
    return NextResponse.json(
      { ok: false, error: "Message failed to send. Please try again." },
      { status: 502 }
    );
  }
}
