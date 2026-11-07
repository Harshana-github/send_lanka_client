import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/api";
import type { NewOrder, PlacedOrder, TrackedOrder } from "@/types";

type OrdersState = {
  /** Orders placed in this browser, for the confirmation page. */
  items: PlacedOrder[];
  tracked: TrackedOrder | null;
  trackStatus: "idle" | "loading" | "ready" | "failed";
};

const initialState: OrdersState = { items: [], tracked: null, trackStatus: "idle" };

export const placeOrder = createAsyncThunk("orders/place", (order: NewOrder) => api.placeOrder(order));

export const trackOrder = createAsyncThunk("orders/track", (id: string) => api.trackOrder(id));

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersRestored(state, action: PayloadAction<PlacedOrder[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(trackOrder.pending, (state) => {
        state.tracked = null;
        state.trackStatus = "loading";
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.tracked = action.payload;
        state.trackStatus = "ready";
      })
      .addCase(trackOrder.rejected, (state) => {
        state.trackStatus = "failed";
      });
  },
});

export const { ordersRestored } = ordersSlice.actions;

export default ordersSlice.reducer;
