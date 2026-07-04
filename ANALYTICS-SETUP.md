# Analytics setup (PostHog)

Product analytics for itqanstudio.com, wired privacy-first: **nothing loads and no
network request is made until a visitor accepts cookies** — and nothing loads at all
unless the PostHog key is set. Local/dev runs with zero analytics by default.

You only need to do the one-time steps below to turn it on in production.

---

## 1. Create a free PostHog account (EU cloud)

1. Go to **https://eu.posthog.com/signup** — use the **EU** cloud, not US. This keeps
   visitor data in-region (GCC/EU data residency).
2. Create a project (e.g. `itqan-website`).
3. Open **Settings → Project → General** and copy:
   - **Project API Key** — starts with `phc_...` (this is public/client-side; safe in the browser).
   - **Host** — for EU cloud this is `https://eu.i.posthog.com`.

The free tier does not need a credit card.

---

## 2. Set the environment variables in Coolify

In the Coolify service for this site, add two environment variables:

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_POSTHOG_KEY` | `phc_...` | Your Project API Key. **Required** — without it analytics stay off. |
| `NEXT_PUBLIC_POSTHOG_HOST` | `https://eu.i.posthog.com` | Optional. Defaults to this EU host if omitted. |

Both are `NEXT_PUBLIC_*` so they are inlined into the client bundle at **build time** —
after setting them you must **rebuild**, not just restart.

Then **redeploy** the service in Coolify so a fresh build picks up the values.

To turn analytics off again, delete `NEXT_PUBLIC_POSTHOG_KEY` and redeploy.

---

## 3. Verify it works

1. Open the live site in a fresh browser profile.
2. You should see the cookie banner. Click **Accept**.
3. In PostHog → **Activity** (or **Web analytics**), you should see a `$pageview`
   appear within a few seconds. Navigate between pages — each route change records
   another `$pageview`.
4. Click **Decline** on a fresh profile instead: no events should be recorded, and if
   PostHog had already loaded it opts out and clears its stored data.

---

## What gets tracked

- **Pageviews** (`$pageview`) — on first load and on every client-side route change
  (App Router navigation), plus **pageleave** (`$pageleave`) for time-on-page.
- **Autocapture** — clicks, form submits, and input interactions are captured
  automatically by PostHog with element metadata (no per-element code needed). This is
  what powers the theme-toggle and contact-form insights below.
- Standard device/browser/referrer/UTM context PostHog attaches to every event.

**Privacy guarantees built into the code:**
- No analytics until the visitor **accepts** cookies (opt-in), matching the existing
  cookie banner. Decline → `opt_out_capturing()` (stops capture, clears data).
- **Do Not Track is respected** even for visitors who accepted cookies.
- No key set → the provider renders children only and makes **zero** network calls.
- Data persistence uses `localStorage+cookie` and only after consent.

---

## Free-tier limits (at time of writing — check current PostHog pricing)

The PostHog free tier includes a generous monthly allowance and resets monthly:
- ~**1,000,000 events/month** for product analytics.
- ~**5,000 session recordings/month** (recordings are **not** enabled here).
- Feature flags, dashboards, and insights included.

For a marketing site this is far more headroom than needed. If you ever approach the
cap, PostHog stops ingesting for the rest of the month (it does not auto-bill on the
free plan unless you explicitly add a card and raise limits).

Only pageviews/pageleave and autocapture are enabled here, so event volume stays low.

---

## 3 useful starter insights

Create these in PostHog → **Product analytics → New insight**.

### 1. Top pages
- Insight type: **Trends**.
- Event: `$pageview`, **Total count**.
- Break down by: **`$current_url`** (or **`$pathname`**).
- Shows which pages get the most traffic — your homepage vs `/work`, `/services`, etc.

### 2. Conversion to the contact form submit
- Insight type: **Funnel**.
- Step 1: `$pageview` where **`$current_url`** contains `/contact`.
- Step 2: `$autocapture` where the event is a **form submit** — filter on the
  autocaptured element (`$event_type` = `submit`, or the form's action containing
  `formspree.io`). The contact form posts natively to Formspree, so PostHog autocaptures
  the submit without extra code.
- Gives you the % of contact-page visitors who actually submit — your core conversion.

### 3. Theme-toggle usage (via autocapture)
- Insight type: **Trends**.
- Event: `$autocapture`, **Total count** (or **Unique users**).
- Filter to the theme toggle element — e.g. autocapture property
  **`$el_text`** / **`$elements`** targeting the theme switch button (add a
  `data-attr` on the toggle later if you want a cleaner filter). Autocapture already
  records the click; this just isolates it.
- Tells you how many visitors flip between light and dark — signal for whether the
  dark theme earns its keep.

> Tip: once you know which interactions matter, add `data-attr="..."` attributes to
> those elements. Autocapture will then expose a clean, stable filter for each.
