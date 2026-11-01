"use client";

import { CalendarDays, Clock, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/catalog";
import { timeSlots, type TimeSlot } from "@/data/orders";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate, sriLankaDate } from "@/lib/dates";
import { whatsappLink } from "@/lib/site";
import { useIsClient } from "@/lib/useIsClient";
import { itemAdded } from "@/store/cartSlice";
import { useAppDispatch, useMoney } from "@/store/hooks";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Price } from "./Price";
import { QuantityStepper } from "./QuantityStepper";

export const slotLabels = {
  morning: "product.slotMorning",
  afternoon: "product.slotAfternoon",
  evening: "product.slotEvening",
  midnight: "product.slotMidnight",
} as const;

export function PurchasePanel({ product }: { product: Product }) {
  const { locale, t } = useI18n();
  const dispatch = useAppDispatch();
  const money = useMoney();
  const isClient = useIsClient();

  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot>(product.slug === "midnight-surprise" ? "midnight" : "afternoon");

  // Same-day items can go today; everything else needs at least a day to prepare.
  const minDate = isClient ? sriLankaDate(product.sameDay ? 0 : 1) : undefined;
  const maxDate = isClient ? sriLankaDate(90) : undefined;

  const total = product.priceUsd * quantity;
  const whatsappMessage = [
    t("product.whatsappMessage", { product: `${quantity} × ${product.name.en}`, price: money(total) }),
    deliveryDate ? `${t("product.deliveryDate")}: ${formatDate(deliveryDate, "en")}` : "",
    `${t("product.timeSlot")}: ${t(slotLabels[timeSlot])}`,
  ]
    .filter(Boolean)
    .join("\n");

  function addToCart() {
    dispatch(itemAdded({ slug: product.slug, quantity, deliveryDate: deliveryDate || undefined, timeSlot }));
  }

  return (
    <div>
      <Price usd={product.priceUsd} compareAtUsd={product.compareAtUsd} size="lg" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-navy-900">
            <CalendarDays className="size-4 text-brand-600" aria-hidden />
            {t("product.deliveryDate")}
          </span>
          <input
            type="date"
            value={deliveryDate}
            min={minDate}
            max={maxDate}
            onChange={(event) => setDeliveryDate(event.target.value)}
            className="h-12 w-full rounded-xl bg-white px-3.5 text-sm font-medium ring-1 ring-line outline-none focus:ring-2 focus:ring-brand-400"
          />
          <span className="mt-1 block text-xs text-muted">
            {deliveryDate ? formatDate(deliveryDate, locale) : t("product.deliveryDateHint")}
          </span>
        </label>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-navy-900">
            <Clock className="size-4 text-brand-600" aria-hidden />
            {t("product.timeSlot")}
          </span>
          <select
            value={timeSlot}
            onChange={(event) => setTimeSlot(event.target.value as TimeSlot)}
            className="h-12 w-full cursor-pointer rounded-xl bg-white px-3.5 text-sm font-medium ring-1 ring-line outline-none focus:ring-2 focus:ring-brand-400"
          >
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {t(slotLabels[slot])}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm font-semibold text-navy-900">{t("common.quantity")}</span>
        <QuantityStepper value={quantity} onChange={setQuantity} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={addToCart} size="lg" className="h-auto! min-h-13 flex-1 py-3 text-center whitespace-normal!">
          <ShoppingBag className="size-5" aria-hidden />
          {t("common.addToCart")} · {money(total)}
        </Button>
        <Button
          href={whatsappLink(whatsappMessage)}
          external
          variant="whatsapp"
          size="lg"
          className="h-auto! min-h-13 flex-1 py-3 text-center whitespace-normal!"
        >
          <WhatsAppIcon className="size-5" />
          {t("common.orderOnWhatsApp")}
        </Button>
      </div>

      {/* Sticky purchase bar for phones, so the main action is always within thumb reach. */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-12px_rgb(11_37_69/0.2)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted">{product.name[locale]}</p>
            <p className="text-lg font-extrabold text-navy-900 tabular-nums">{money(total)}</p>
          </div>
          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("common.orderOnWhatsApp")}
            className="grid size-12 shrink-0 place-items-center rounded-full bg-whatsapp text-white"
          >
            <WhatsAppIcon className="size-6" />
          </a>
          <Button onClick={addToCart} size="lg" className="max-w-[55%] min-w-0 shrink! px-4">
            <ShoppingBag className="size-5 shrink-0" aria-hidden />
            <span className="min-w-0 truncate">{t("common.addToCart")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
