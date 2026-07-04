// src/lib/listmonk.ts
//
// Minimal typed client for the self-hosted Listmonk instance
// (https://mail.shareefi.co) that replaced Kit (ConvertKit) as this site's
// subscriber store + transactional sender.
//
// Auth: Listmonk's API token auth — "Authorization: token <user>:<token>",
// created in Settings > Users. Base URL + credentials come from env so the
// same code works across environments.

const LISTMONK_FETCH_TIMEOUT_MS = 15_000;

/** Error carrying the HTTP status to return + a short body snippet for logs. */
export class ListmonkError extends Error {
  status: number;
  bodySnippet: string;
  constructor(message: string, status: number, bodySnippet: string) {
    super(message);
    this.name = "ListmonkError";
    this.status = status;
    this.bodySnippet = bodySnippet;
  }
}

function baseUrl(): string {
  const url = process.env.LISTMONK_URL;
  if (!url) throw new Error("LISTMONK_URL is not set");
  return url.replace(/\/+$/, "");
}

function authHeader(): string {
  const user = process.env.LISTMONK_API_USER;
  const token = process.env.LISTMONK_API_TOKEN;
  if (!user || !token) {
    throw new Error("LISTMONK_API_USER / LISTMONK_API_TOKEN is not set");
  }
  return `token ${user}:${token}`;
}

/** Read a short, safe snippet of an error response body for logging. */
async function safeBodySnippet(res: Response): Promise<string> {
  try {
    const txt = await res.text();
    return txt.slice(0, 300);
  } catch {
    return "(unreadable body)";
  }
}

/** fetch wrapper: injects auth + JSON headers, enforces a 15s timeout. */
async function listmonkFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LISTMONK_FETCH_TIMEOUT_MS);
  try {
    return await fetch(`${baseUrl()}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        Authorization: authHeader(),
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

export interface UpsertSubscriberInput {
  email: string;
  name?: string;
  listIds: number[];
  attribs?: Record<string, unknown>;
  /** true = confirmed immediately (explicit request, e.g. lead magnet). false = double opt-in. */
  preconfirm: boolean;
}

export interface ListmonkSubscriber {
  id: number;
  email: string;
  name: string;
  attribs: Record<string, unknown>;
  lists?: Array<{ id: number; subscription_status?: string }>;
}

interface SubscriberResponse {
  data?: ListmonkSubscriber;
}

interface SubscribersQueryResponse {
  data?: {
    results?: ListmonkSubscriber[];
  };
}

/** Shallow attribute merge: arrays (e.g. tags) are unioned, everything else is overwritten. */
function mergeAttribs(
  existing: Record<string, unknown>,
  incoming: Record<string, unknown>
): Record<string, unknown> {
  const merged: Record<string, unknown> = { ...existing };
  for (const [key, value] of Object.entries(incoming)) {
    const existingValue = existing[key];
    if (Array.isArray(value) && Array.isArray(existingValue)) {
      merged[key] = Array.from(new Set([...existingValue, ...value]));
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

/** Escape a single-quoted string for use inside a Listmonk/SQL query param. */
function escapeSqlString(value: string): string {
  return value.replace(/'/g, "''");
}

async function findSubscriberByEmail(
  email: string
): Promise<ListmonkSubscriber | null> {
  const query = `subscribers.email='${escapeSqlString(email)}'`;
  const res = await listmonkFetch(
    `/api/subscribers?query=${encodeURIComponent(query)}`
  );
  if (!res.ok) {
    const snippet = await safeBodySnippet(res);
    throw new ListmonkError(
      `subscriber lookup failed (${res.status})`,
      502,
      snippet
    );
  }
  const data = (await res.json()) as SubscribersQueryResponse;
  const match = data.data?.results?.[0];
  return match ?? null;
}

/**
 * Create the subscriber, or on a 409 (already exists) fetch the existing one
 * and PUT an update with the union of lists + shallow-merged attribs,
 * keeping the existing name when one is already set.
 */
export async function upsertSubscriber(
  input: UpsertSubscriberInput
): Promise<ListmonkSubscriber> {
  const createRes = await listmonkFetch("/api/subscribers", {
    method: "POST",
    body: JSON.stringify({
      email: input.email,
      name: input.name ?? "",
      status: "enabled",
      lists: input.listIds,
      attribs: input.attribs ?? {},
      preconfirm_subscriptions: input.preconfirm,
    }),
  });

  if (createRes.ok) {
    const created = (await createRes.json()) as SubscriberResponse;
    if (!created.data) {
      throw new ListmonkError(
        "subscriber create returned no data",
        502,
        "(empty data)"
      );
    }
    return created.data;
  }

  if (createRes.status !== 409) {
    const snippet = await safeBodySnippet(createRes);
    throw new ListmonkError(
      `subscriber create failed (${createRes.status})`,
      502,
      snippet
    );
  }

  // 409: subscriber already exists — fetch + merge + update.
  const existing = await findSubscriberByEmail(input.email);
  if (!existing) {
    throw new ListmonkError(
      "subscriber reported as existing (409) but not found on lookup",
      502,
      "(no match)"
    );
  }

  const existingListIds = (existing.lists ?? []).map((l) => l.id);
  const unionListIds = Array.from(new Set([...existingListIds, ...input.listIds]));
  const mergedAttribs = mergeAttribs(existing.attribs ?? {}, input.attribs ?? {});
  const name = existing.name?.trim() ? existing.name : input.name ?? "";

  const updateRes = await listmonkFetch(`/api/subscribers/${existing.id}`, {
    method: "PUT",
    body: JSON.stringify({
      email: input.email,
      name,
      status: "enabled",
      lists: unionListIds,
      attribs: mergedAttribs,
      preconfirm_subscriptions: input.preconfirm,
    }),
  });

  if (!updateRes.ok) {
    const snippet = await safeBodySnippet(updateRes);
    throw new ListmonkError(
      `subscriber update failed (${updateRes.status})`,
      502,
      snippet
    );
  }

  const updated = (await updateRes.json()) as SubscriberResponse;
  if (!updated.data) {
    throw new ListmonkError(
      "subscriber update returned no data",
      502,
      "(empty data)"
    );
  }
  return updated.data;
}

export interface SendTxInput {
  subscriberEmail: string;
  templateId: number;
  data?: Record<string, unknown>;
}

/** Send a transactional email via Listmonk. Returns true on success, false otherwise. */
export async function sendTx(input: SendTxInput): Promise<boolean> {
  try {
    const res = await listmonkFetch("/api/tx", {
      method: "POST",
      body: JSON.stringify({
        subscriber_email: input.subscriberEmail,
        template_id: input.templateId,
        data: input.data ?? {},
      }),
    });
    if (!res.ok) {
      const snippet = await safeBodySnippet(res);
      console.error(`[listmonk] tx send failed (${res.status})`, snippet);
      return false;
    }
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[listmonk] tx send error:", msg);
    return false;
  }
}
