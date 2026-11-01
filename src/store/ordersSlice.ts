import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "@/data/orders";

type OrdersState = {
  items: Order[];
};

const initialState: OrdersState = { items: [] };

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    orderPlaced(state, action: PayloadAction<Order>) {
      state.items.unshift(action.payload);
    },
    ordersRestored(state, action: PayloadAction<Order[]>) {
      state.items = action.payload;
    },
  },
});

export const { orderPlaced, ordersRestored } = ordersSlice.actions;

export default ordersSlice.reducer;
