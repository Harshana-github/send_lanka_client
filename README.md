# SENDLANKA – Client (Next.js)

Customer-facing storefront for **SENDLANKA – Send Love to Sri Lanka**, a gift delivery shop for Sri Lankans living abroad. Built by Devly.

This is a **sample build** with demo data. Products, orders and payments run in the browser; the Laravel API and the payment gateway are plugged in later.

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

- **4 languages**: English, සිංහල, 日本語, 中文. The language is in the URL (`/en`, `/si`, `/ja`, `/zh`) and is picked from the browser on the first visit.
- **2 currencies**: USD and LKR, toggled in the header. Prices are stored in USD and converted with `LKR_PER_USD` in `src/lib/currency.ts`.
- **Shop**: category chips, occasion filter, search (in the current language and English), sorting.
- **Product page**: delivery date and time slot (including a midnight surprise slot), quantity, add to cart, and **Order on WhatsApp** with a pre-filled message.
- **Cart drawer and cart page**, kept in `localStorage`.
- **Checkout**: sender, recipient, delivery and card message, three payment options (card, bank transfer, cash on delivery), with inline validation.
- **Order confirmation** and **order tracking** with a status timeline. Try the demo orders `SL-240518`, `SL-240377` and `SL-240602`.
- Mobile-first layout, a sticky purchase bar on phones, a floating WhatsApp button, and an accessible menu, drawer and forms.

## Project structure

```
src/
  app/[lang]/          Routes. The root layout lives here, so every page is localised.
  proxy.ts             Redirects "/" and other paths without a locale to /{locale}/…
  i18n/                Locale config, dictionaries (en/si/ja/zh JSON) and the t() helper
  data/catalog.ts      Products, categories and occasions with text in all 4 languages
  data/orders.ts       Order types and demo orders for tracking
  store/               Redux store, slices, typed hooks and localStorage persistence
  components/          layout/, home/, product/, shop/, checkout/, ui/
  lib/                 Currency, dates, WhatsApp links and site constants
```

### Adding text

1. Add the key to `src/i18n/dictionaries/en.json`. Its shape is the type for every other language.
2. Add the same key to `si.json`, `ja.json` and `zh.json`.
3. Use `t("section.key")` through `useI18n()` in client components, or the `t` from `resolveLocale(params)` in server pages.

### Adding a product

Add an entry to `products` in `src/data/catalog.ts`, with `name`, `description` and `includes` in all four languages, and put its image in `public/images/products/`.

## Connecting the backend later

| Now (sample) | Production |
| --- | --- |
| `data/catalog.ts` | `GET /api/products` from Laravel |
| Orders saved in `localStorage` | `POST /api/orders`, and tracking from `GET /api/orders/{id}` |
| Simulated payment in `CheckoutForm` | Redirect to the chosen payment gateway, with a webhook to Laravel |
| `LKR_PER_USD` constant | Exchange rate set in the admin panel |

## Notes

- Japanese and Chinese use the system fonts (Hiragino, Yu Gothic, PingFang, Microsoft YaHei), because CJK web fonts are several MB. Latin text uses Plus Jakarta Sans and Sinhala uses Noto Sans Sinhala.
- Product photos are from Unsplash and are only placeholders for the sample.
