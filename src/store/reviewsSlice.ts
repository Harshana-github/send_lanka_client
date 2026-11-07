import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/api";
import type { NewReview, Review } from "@/types";
import { sriLankaDate } from "@/lib/dates";

type ReviewsState = {
  /** Approved reviews, by product. */
  approved: Record<string, Review[]>;
  /** Reviews written in this browser. They show as waiting until an admin approves them. */
  submitted: Review[];
};

const initialState: ReviewsState = { approved: {}, submitted: [] };

export const loadReviews = createAsyncThunk("reviews/load", (slug: string) => api.reviews(slug));

export const submitReview = createAsyncThunk("reviews/submit", (review: NewReview) => api.submitReview(review));

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    reviewsRestored(state, action: PayloadAction<Review[]>) {
      state.submitted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadReviews.fulfilled, (state, action) => {
        state.approved[action.meta.arg] = action.payload;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        state.submitted.unshift({ ...action.meta.arg, id: action.meta.requestId, createdAt: sriLankaDate(0) });
      });
  },
});

export const { reviewsRestored } = reviewsSlice.actions;

export default reviewsSlice.reducer;
