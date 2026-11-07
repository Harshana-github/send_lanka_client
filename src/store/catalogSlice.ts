import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/api";
import type { Company, Product, Site } from "@/types";

type CatalogState = Omit<Site, "company"> & {
  company: Company | null;
  products: Product[];
  status: "idle" | "loading" | "ready" | "failed";
};

const initialState: CatalogState = {
  company: null,
  products: [],
  categories: [],
  occasions: [],
  timeSlots: [],
  paymentMethods: [],
  faqs: [],
  currencies: [],
  status: "idle",
};

/** Loads the shop once when the website opens. Every page then reads it from the store. */
export const loadCatalog = createAsyncThunk(
  "catalog/load",
  async () => {
    const [site, products] = await Promise.all([api.site(), api.products()]);
    return { ...site, products };
  },
  { condition: (_, { getState }) => (getState() as { catalog: CatalogState }).catalog.status !== "loading" },
);

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCatalog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadCatalog.fulfilled, (_, action) => ({ ...action.payload, status: "ready" }))
      .addCase(loadCatalog.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default catalogSlice.reducer;
