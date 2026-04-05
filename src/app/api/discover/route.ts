import { NextResponse } from "next/server";
import { getDiscovery } from "@/lib/mock-discovery";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const excludeIds = searchParams
    .get("exclude")
    ?.split(",")
    .map((value) => value.trim())
    .filter(Boolean) ?? [];

  return NextResponse.json({
    item: getDiscovery(excludeIds),
    generatedAt: new Date().toISOString(),
  });
}
