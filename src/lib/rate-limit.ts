// Minimal in-memory fixed-window rate limiter.
//
// Production runs as a SINGLE long-lived Node container (AWS EC2 + Coolify,
// `next start`), so a process-local Map is an effective limiter here — no
// external store needed. (This would NOT hold on multi-instance/serverless;
// it's deliberately scoped to this deployment shape. Ported from itqan-crm.)
//
// Used to protect the public, unauthenticated magnet opt-in endpoint, which
// sends a real transactional email per call — capping per-IP and per-email
// requests blunts spam/backscatter abuse against the itqanstudio.com sending
// reputation.

interface Bucket {
  count: number;
  resetAt: number; // epoch ms
}

const store = new Map<string, Bucket>();
const MAX_KEYS = 10_000; // memory backstop

function sweep(now: number): void {
  const expired: string[] = [];
  store.forEach((bucket, key) => {
    if (bucket.resetAt <= now) expired.push(key);
  });
  expired.forEach((key) => store.delete(key));
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

/**
 * Fixed-window limiter: allow up to `max` hits per `windowMs` for a given key.
 * Returns `allowed:false` with the seconds until the window resets when over.
 */
export function rateLimit(
  key: string,
  max: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  if (store.size > MAX_KEYS) sweep(now);

  const bucket = store.get(key);
  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
