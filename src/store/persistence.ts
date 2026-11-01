import type { Currency } from "@/lib/currency";
import type { Order } from "@/data/orders";
import type { Review } from "@/data/reviews";
import type { CartItem } from "./cartSlice";
import type { RootState } from "./store";

// Bumped when stored data changes shape or defaults (v2: LKR became the default currency).
const STORAGE_KEY = "sendlanka:v2";

type PersistedState = {
  cart: CartItem[];
  currency: Currency;
  orders: Order[];
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
