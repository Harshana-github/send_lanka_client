# SENDLANKA – Client (Next.js)

Customer-facing storefront for **SENDLANKA – Send Love to Sri Lanka**, a gift delivery shop for Sri Lankans living abroad. Built by Devly.

Products, orders and reviews come from the Laravel API in `send_lanka_backend`. Online card payment is plugged in later.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components / Partial Prerendering)
- **React 19**, **TypeScript**
- **Tailwind CSS 4**
- **Redux Toolkit** for the cart, currency and orders
- **lucide-react** icons

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000 (redirects to /en, or to the browser's language)
npm run build      # production build
npm run start      # serve the production build
npm run lint
```

## Features

- **2 languages**: English and සිංහල. The language is in the URL (`/en`, `/si`) and is picked from the browser on the first visit.
- **2 currencies**: LKR (default) and USD, toggled in the header. Prices are stored in USD and converted with `LKR_PER_USD` in `src/lib/currency.ts`.
- **Shop**: category chips, occasion filter, search (in the current language and English), sorting.
- **Product page**: delivery date and time slot (including a midnight surprise slot), quantity, add to cart, and **Order on WhatsApp** with a pre-filled message.
- **Cart drawer and cart page**, kept in `localStorage`.
- **Checkout**: sender, recipient, delivery and card message, with inline validation. Payment is **bank transfer** or **cash on delivery**; online card payment is built but switched off (see below).
- **Customer reviews** on every product page: star rating, name and an optional comment, in a one-screen form. New reviews are **pending until an admin approves them** (see below).
- **Order confirmation** and **order tracking** with a status timeline.
- Mobile-first layout, a sticky purchase bar on phones, a floating WhatsApp button, and an accessible menu, drawer and forms.

## Project structure

```
src/
  app/[lang]/          Routes. The root layout lives here, so every page is localised.
  proxy.ts             Redirects "/" and other paths without a locale to /{locale}/…
  i18n/                Locale config, dictionaries (en/si JSON) and the t() helper
  api/                 axios and one function per API route
  types.ts             The shapes of what the API sends
  store/               Redux store, slices, typed hooks and localStorage persistence
  components/          layout/, home/, product/, shop/, checkout/, ui/
  lib/                 Currency, dates, WhatsApp links and site constants
```

### Adding text

1. Add the key to `src/i18n/dictionaries/en.json`. Its shape is the type for every other language.
2. Add the same key to `si.json`.
3. Use `t("section.key")` through `useI18n()` in client components, or the `t` from `resolveLocale(params)` in server pages.

### Adding a product

Add it in the admin panel, under Products. It shows on the website straight away.

## Reviews and approval

- A customer opens **Write a review** on a product page, taps 1–5 stars, adds a name and an optional comment, and submits. A hidden honeypot field quietly drops bot submissions.
- Every new review is saved with `status: "pending"`. Only `approved` reviews are shown to the public.
- The person who wrote a pending review sees it in their own browser, marked **Awaiting approval**. Nobody else sees it.
- Delivered orders on the tracking page invite the customer to leave a review.
- The admin panel lists pending reviews and approves or rejects them. Ratings are worked out from approved reviews.

## Turning on online card payment

The card option is already built into checkout, the order confirmation and the footer, but only shows when the method is active in the admin panel.

1. Connect the payment gateway in the Laravel backend (hosted checkout + webhook).
2. Turn on Credit / Debit card under Payment Methods in the admin panel. The card option and the Visa/Mastercard marks then appear.
3. Update the payment wording in `en.json` / `si.json` (`how.step3Desc`, `why.paymentDesc`, `hero.badgeCod`, `product.payOnDelivery`) to mention cards again.
4. In `CheckoutForm`, redirect to the gateway after placing an order when `payment === "card"`.

## Notes

- Latin text uses Plus Jakarta Sans and Sinhala uses Noto Sans Sinhala.
- Product photos are from Unsplash and are only placeholders.

## Connect it to the backend

The website talks to the Laravel API in `send_lanka_backend`. Copy `.env.example` to `.env` and set `NEXT_PUBLIC_API_URL`, then start the backend.

| File | Job |
| --- | --- |
| `src/api/client.ts` | The axios instance: turns failures into plain messages |
| `src/api/index.ts` | One function per API route |
| `src/store/catalogSlice.ts` | Loads products, categories and settings once, when the site opens |
| `src/store/deliverySlice.ts` | Delivery options for a postal code |
| `src/store/ordersSlice.ts` | Placing and tracking orders |
| `src/store/reviewsSlice.ts` | Reading and writing reviews |
| `src/store/contactThunks.ts` | The contact form |

Components read from the store with `useAppSelector`. Wrap anything that needs the catalog in `<CatalogGate>`, which shows a placeholder while it loads and a retry if it fails.
Only product page titles and link previews are fetched on the server, for search engines. The build doesn't need the API running.

Prices, delivery fees and totals are worked out by the server. Contact details in `src/lib/site.ts` are still written in the code.
