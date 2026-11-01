import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Currency } from "@/lib/currency";

type PreferencesState = {
  currency: Currency;
  /** True once saved cart, orders and currency have been restored from the browser. */
  hydrated: boolean;
};

const initialState: PreferencesState = { currency: "USD", hydrated: false };

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    currencyChanged(state, action: PayloadAction<Currency>) {
      state.currency = action.payload;
    },
    stateHydrated(state) {
      state.hydrated = true;
    },
  },
});

export const { currencyChanged, stateHydrated } = preferencesSlice.actions;

export default preferencesSlice.reducer;
