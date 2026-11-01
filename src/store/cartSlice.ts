import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TimeSlot } from "@/data/orders";

export type CartItem = {
  slug: string;
  quantity: number;
  deliveryDate?: string;
  timeSlot?: TimeSlot;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

const initialState: CartState = { items: [], isOpen: false };

export const MAX_QUANTITY = 10;

const clamp = (quantity: number) => Math.min(MAX_QUANTITY, Math.max(1, quantity));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    itemAdded(state, action: PayloadAction<CartItem>) {
      const { slug, quantity, deliveryDate, timeSlot } = action.payload;
      const existing = state.items.find((item) => item.slug === slug);

      if (existing) {
        existing.quantity = clamp(existing.quantity + quantity);
        existing.deliveryDate = deliveryDate ?? existing.deliveryDate;
        existing.timeSlot = timeSlot ?? existing.timeSlot;
      } else {
        state.items.push({ slug, quantity: clamp(quantity), deliveryDate, timeSlot });
      }
      state.isOpen = true;
    },
    quantityChanged(state, action: PayloadAction<{ slug: string; quantity: number }>) {
      const item = state.items.find((entry) => entry.slug === action.payload.slug);
      if (item) item.quantity = clamp(action.payload.quantity);
    },
    itemRemoved(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.slug !== action.payload);
    },
    cartCleared(state) {
      state.items = [];
    },
    cartOpened(state) {
      state.isOpen = true;
    },
    cartClosed(state) {
      state.isOpen = false;
    },
    cartRestored(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  itemAdded,
  quantityChanged,
  itemRemoved,
  cartCleared,
  cartOpened,
  cartClosed,
  cartRestored,
} = cartSlice.actions;

export default cartSlice.reducer;
