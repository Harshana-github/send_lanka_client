import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Review } from "@/data/reviews";

/** Reviews written in this browser. They stay "pending" until an admin approves them. */
type ReviewsState = {
  submitted: Review[];
};

const initialState: ReviewsState = { submitted: [] };

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reviewSubmitted(state, action: PayloadAction<Review>) {
      state.submitted.unshift(action.payload);
    },
    reviewsRestored(state, action: PayloadAction<Review[]>) {
      state.submitted = action.payload;
    },
  },
});

export const { reviewSubmitted, reviewsRestored } = reviewsSlice.actions;

export default reviewsSlice.reducer;
