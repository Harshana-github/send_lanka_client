import type { Currency } from "@/lib/currency";
import type { PlacedOrder, Review } from "@/types";
import type { CartItem } from "./cartSlice";
import type { RootState } from "./store";

// Bumped when stored data changes shape or defaults (v3: orders and reviews come from the API).
const STORAGE_KEY = "sendlanka:v3";

type PersistedState = {
  cart: CartItem[];
  currency: Currency;
  orders: PlacedOrder[];
  reviews: Review[];
};

export function loadPersistedState(): Partial<PersistedState> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<PersistedState>) : {};
  } catch {
    return {};
  }
}

export function savePersistedState(state: RootState): void {
  const snapshot: PersistedState = {
    cart: state.cart.items,
    currency: state.preferences.currency,
    orders: state.orders.items,
    reviews: state.reviews.submitted,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Storage can be full or blocked (private mode); the shop still works without it.
  }
}
