// Uses the Web Crypto API (available in both the Node.js runtime and the Edge
// runtime) rather than `node:crypto`, since this module is imported from
// `src/middleware.ts`, which runs on the Edge runtime by default.

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET!),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return toHex(signature);
}

export async function createSessionCookieValue(): Promise<{ value: string; maxAge: number }> {
  const expiry = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const signature = await hmac(String(expiry));
  return { value: `${expiry}.${signature}`, maxAge: SESSION_MAX_AGE_SECONDS };
}

export async function isValidSessionCookieValue(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  const [expiryStr, signature] = cookieValue.split('.');
  if (!expiryStr || !signature) return false;

  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;

  const expected = await hmac(expiryStr);
  return timingSafeEqualHex(expected, signature);
}

export function verifyAdminPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  return timingSafeEqualHex(
    toHex(new TextEncoder().encode(expected).buffer as ArrayBuffer),
    toHex(new TextEncoder().encode(candidate).buffer as ArrayBuffer),
  );
}

export { SESSION_COOKIE_NAME };
