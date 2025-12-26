import { NextResponse } from "next/server";

import { generateDigest } from "@/lib/digest";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const windowStart = url.searchParams.get("windowStart") ?? undefined;

  const digest = await generateDigest({ windowStart });

  return NextResponse.json(digest);
}
