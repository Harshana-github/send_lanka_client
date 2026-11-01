export const orderStatuses = ["placed", "confirmed", "preparing", "outForDelivery", "delivered"] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export const paymentMethods = ["card", "bank", "cod"] as const;

export type PaymentMethod = (typeof paymentMethods)[number];

export const timeSlots = ["morning", "afternoon", "evening", "midnight"] as const;

export type TimeSlot = (typeof timeSlots)[number];

export type OrderLine = {
  slug: string;
  quantity: number;
  /** Unit price in USD at the time of purchase. */
  priceUsd: number;
};

export type Order = {
  id: string;
  status: OrderStatus;
  /** ISO timestamps for each step reached so far. */
  history: Partial<Record<OrderStatus, string>>;
  lines: OrderLine[];
  totalUsd: number;
  payment: PaymentMethod;
  sender: { name: string; email: string; phone: string; country: string };
  recipient: { name: string; phone: string; address: string; city: string };
  deliveryDate: string;
  timeSlot: TimeSlot;
  cardMessage: string;
  instructions: string;
};

/** Demo orders so the tracking page can be tried without placing an order. */
export const demoOrders: Order[] = [
  {
    id: "SL-240518",
    status: "outForDelivery",
    history: {
      placed: "2026-10-31T18:12:00+05:30",
      confirmed: "2026-10-31T18:25:00+05:30",
      preparing: "2026-11-01T09:10:00+05:30",
      outForDelivery: "2026-11-01T13:40:00+05:30",
    },
    lines: [
      { slug: "chocolate-fudge-cake", quantity: 1, priceUsd: 35 },
      { slug: "red-rose-bouquet", quantity: 1, priceUsd: 45 },
    ],
    totalUsd: 80,
    payment: "card",
    sender: { name: "Dilani Rathnayake", email: "dilani@example.com", phone: "+61 400 000 000", country: "Australia" },
    recipient: { name: "Nimali Perera", phone: "+94 77 000 0000", address: "12 Temple Road", city: "Kandy" },
    deliveryDate: "2026-11-01",
    timeSlot: "afternoon",
    cardMessage: "Happy birthday Amma!",
    instructions: "",
  },
  {
    id: "SL-240377",
    status: "delivered",
    history: {
      placed: "2026-10-27T21:03:00+05:30",
      confirmed: "2026-10-27T21:15:00+05:30",
      preparing: "2026-10-28T08:30:00+05:30",
      outForDelivery: "2026-10-28T11:05:00+05:30",
      delivered: "2026-10-28T12:20:00+05:30",
    },
    lines: [{ slug: "family-grocery-pack", quantity: 1, priceUsd: 60 }],
    totalUsd: 60,
    payment: "bank",
    sender: { name: "Kasun Perera", email: "kasun@example.com", phone: "+81 90 0000 0000", country: "Japan" },
    recipient: { name: "Sunil Fernando", phone: "+94 71 000 0000", address: "45 Lighthouse Street", city: "Galle" },
    deliveryDate: "2026-10-28",
    timeSlot: "morning",
    cardMessage: "",
    instructions: "",
  },
  {
    id: "SL-240602",
    status: "preparing",
    history: {
      placed: "2026-11-01T07:48:00+05:30",
      confirmed: "2026-11-01T08:02:00+05:30",
      preparing: "2026-11-01T10:15:00+05:30",
    },
    lines: [{ slug: "midnight-surprise", quantity: 1, priceUsd: 80 }],
    totalUsd: 80,
    payment: "card",
    sender: { name: "Ravi Silva", email: "ravi@example.com", phone: "+44 7700 000000", country: "United Kingdom" },
    recipient: { name: "Amaya Silva", phone: "+94 76 000 0000", address: "8 Flower Road", city: "Colombo 07" },
    deliveryDate: "2026-11-01",
    timeSlot: "midnight",
    cardMessage: "Happy anniversary my love",
    instructions: "",
  },
];
