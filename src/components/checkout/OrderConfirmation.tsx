"use client";

import { CheckCircle2, Copy, PackageSearch } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { localePath } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate } from "@/lib/dates";
import { whatsappLink } from "@/lib/site";
import { useAppSelector, useMoney } from "@/store/hooks";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { LoadingBlock } from "./CartView";

export function OrderConfirmation() {
  const { locale, t } = useI18n();
  const money = useMoney();
  const orderId = useSearchParams().get("order");
  const hydrated = useAppSelector((state) => state.preferences.hydrated);
  const order = useAppSelector((state) => state.orders.items.find((item) => item.id === orderId));
  const { company, paymentMethods } = useAppSelector((state) => state.catalog);
  const [copied, setCopied] = useState(false);

  if (!hydrated) return <LoadingBlock />;

  if (!order) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-semibold text-navy-900">{t("success.notFound")}</p>
        <Button href={localePath(locale, "/shop")} className="mt-6">
          {t("common.continueShopping")}
        </Button>
      </div>
    );
  }

  async function copyId() {
    if (!order) return;
    await navigator.clipboard?.writeText(order.id);
    setCopied(true);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <span className="mx-auto grid size-20 animate-pop place-items-center rounded-full bg-whatsapp/10">
          <CheckCircle2 className="size-11 text-whatsapp" aria-hidden />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-navy-900 text-balance sm:text-4xl">
          {t("success.title")}
        </h1>
        <p className="mt-3 text-muted">{t("success.subtitle")}</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl ring-1 ring-line">
        <div className="flex items-center justify-between gap-4 bg-navy-900 px-6 py-5 text-white">
          <div>
            <p className="text-xs font-semibold tracking-wider text-navy-200 uppercase">{t("success.orderNumber")}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-wide">{order.id}</p>
          </div>
          <button
            type="button"
            onClick={copyId}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold hover:bg-white/20"
          >
            {copied ? <CheckCircle2 className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
            {copied ? t("common.copied") : t("common.copy")}
          </button>
        </div>
        <dl className="grid gap-5 p-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-semibold text-muted">{t("success.deliveryTo")}</dt>
            <dd className="mt-1 font-semibold text-navy-900">
              {order.recipient.name}
              <span className="block text-sm font-normal text-muted">
                {[order.recipient.city, order.recipient.postalCode].filter(Boolean).join(" ")}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted">{t("success.deliveryOn")}</dt>
            <dd className="mt-1 font-semibold text-navy-900">
              {formatDate(order.deliveryDate, locale)}
              {order.delivery && (
                <span className="block text-sm font-normal text-muted">
                  {order.delivery.name[locale]} · {order.delivery.feeUsd === 0 ? t("common.free") : money(order.delivery.feeUsd)}
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold text-muted">{t("success.payment")}</dt>
            <dd className="mt-1 font-semibold text-navy-900">
              {paymentMethods.find((method) => method.code === order.payment)?.name[locale] ?? order.payment}
              <span className="block text-sm font-normal text-muted">{money(order.totalUsd)}</span>
            </dd>
          </div>
        </dl>
      </div>

      {order.payment === "bank" && (
        <div className="mt-6 rounded-3xl bg-brand-50 p-6 ring-1 ring-brand-100">
          <h2 className="font-bold text-navy-900">{t("success.bankTitle")}</h2>
          <p className="mt-1 text-sm text-muted">{t("success.bankText")}</p>
          {company?.bankAccountNumber && (
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-muted">{t("success.bankName")}</dt>
                <dd className="font-semibold text-navy-900">{company.bankName}</dd>
              </div>
              <div>
                <dt className="text-muted">{t("success.bankAccount")}</dt>
                <dd className="font-semibold text-navy-900 tabular-nums">{company.bankAccountNumber}</dd>
              </div>
              <div>
                <dt className="text-muted">{t("success.bankHolder")}</dt>
                <dd className="font-semibold text-navy-900">{company.bankAccountName}</dd>
              </div>
            </dl>
          )}
        </div>
      )}

      <div className="mt-6 rounded-3xl bg-surface p-6 ring-1 ring-line">
        <h2 className="font-bold text-navy-900">{t("success.nextTitle")}</h2>
        <ol className="mt-4 space-y-3">
          {(["success.next1", "success.next2", "success.next3"] as const).map((key, index) => (
            <li key={key} className="flex gap-3 text-sm">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="text-ink">{t(key)}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href={`${localePath(locale, "/track")}?order=${order.id}`} size="lg" className="flex-1">
          <PackageSearch className="size-5" aria-hidden />
          {t("success.track")}
        </Button>
        <Button
          href={whatsappLink(t("success.whatsappMessage", { order: order.id }))}
          external
          variant="whatsapp"
          size="lg"
          className="flex-1"
        >
          <WhatsAppIcon className="size-5" />
          {t("common.orderOnWhatsApp")}
        </Button>
      </div>
    </div>
  );
}
