# Self-hosted Umami analytics — deployment runbook

**Date:** 2026-08-13
**Status:** app side implemented and merged-ready; the Coolify deploy below is a
manual one-time step for Ibrahim.
**Supersedes for the marketing site:** the PostHog-only setup in
[`ANALYTICS-SETUP.md`](../../ANALYTICS-SETUP.md). PostHog is **not** removed —
see §6.

---

## 1. Why

The PostHog wiring loads nothing until a visitor clicks **Accept** on the cookie
banner. That is correct for PostHog, which sets cookies and a persistent
identifier. The cost is that the numbers only describe people who click Accept —
typically a minority, and a biased one.

Umami is cookieless: no cookies, no localStorage, no persistent cross-session
identifier. Visitors are counted with a daily-rotated salted hash that is never
stored on the device. Nothing is written to or read from the visitor's terminal
equipment, so the ePrivacy/PECR storage rule has nothing to attach to and there
is no consent gate.

Practical effect: **you measure everyone.**

Second benefit: it is served from `analytics.itqanstudio.com`, a first-party
domain, so it is not caught by the tracker-blocking lists that silently eat a
large share of third-party analytics traffic.

## 2. What is already done (in this repo, no action needed)

| File | Role |
|---|---|
| `src/app/api/analytics-config/route.ts` | `force-dynamic` route returning `{scriptUrl, websiteId}` from env at **request** time, `{}` when unset |
| `src/components/providers/UmamiAnalytics.tsx` | Client loader: honours DNT/GPC, fetches the config, injects the tracker once |
| `src/app/layout.tsx` | Renders `<UmamiAnalytics />` outside any consent gate |
| `deploy/umami/docker-compose.yml` | The stack to deploy on Coolify |

**The request-time route is the important part.** A `NEXT_PUBLIC_*` variable is
inlined at build time, so with static generation the tracker gets frozen into
the deploy as "absent" — which is why `ANALYTICS-SETUP.md` has to warn "you must
**rebuild**, not just restart". Reading env at request time removes that trap
entirely: after step 5 below, toggling analytics is an env change plus a
restart.

## 3. Deploy Umami on Coolify

1. **DNS** — add an `A` record for `analytics.itqanstudio.com` pointing at the
   Coolify server's IP. Wait for it to resolve before step 4, or Let's Encrypt
   issuance fails and Coolify retries on a backoff.

2. **New resource** — in Coolify: *+ New* → *Docker Compose*. Paste the contents
   of `deploy/umami/docker-compose.yml`.

3. **Environment variables** — in the resource's *Environment* tab:

   | Variable | Value |
   |---|---|
   | `POSTGRES_PASSWORD` | `openssl rand -base64 32` |
   | `APP_SECRET` | `openssl rand -base64 40` |

   Both are referenced with `${VAR:?...}` in the compose file, so a missing one
   fails the deploy loudly instead of booting a broken container.

4. **Domain** — set the domain on the **`umami`** service (not `umami-db`) to
   `analytics.itqanstudio.com`, port **3000**. Coolify terminates TLS and issues
   the certificate.

5. **Deploy**, then watch the logs. First boot runs the full schema migration and
   takes up to ~90s; `start_period` in the healthcheck accounts for this.

6. **First login** — `admin` / `umami`. **Rotate this immediately**: Settings →
   Profile → change password. The dashboard is internet-facing.

7. **Create the website entry** — Settings → Websites → *Add website*.
   Name `itqanstudio.com`, domain `itqanstudio.com`. Copy the generated
   **Website ID** (a UUID).

## 4. Point the site at it

Set these two on the **itqan-website** service (Coolify or Netlify env, wherever
the site actually runs), then **restart** — no rebuild needed:

| Variable | Value |
|---|---|
| `UMAMI_SCRIPT_URL` | `https://analytics.itqanstudio.com/script.js` |
| `UMAMI_WEBSITE_ID` | the UUID from step 3.7 |

Note these are **not** `NEXT_PUBLIC_*`. They are read server-side by the route
handler and returned to the client as JSON. The values are public either way —
a Umami website id appears in the page source of every site using it, exactly
like a GA measurement id — but keeping them non-`NEXT_PUBLIC_` is what makes the
request-time read possible.

To turn analytics off: unset either variable and restart. The route returns `{}`
and the loader does nothing.

## 5. Verify

1. Open the live site in a fresh private window. **Do not touch the cookie
   banner** — that is the point.
2. DevTools → Network: expect `analytics-config` (200, JSON with both fields),
   then `script.js` from `analytics.itqanstudio.com`, then a `POST` to
   `/api/send` on navigation.
3. DevTools → Application → Cookies **and** Local Storage: Umami must have added
   **nothing**. If it has, stop and re-check the image tag.
4. Umami dashboard: the pageview appears within a few seconds.
5. Re-test with DNT enabled (Firefox: *Settings → Privacy → Send websites a "Do
   Not Track" signal*). Expect **no** `analytics-config` request at all.

## 6. What happens to PostHog

It stays wired and stays behind the consent banner. It is not removed by this
change, and it remains dormant unless `NEXT_PUBLIC_POSTHOG_KEY` is set.

Decide later, with data rather than in advance:

- **Keep both** — Umami for honest traffic numbers, PostHog for funnels, session
  behaviour and feature flags on the consenting subset.
- **Drop PostHog** — delete `NEXT_PUBLIC_POSTHOG_KEY` and redeploy. The provider
  makes zero network calls without it. Removing the component and the dependency
  is then a small, separate PR.

Do not delete the cookie banner on the strength of this change alone: it also
covers any other cookie the site sets. Umami simply no longer depends on it.

## 7. Cost and operations

- **Marginal cost:** the Umami container is ~256 MB RAM; Postgres ~256 MB. If the
  Coolify VPS already exists, this is effectively free.
- **Backups:** the `umami-db-data` volume holds all history. Add it to whatever
  backs up the VPS. Analytics history is not reproducible.
- **Upgrades:** bump the pinned tag deliberately — read release notes, snapshot
  the volume, then redeploy. Never move to `latest`: Umami migrates its own
  schema on boot, so `latest` lets an unattended restart migrate the database at
  an arbitrary moment.

## 8. Deliberately not done

- **No CDN in front of the dashboard.** Traffic is tiny, there is no caching
  value, and Coolify's proxy already terminates TLS. Revisit only if the tracker
  script itself needs edge latency.
- **No SSO gate on the dashboard.** Millow puts Google OIDC at the load balancer
  in front of Umami, because their ALB supports `authenticate-oidc` natively.
  Coolify's Traefik has no equivalent one-liner, so the dashboard is protected by
  Umami's own login — which makes step 3.6 (rotating the default password)
  load-bearing, not optional. If you want a second layer later, Traefik basic-auth
  middleware on the router is the cheap version.
