import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getContent, getPublicContent, saveContent } from "@/lib/content";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  const content = await getContent();
  const authed = await isAuthenticated();
  return NextResponse.json(authed ? content : getPublicContent(content), {
    headers: {
      "Cache-Control": authed ? "no-store" : "public, s-maxage=30, stale-while-revalidate=120",
    },
  });
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limited = rateLimit(`content-put:${clientIp(request)}`, 40, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    if (!body?.school?.name || !Array.isArray(body.leaders)) {
      return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    }
    await saveContent(body);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
