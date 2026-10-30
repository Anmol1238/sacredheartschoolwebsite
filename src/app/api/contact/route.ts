import { NextResponse } from "next/server";
import { z } from "zod";
import { addInquiry } from "@/lib/content";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  phone: z.string().min(10).max(20),
  message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
  const limited = rateLimit(`contact:${clientIp(request)}`, 6, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "validation", issues: parsed.error.issues },
        { status: 400 }
      );
    }
    const inquiry = await addInquiry({
      name: sanitizeText(parsed.data.name, 80),
      email: sanitizeText(parsed.data.email, 120),
      phone: sanitizeText(parsed.data.phone, 20),
      message: sanitizeText(parsed.data.message, 2000),
    });
    return NextResponse.json({ ok: true, id: inquiry.id });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
