import { NextResponse } from "next/server";
import { checkPassword, setSessionCookie } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = rateLimit(`login:${clientIp(request)}`, 8, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const password = String(body.password || "");
    if (!checkPassword(password)) {
      return NextResponse.json({ error: "invalid" }, { status: 401 });
    }
    await setSessionCookie();
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
