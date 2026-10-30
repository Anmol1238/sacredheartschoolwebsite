import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const ALLOWED: Record<string, { type: "image" | "video" | "file"; ext: string; max: number }> = {
  "image/jpeg": { type: "image", ext: "jpg", max: 8 * 1024 * 1024 },
  "image/png": { type: "image", ext: "png", max: 8 * 1024 * 1024 },
  "image/webp": { type: "image", ext: "webp", max: 8 * 1024 * 1024 },
  "image/gif": { type: "image", ext: "gif", max: 5 * 1024 * 1024 },
  "video/mp4": { type: "video", ext: "mp4", max: 60 * 1024 * 1024 },
  "video/webm": { type: "video", ext: "webm", max: 60 * 1024 * 1024 },
  "application/pdf": { type: "file", ext: "pdf", max: 12 * 1024 * 1024 },
};

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const limited = rateLimit(`upload:${clientIp(request)}`, 30, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "missing_file" }, { status: 400 });
    }

    const meta = ALLOWED[file.type];
    if (!meta) {
      return NextResponse.json(
        { error: "unsupported_type", allowed: Object.keys(ALLOWED) },
        { status: 400 }
      );
    }
    if (file.size > meta.max) {
      return NextResponse.json({ error: "file_too_large", max: meta.max }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const id = crypto.randomUUID();
    const filename = `${id}.${meta.ext}`;
    const dir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, filename), bytes);

    const url = `/uploads/${filename}`;
    return NextResponse.json({
      ok: true,
      item: {
        id,
        name: file.name.slice(0, 120),
        url,
        type: meta.type,
        mime: file.type,
        size: file.size,
        createdAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
