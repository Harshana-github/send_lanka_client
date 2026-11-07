import { useEffect, useState } from "react";
import type { DeliveryPlace } from "@/data/delivery";

type Result = { query: string; places: DeliveryPlace[] | null };

/** Looks up delivery once a full postal code is typed. `places` is empty until then. */
export function useDeliveryPlaces(postalCode: string, slugs: string[]) {
  const query = postalCode.length === 5 ? `postalCode=${postalCode}&items=${slugs.join(",")}` : "";
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!query) return;
    let stale = false;
    fetch(`/api/delivery?${query}`)
      .then((response) => (response.ok ? response.json() : null))
      .catch(() => null)
      .then((places: DeliveryPlace[] | null) => {
        if (!stale) setResult({ query, places });
      });
    return () => {
      stale = true;
    };
  }, [query]);

  const current = query && result?.query === query ? result : null;
  return {
    checking: Boolean(query) && !current,
    checked: Boolean(current?.places),
    failed: current?.places === null,
    places: current?.places ?? [],
  };
}
