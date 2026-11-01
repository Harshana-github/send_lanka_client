import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** False during prerender and hydration, true afterwards — for values that only exist in the browser. */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
