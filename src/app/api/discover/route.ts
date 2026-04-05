import { NextResponse } from "next/server";
import { getDiscovery } from "@/lib/discovery";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const seenParam = searchParams.get("seen") ?? searchParams.get("exclude") ?? "";
  const seenIds = seenParam
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  const payload = await getDiscovery("random", seenIds);
  return NextResponse.json(payload, {
    headers: {
      "cache-control": "no-store, max-age=0",
    },
  });
}
