import { paymentMethods, type PaymentMethod } from "@/data/orders";

/**
 * Switches for features that are built but not offered yet.
 * Online card payment is ready in the checkout UI; turn it on once a payment gateway is connected.
 * Cash on delivery is also ready; for now the client takes bank transfer only.
 */
export const features = {
  onlinePayment: false,
  cashOnDelivery: false,
} as const;

export const enabledPaymentMethods: PaymentMethod[] = paymentMethods.filter(
  (method) => (method !== "card" || features.onlinePayment) && (method !== "cod" || features.cashOnDelivery),
);
