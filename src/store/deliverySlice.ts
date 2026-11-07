import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/api";
import type { DeliveryPlace } from "@/types";

type DeliveryState = {
  /** What the places below answer, so a slow old reply can't replace a newer one. */
  query: string;
  places: DeliveryPlace[] | null;
  status: "idle" | "loading" | "ready" | "failed";
};

const initialState: DeliveryState = { query: "", places: null, status: "idle" };

type Arg = { postalCode: string; slugs: string[] };

export const queryOf = ({ postalCode, slugs }: Arg) => `${postalCode}|${slugs.join(",")}`;

/** The towns a postal code covers, each with its delivery options. */
export const loadDeliveryPlaces = createAsyncThunk("delivery/load", ({ postalCode, slugs }: Arg) => api.delivery(postalCode, slugs));

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDeliveryPlaces.pending, (state, action) => {
        state.query = queryOf(action.meta.arg);
        state.places = null;
        state.status = "loading";
      })
      .addCase(loadDeliveryPlaces.fulfilled, (state, action) => {
        if (state.query !== queryOf(action.meta.arg)) return;
        state.places = action.payload;
        state.status = "ready";
      })
      .addCase(loadDeliveryPlaces.rejected, (state, action) => {
        if (state.query === queryOf(action.meta.arg)) state.status = "failed";
      });
  },
});

export default deliverySlice.reducer;
