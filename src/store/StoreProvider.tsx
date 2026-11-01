"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { cartRestored } from "./cartSlice";
import { ordersRestored } from "./ordersSlice";
import { loadPersistedState, savePersistedState } from "./persistence";
import { currencyChanged, stateHydrated } from "./preferencesSlice";
import { reviewsRestored } from "./reviewsSlice";
import { makeStore } from "./store";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore);
  // Parts of the page can hydrate after the saved state is restored. Giving react-redux the
  // pristine state as the "server snapshot" keeps those parts identical to the server HTML.
  const [serverState] = useState(() => store.getState());

  useEffect(() => {
    // Restore after mount so the first client render matches the server HTML.
    const saved = loadPersistedState();
    if (saved.cart) store.dispatch(cartRestored(saved.cart));
    if (saved.currency) store.dispatch(currencyChanged(saved.currency));
    if (saved.orders) store.dispatch(ordersRestored(saved.orders));
    if (saved.reviews) store.dispatch(reviewsRestored(saved.reviews));
    store.dispatch(stateHydrated());

    return store.subscribe(() => savePersistedState(store.getState()));
  }, [store]);

  return <Provider store={store} serverState={serverState}>{children}</Provider>;
}
