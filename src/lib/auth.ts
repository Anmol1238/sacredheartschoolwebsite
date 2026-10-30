import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "shs_admin_session";
const SESSION_MAX_AGE_MS = 60 * 60 * 8 * 1000;

function requireEnv(name: string, fallbackDev?: string) {
  const value = process.env[name] || (process.env.NODE_ENV !== "production" ? fallbackDev : undefined);
  if (!value) {
    throw new Error(`${name} must be set in production`);
  }
  return value;
}

export function sessionSecret() {
  return requireEnv("ADMIN_SESSION_SECRET", "shs-local-dev-secret");
}

function adminPassword() {
  return requireEnv("ADMIN_PASSWORD", "admin123");
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("hex");
}

export function createSessionToken() {
  const payload = `admin:${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig || !payload.startsWith("admin:")) return false;

  const ts = Number(payload.slice("admin:".length));
  if (!Number.isFinite(ts)) return false;
  const age = Date.now() - ts;
  if (age < 0 || age > SESSION_MAX_AGE_MS) return false;

  const expected = sign(payload);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function isAuthenticated() {
  const jar = await cookies();
  return verifySessionToken(jar.get(COOKIE)?.value);
}

export async function setSessionCookie() {
  const jar = await cookies();
  jar.set(COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export function checkPassword(password: string) {
  const expected = adminPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export { COOKIE, SESSION_MAX_AGE_MS };
