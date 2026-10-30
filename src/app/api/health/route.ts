import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "sacred-heart-school",
    time: new Date().toISOString(),
  });
}
