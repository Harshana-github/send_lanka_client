"use client";

import { Check, PackageSearch, PenLine, Search, Star } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { getProduct } from "@/data/catalog";
import { demoOrders, orderStatuses, type Order } from "@/data/orders";
import { localePath, localeTags } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate } from "@/lib/dates";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";

function normalise(id: string) {
  const digits = id.replace(/\D/g, "");
  return digits ? `SL-${digits}` : "";
}

export function TrackOrder() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const placedOrders = useAppSelector((state) => state.orders.items);
  const hydrated = useAppSelector((state) => state.preferences.hydrated);

  const requested = normalise(searchParams.get("order") ?? "");
  const [input, setInput] = useState(requested);

  const order: Order | undefined = requested
    ? [...placedOrders, ...demoOrders].find((item) => item.id === requested)
    : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = normalise(input);
    if (!id) return;
    setInput(id);
    router.replace(`${pathname}?order=${id}`, { scroll: false });
  }

  function tryDemo(id: string) {
    setInput(id);
    router.replace(`${pathname}?order=${id}`, { scroll: false });
  }

  const timeFormat = new Intl.DateTimeFormat(localeTags[locale], {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Colombo",
  });

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-line sm:p-6">
        <label htmlFor="order-id" className="mb-2 block text-sm font-semibold text-navy-900">
          {t("track.label")}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <PackageSearch className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
            <input
              id="order-id"
              value={input}
              onChange={(event) => setInput(event.target.value.toUpperCase())}
              placeholder={t("track.placeholder")}
              autoComplete="off"
              className="h-13 w-full rounded-full bg-surface pr-4 pl-12 text-base font-semibold tracking-wide uppercase ring-1 ring-line outline-none placeholder:font-normal placeholder:tracking-normal placeholder:normal-case focus:bg-white focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <Button type="submit" size="lg">
            <Search className="size-5" aria-hidden />
            {t("track.button")}
          </Button>
        </div>
        <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
          {t("track.tryDemo")}
          {demoOrders.map((demo) => (
            <button
              key={demo.id}
              type="button"
              onClick={() => tryDemo(demo.id)}
              className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700 ring-1 ring-brand-100 hover:bg-brand-100"
            >
              {demo.id}
            </button>
          ))}
        </p>
      </form>

      {requested && hydrated && !order && (
        <p role="alert" className="mt-6 rounded-2xl bg-rose/10 px-5 py-4 text-sm font-semibold text-rose">
          {t("track.notFound")}
        </p>
      )}

      {order && (
        <section aria-live="polite" className="mt-8 grid gap-6 md:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl bg-surface p-6 ring-1 ring-line">
            <p className="text-xs font-semibold tracking-wider text-muted uppercase">{t("track.label")}</p>
            <p className="text-2xl font-extrabold text-navy-900">{order.id}</p>
            <span className="mt-3 inline-flex rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white">
              {t(`track.${order.status}` as const)}
            </span>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-muted">{t("track.recipient")}</dt>
                <dd className="font-semibold text-navy-900">
                  {order.recipient.name} · {order.recipient.city}
                </dd>
              </div>
              <div>
                <dt className="text-muted">{t("track.deliveryDate")}</dt>
                <dd className="font-semibold text-navy-900">{formatDate(order.deliveryDate, locale)}</dd>
              </div>
              <div>
                <dt className="text-muted">{t("track.items")}</dt>
                <dd className="mt-2 space-y-2">
                  {order.lines.map((line) => {
                    const product = getProduct(line.slug);
                    if (!product) return null;
                    return (
                      <div key={line.slug} className="flex items-center gap-3">
                        <span className="relative size-11 shrink-0 overflow-hidden rounded-lg ring-1 ring-line">
                          <Image src={product.image} alt="" fill sizes="44px" className="object-cover" />
                        </span>
                        <span className="font-semibold text-navy-900">
                          {line.quantity} × {product.name[locale]}
                        </span>
                      </div>
                    );
                  })}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl bg-white p-6 ring-1 ring-line">
            <h2 className="mb-5 font-bold text-navy-900">{t("track.status")}</h2>
            <ol>
              {orderStatuses.map((status, index) => {
                const reachedAt = order.history[status];
                const currentIndex = orderStatuses.indexOf(order.status);
                const done = index <= currentIndex;
                const current = index === currentIndex;
                return (
                  <li key={status} className="relative flex gap-4 pb-7 last:pb-0">
                    {index < orderStatuses.length - 1 && (
                      <span
                        aria-hidden
                        className={cn(
                          "absolute top-8 left-[15px] h-[calc(100%-2rem)] w-0.5",
                          index < currentIndex ? "bg-brand-500" : "bg-line",
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "relative grid size-8 shrink-0 place-items-center rounded-full",
                        done ? "bg-brand-500 text-white" : "bg-white text-muted ring-2 ring-line",
                        current && "ring-4 ring-brand-100",
                      )}
                    >
                      {done ? <Check className="size-4" aria-hidden /> : <span className="text-xs font-bold">{index + 1}</span>}
                    </span>
                    <div className="pt-1">
                      <p className={cn("font-semibold", done ? "text-navy-900" : "text-muted")}>
                        {t(`track.${status}` as const)}
                      </p>
                      {reachedAt && <p className="text-sm text-muted">{timeFormat.format(new Date(reachedAt))}</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {order.status === "delivered" && (
            <div className="flex flex-col gap-4 rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100 sm:flex-row sm:items-center md:col-span-2">
              <div className="flex-1">
                <p className="flex items-center gap-1" aria-hidden>
                  {[0, 1, 2, 3, 4].map((index) => (
                    <Star key={index} className="size-5 fill-gold text-gold" />
                  ))}
                </p>
                <p className="mt-2 font-bold text-navy-900">{t("reviews.rateGift")}</p>
                <p className="text-sm text-muted">{t("reviews.rateGiftText")}</p>
              </div>
              <Button href={`${localePath(locale, `/product/${order.lines[0].slug}`)}#reviews`} size="lg">
                <PenLine className="size-4.5" aria-hidden />
                {t("reviews.write")}
              </Button>
            </div>
          )}

          <div className="md:col-span-2">
            <Button
              href={whatsappLink(t("success.whatsappMessage", { order: order.id }))}
              external
              variant="whatsapp"
              fullWidth
              size="lg"
            >
              <WhatsAppIcon className="size-5" />
              {t("track.help")}
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}
