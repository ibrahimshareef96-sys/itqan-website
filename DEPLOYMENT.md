# Deployment & Hosting — READ BEFORE ANY DEPLOY

> **itqanstudio.com moved OFF Netlify (2026-06) — it was the first/pilot migration.**
> It now runs on Ibrahim's self-hosted AWS box. Do NOT redeploy to Netlify/Vercel.
> This is the **marketing site** (Next.js) — **no application database**.

## Where it runs
- **Host:** AWS EC2 `52.212.71.212` (eu-west-1), managed by **Coolify** (`http://52.212.71.212:8000`).
- **App:** Coolify app **`itqanstudio`** (uuid `cybvxnemzusk0yzjcwzrey3v`), build pack **nixpacks**, Next.js on :3001. Serves **https://itqanstudio.com** + **https://www.itqanstudio.com**.
- **Database:** **none** — this is a content/marketing site (no Supabase, no Postgres). (The CRM at `portal.itqanstudio.com` is a *separate* app/repo, `itqan-crm`, with its own self-hosted Supabase.)

## How to deploy — just push
- **`git push origin main`** → GitHub webhook auto-rebuilds in Coolify (~3-5 min). No manual step.
- Manual trigger: `curl -H "Authorization: Bearer $COOLIFY_TOKEN" "http://52.212.71.212:8000/api/v1/deploy?uuid=cybvxnemzusk0yzjcwzrey3v&force=false"` (token: `~/Desktop/aws-migration/secrets/coolify-api.env`).
- **Env vars live in Coolify** (app → Environment Variables), not in a `.env` on the box.

## Backups / DR
- **No DB to back up.** The whole box (incl. this app + its config) is captured by **daily AMIs** (DLM policy `policy-09cd80b526ed584a1`, retain 7) — full-box restore in minutes. See `~/Desktop/aws-migration/DR-RUNBOOK.md`.

## Monitoring
- Route 53 health check + CloudWatch alarm `uptime-itqanstudio-com` → SNS email on downtime.

## Box access (IP rotates → prefer SSM)
`aws ssm start-session --target i-0ea77f0db834833dc` (no SSH/IP whitelisting needed).

## Central record
Full migration history + all infra: `~/Desktop/aws-migration/handover.md` (same machine).
