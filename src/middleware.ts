import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "shs_admin_session";
const SESSION_MAX_AGE_MS = 60 * 60 * 8 * 1000;

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    (process.env.NODE_ENV !== "production" ? "shs-local-dev-secret" : "")
  );
}

async function hmacHex(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

async function verify(token: string | undefined) {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;

  const [payload, sig] = token.split(".");
  if (!payload || !sig || !payload.startsWith("admin:")) return false;

  const ts = Number(payload.slice("admin:".length));
  if (!Number.isFinite(ts)) return false;
  const age = Date.now() - ts;
  if (age < 0 || age > SESSION_MAX_AGE_MS) return false;

  const expected = await hmacHex(payload, secret);
  return timingSafeEqualHex(sig, expected);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname.startsWith("/admin/login")) return NextResponse.next();

  const token = request.cookies.get(COOKIE)?.value;
  if (!(await verify(token))) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    url.searchParams.set("reason", "expired");
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
