/** Calls to the Laravel API. Components don't call these directly: they go through the thunks in src/store. */
import type { DeliveryPlace, NewOrder, NewReview, PlacedOrder, Product, Review, Site, TrackedOrder } from "@/types";
import { http } from "./client";

export const api = {
  async site(): Promise<Site> {
    return (await http.get<Site>("/site")).data;
  },

  async products(): Promise<Product[]> {
    return (await http.get<Product[]>("/products")).data;
  },

  async product(slug: string): Promise<Product> {
    return (await http.get<Product>(`/products/${slug}`)).data;
  },

  async reviews(slug: string): Promise<Review[]> {
    return (await http.get<Review[]>(`/products/${slug}/reviews`)).data;
  },

  async delivery(postalCode: string, slugs: string[]): Promise<DeliveryPlace[]> {
    const params = { postalCode, items: slugs.join(",") };
    return (await http.get<DeliveryPlace[]>("/delivery", { params })).data;
  },

  async placeOrder(order: NewOrder): Promise<PlacedOrder> {
    return (await http.post<PlacedOrder>("/orders", order)).data;
  },

  async trackOrder(id: string): Promise<TrackedOrder> {
    return (await http.get<TrackedOrder>(`/orders/${id}`)).data;
  },

  async submitReview(review: NewReview): Promise<void> {
    await http.post("/reviews", review);
  },

  async sendMessage(message: { name: string; email: string; message: string }): Promise<void> {
    await http.post("/contact", message);
  },
};
