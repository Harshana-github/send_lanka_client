import type { Localized } from "@/i18n/config";

export type Badge = "bestseller" | "new" | "premium";

export type Product = {
  slug: string;
  image: string;
  category: string;
  occasions: string[];
  /** Base price in US dollars. Rupee prices are derived in `lib/currency`. */
  priceUsd: number;
  compareAtUsd?: number;
  rating: number;
  reviewCount: number;
  sameDay: boolean;
  /** The customer pays no delivery fee for this item. */
  freeDelivery?: boolean;
  /** Something done for the customer, like a recharge. It has no stock. */
  isService?: boolean;
  badge?: Badge;
  name: Localized;
  description: Localized;
  includes: Localized<string[]>;
};

export type Category = { id: string; name: Localized; image: string; featured: boolean };

export type Occasion = { id: string; name: Localized; image: string };

export type TimeSlot = { id: string; name: Localized };

export type Faq = { id: string; question: Localized; answer: Localized };

export type PaymentMethod = { code: string; name: Localized; description: Localized };

export type Currency = { code: string; ratePerUsd: number };

export type Company = {
  bankName: string;
  bankBranch: string;
  bankAccountName: string;
  bankAccountNumber: string;
};

/** What the website loads once when it opens. */
export type Site = {
  company: Company;
  categories: Category[];
  occasions: Occasion[];
  timeSlots: TimeSlot[];
  paymentMethods: PaymentMethod[];
  faqs: Faq[];
  currencies: Currency[];
};

export type DeliveryOption = { id: string; name: Localized; priceUsd: number; earliestDate: string; today: boolean };

export type DeliveryPlace = { town: Localized; district: Localized; methods: DeliveryOption[] };

export const orderSteps = ["placed", "confirmed", "preparing", "outForDelivery", "delivered"] as const;

/** What anyone can see with an order number. */
export type TrackedOrder = {
  id: string;
  status: string;
  /** ISO timestamps for each step reached so far. */
  history: Record<string, string>;
  lines: { slug: string; quantity: number }[];
  delivery: { name: Localized } | null;
  recipient: { name: string; city: string };
  deliveryDate: string;
};

/** What the person who placed the order sees on the confirmation page. */
export type PlacedOrder = Omit<TrackedOrder, "delivery" | "recipient"> & {
  /** Includes the delivery fee. */
  totalUsd: number;
  delivery: { name: Localized; feeUsd: number };
  payment: string;
  recipient: { name: string; city: string; postalCode: string };
};

export type NewOrder = {
  lines: { slug: string; quantity: number }[];
  sender: { name: string; email: string; phone: string; country: string };
  recipient: { name: string; phone: string; address: string; city: string; postalCode: string };
  deliveryMethod: string;
  deliveryDate: string;
  timeSlot: string;
  cardMessage: string;
  instructions: string;
  payment: string;
};

export type Rating = 1 | 2 | 3 | 4 | 5;

export type Review = {
  id: string;
  productSlug: string;
  rating: Rating;
  name: string;
  comment: string;
  /** Calendar date in Sri Lanka, "YYYY-MM-DD". */
  createdAt: string;
  verified?: boolean;
};

export type NewReview = Pick<Review, "productSlug" | "rating" | "name" | "comment">;

export const REVIEW_LIMITS = { name: 40, comment: 500 } as const;
