import type { NextRequest } from "next/server";
import { getProduct } from "@/data/catalog";
import { deliveryPlaces } from "@/data/delivery";

/** GET /api/delivery?postalCode=10100&items=slug,slug */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const items = (searchParams.get("items") ?? "").split(",").flatMap((slug) => getProduct(slug) ?? []);
  return Response.json(deliveryPlaces(searchParams.get("postalCode") ?? "", items));
}
