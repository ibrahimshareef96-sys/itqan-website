import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/leads/capture
 *
 * Hit by the magnet landing page opt-in form. Adds the email to Kit.com,
 * creates / applies a tag matching the magnet's DM keyword. Kit
 * automations triggered by that tag deliver the magnet content as
 * Email 0 of the drip sequence.
 *
 * Body: { email: string, magnetSlug: string, dmKeyword: string, firstName?: string }
 *
 * Same Kit account is used for both Itqan and Shareefico magnets. The
 * sender shows as Shareefico (since that's where the Kit account lives),
 * but the magnet content and the brand the email teaches matches whatever
 * the user opted in to. Ibrahim's confirmed this is fine ("people just
 * look at the header, I'm the founder of both anyway").
 */
export async function POST(req: NextRequest) {
  let payload: {
    email?: string;
    magnetSlug?: string;
    dmKeyword?: string;
    firstName?: string;
  };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { email, magnetSlug, dmKeyword, firstName } = payload;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Valid email required" },
      { status: 400 }
    );
  }
  if (!magnetSlug || !dmKeyword) {
    return NextResponse.json(
      { ok: false, error: "magnetSlug and dmKeyword required" },
      { status: 400 }
    );
  }

  const kitApiKey = process.env.KIT_API_KEY;
  if (!kitApiKey) {
    console.error("[leads/capture] KIT_API_KEY not set");
    return NextResponse.json(
      { ok: false, error: "Kit not configured" },
      { status: 500 }
    );
  }

  try {
    // 1. Create or find the subscriber in Kit
    const subRes = await fetch("https://api.kit.com/v4/subscribers", {
      method: "POST",
      headers: {
        "X-Kit-Api-Key": kitApiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        first_name: firstName ?? undefined,
        state: "active",
      }),
    });

    if (!subRes.ok && subRes.status !== 422) {
      const txt = await subRes.text();
      console.error(
        "[leads/capture] Kit subscriber create failed",
        subRes.status,
        txt.slice(0, 300)
      );
      return NextResponse.json(
        { ok: false, error: "Subscription failed" },
        { status: 500 }
      );
    }

    // 2. Tag the subscriber with the magnet's DM keyword (e.g. "magnet-foundation")
    const tagName = `magnet-${dmKeyword.toLowerCase()}`;

    const tagsRes = await fetch("https://api.kit.com/v4/tags", {
      headers: { "X-Kit-Api-Key": kitApiKey, Accept: "application/json" },
    });
    let tagId: number | undefined;
    if (tagsRes.ok) {
      const tagsData = await tagsRes.json();
      const existing = (tagsData.tags ?? []).find(
        (t: { id: number; name: string }) => t.name === tagName
      );
      tagId = existing?.id;
    }
    if (!tagId) {
      const createTagRes = await fetch("https://api.kit.com/v4/tags", {
        method: "POST",
        headers: {
          "X-Kit-Api-Key": kitApiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: tagName }),
      });
      if (createTagRes.ok) {
        const tagData = await createTagRes.json();
        tagId = tagData?.tag?.id;
      }
    }

    if (tagId) {
      await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers`, {
        method: "POST",
        headers: {
          "X-Kit-Api-Key": kitApiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email_address: email }),
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Subscribed. Check your inbox.",
      magnetSlug,
      tag: tagName,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[leads/capture] error:", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
