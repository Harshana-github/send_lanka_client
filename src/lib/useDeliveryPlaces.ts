import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadDeliveryPlaces, queryOf } from "@/store/deliverySlice";

/** Looks up delivery once a full postal code is typed. `places` is empty until then. */
export function useDeliveryPlaces(postalCode: string, slugs: string[]) {
  const dispatch = useAppDispatch();
  const delivery = useAppSelector((state) => state.delivery);
  const ready = postalCode.length === 5 && slugs.length > 0;
  const query = ready ? queryOf({ postalCode, slugs }) : "";

  useEffect(() => {
    if (query) dispatch(loadDeliveryPlaces({ postalCode, slugs }));
    // The query holds the postal code and slugs, and stays the same when the array is rebuilt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, dispatch]);

  const current = query && delivery.query === query ? delivery : null;
  return {
    checking: Boolean(query) && (!current || current.status === "loading"),
    checked: current?.status === "ready",
    failed: current?.status === "failed",
    places: current?.places ?? [],
  };
}
