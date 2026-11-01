export const site = {
  name: "SENDLANKA",
  whatsappNumber: "94702261768",
  whatsappDisplay: "+94 70 226 1768",
  email: "support@sendlanka.lk",
  url: "https://sendlanka.lk",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
