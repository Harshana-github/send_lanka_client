"use client";

import { Banknote, CreditCard, Landmark, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { timeSlots, type Order, type PaymentMethod, type TimeSlot } from "@/data/orders";
import { localePath, localeTags } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translate";
import { sriLankaDate } from "@/lib/dates";
import { enabledPaymentMethods } from "@/lib/features";
import { useIsClient } from "@/lib/useIsClient";
import { cn } from "@/lib/utils";
import { cartCleared } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector, useCartLines, useMoney } from "@/store/hooks";
import { orderPlaced } from "@/store/ordersSlice";
import { slotLabels } from "@/components/product/PurchasePanel";
import { Button } from "@/components/ui/Button";
import { MastercardMark, VisaMark } from "@/components/ui/icons";
import { EmptyCart, LoadingBlock } from "./CartView";
import { OrderSummary } from "./OrderSummary";

const countryCodes = ["AU", "GB", "US", "CA", "JP", "CN", "IT", "DE", "FR", "AE", "QA", "SA", "KW", "KR", "NZ", "SG", "MY", "LK"];

const cities = ["Colombo", "Dehiwala-Mount Lavinia", "Negombo", "Kandy", "Galle", "Matara", "Kurunegala", "Jaffna", "Anuradhapura", "Ratnapura", "Batticaloa", "Trincomalee", "Nuwara Eliya", "Badulla"];

type Fields = {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderCountry: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  city: string;
  deliveryDate: string;
  timeSlot: TimeSlot;
  cardMessage: string;
  instructions: string;
  payment: PaymentMethod;
};

type FieldName = keyof Fields;
type Errors = Partial<Record<FieldName, TranslationKey>>;

const requiredFields: FieldName[] = [
  "senderName",
  "senderEmail",
  "senderPhone",
  "senderCountry",
  "recipientName",
  "recipientPhone",
  "address",
  "city",
  "deliveryDate",
];

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  for (const name of requiredFields) {
    if (!String(fields[name]).trim()) errors[name] = "checkout.errorRequired";
  }
  if (fields.senderEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.senderEmail)) {
    errors.senderEmail = "checkout.errorEmail";
  }
  for (const name of ["senderPhone", "recipientPhone"] as const) {
    if (fields[name] && fields[name].replace(/\D/g, "").length < 9) errors[name] = "checkout.errorPhone";
  }
  return errors;
}

const paymentIcons: Record<PaymentMethod, typeof CreditCard> = { card: CreditCard, bank: Landmark, cod: Banknote };
const paymentText = {
  card: { title: "checkout.payCardTitle", desc: "checkout.payCardDesc" },
  bank: { title: "checkout.payBankTitle", desc: "checkout.payBankDesc" },
  cod: { title: "checkout.payCodTitle", desc: "checkout.payCodDesc" },
} as const;

export function CheckoutForm() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const money = useMoney();
  const isClient = useIsClient();
  const hydrated = useAppSelector((state) => state.preferences.hydrated);
  const { lines, subtotalUsd } = useCartLines();

  const [fields, setFields] = useState<Fields | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  const countries = useMemo(() => {
    const names = new Intl.DisplayNames([localeTags[locale]], { type: "region" });
    return countryCodes
      .map((code) => ({ code, name: names.of(code) ?? code }))
      .sort((a, b) => a.name.localeCompare(b.name, localeTags[locale]));
  }, [locale]);

  // The form starts from the date and time chosen on the product page, if any.
  const firstWithDate = lines.find((line) => line.deliveryDate);
  const values: Fields = fields ?? {
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderCountry: "",
    recipientName: "",
    recipientPhone: "",
    address: "",
    city: "",
    deliveryDate: firstWithDate?.deliveryDate ?? "",
    timeSlot: firstWithDate?.timeSlot ?? lines[0]?.timeSlot ?? "afternoon",
    cardMessage: "",
    instructions: "",
    payment: enabledPaymentMethods[0],
  };

  if (!hydrated) return <LoadingBlock />;
  if (lines.length === 0 && !submitting) {
    return <EmptyCart title={t("checkout.emptyTitle")} text={t("checkout.emptyText")} />;
  }

  function update<K extends FieldName>(name: K, value: Fields[K]) {
    setFields({ ...values, [name]: value });
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    const firstInvalid = requiredFields.find((name) => found[name]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSubmitting(true);
    const id = `SL-${Math.floor(100000 + Math.random() * 900000)}`;
    const order: Order = {
      id,
      status: "placed",
      history: { placed: new Date().toISOString() },
      lines: lines.map(({ product, quantity }) => ({ slug: product.slug, quantity, priceUsd: product.priceUsd })),
      totalUsd: subtotalUsd,
      payment: values.payment,
      sender: {
        name: values.senderName.trim(),
        email: values.senderEmail.trim(),
        phone: values.senderPhone.trim(),
        country: values.senderCountry,
      },
      recipient: {
        name: values.recipientName.trim(),
        phone: values.recipientPhone.trim(),
        address: values.address.trim(),
        city: values.city.trim(),
      },
      deliveryDate: values.deliveryDate,
      timeSlot: values.timeSlot,
      cardMessage: values.cardMessage.trim(),
      instructions: values.instructions.trim(),
    };

    // Simulates the round trip to the Laravel API (and the payment gateway, once online payment is on).
    window.setTimeout(() => {
      dispatch(orderPlaced(order));
      dispatch(cartCleared());
      router.push(`${localePath(locale, "/checkout/success")}?order=${id}`);
    }, 900);
  }

  const errorCount = Object.values(errors).filter(Boolean).length;
  const field = (name: FieldName) => ({
    id: name,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1fr_400px] lg:items-start">
      <div className="space-y-6">
        {errorCount > 0 && (
          <p role="alert" className="rounded-2xl bg-rose/10 px-5 py-3.5 text-sm font-semibold text-rose">
            {t("checkout.errorSummary")}
          </p>
        )}

        <FormSection step={1} title={t("checkout.senderTitle")}>
          <Field label={t("checkout.senderName")} error={errors.senderName} name="senderName">
            <input
              {...field("senderName")}
              autoComplete="name"
              value={values.senderName}
              onChange={(event) => update("senderName", event.target.value)}
              className={inputClass(errors.senderName)}
            />
          </Field>
          <Field label={t("checkout.senderEmail")} error={errors.senderEmail} name="senderEmail">
            <input
              {...field("senderEmail")}
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.senderEmail}
              onChange={(event) => update("senderEmail", event.target.value)}
              className={inputClass(errors.senderEmail)}
            />
          </Field>
          <Field label={t("checkout.senderPhone")} error={errors.senderPhone} name="senderPhone">
            <input
              {...field("senderPhone")}
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+61 400 000 000"
              value={values.senderPhone}
              onChange={(event) => update("senderPhone", event.target.value)}
              className={inputClass(errors.senderPhone)}
            />
          </Field>
          <Field label={t("checkout.senderCountry")} error={errors.senderCountry} name="senderCountry">
            <select
              {...field("senderCountry")}
              autoComplete="country"
              value={values.senderCountry}
              onChange={(event) => update("senderCountry", event.target.value)}
              className={cn(inputClass(errors.senderCountry), "cursor-pointer")}
            >
              <option value="" disabled>
                —
              </option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </Field>
        </FormSection>

        <FormSection step={2} title={t("checkout.recipientTitle")}>
          <Field label={t("checkout.recipientName")} error={errors.recipientName} name="recipientName">
            <input
              {...field("recipientName")}
              value={values.recipientName}
              onChange={(event) => update("recipientName", event.target.value)}
              className={inputClass(errors.recipientName)}
            />
          </Field>
          <Field label={t("checkout.recipientPhone")} error={errors.recipientPhone} name="recipientPhone">
            <input
              {...field("recipientPhone")}
              type="tel"
              inputMode="tel"
              placeholder="+94 77 123 4567"
              value={values.recipientPhone}
              onChange={(event) => update("recipientPhone", event.target.value)}
              className={inputClass(errors.recipientPhone)}
            />
          </Field>
          <Field label={t("checkout.address")} error={errors.address} name="address" wide>
            <input
              {...field("address")}
              autoComplete="off"
              placeholder={t("checkout.addressPlaceholder")}
              value={values.address}
              onChange={(event) => update("address", event.target.value)}
              className={inputClass(errors.address)}
            />
          </Field>
          <Field label={t("checkout.city")} error={errors.city} name="city">
            <input
              {...field("city")}
              list="sri-lanka-cities"
              value={values.city}
              onChange={(event) => update("city", event.target.value)}
              className={inputClass(errors.city)}
            />
            <datalist id="sri-lanka-cities">
              {cities.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </Field>
        </FormSection>

        <FormSection step={3} title={t("checkout.deliveryTitle")}>
          <Field label={t("checkout.deliveryDate")} error={errors.deliveryDate} name="deliveryDate">
            <input
              {...field("deliveryDate")}
              type="date"
              min={isClient ? sriLankaDate(0) : undefined}
              max={isClient ? sriLankaDate(90) : undefined}
              value={values.deliveryDate}
              onChange={(event) => update("deliveryDate", event.target.value)}
              className={inputClass(errors.deliveryDate)}
            />
          </Field>
          <Field label={t("checkout.timeSlot")} name="timeSlot">
            <select
              {...field("timeSlot")}
              value={values.timeSlot}
              onChange={(event) => update("timeSlot", event.target.value as TimeSlot)}
              className={cn(inputClass(), "cursor-pointer")}
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {t(slotLabels[slot])}
                </option>
              ))}
            </select>
          </Field>
          <Field label={t("checkout.cardMessage")} name="cardMessage" wide>
            <textarea
              {...field("cardMessage")}
              rows={3}
              maxLength={250}
              placeholder={t("checkout.cardMessagePlaceholder")}
              value={values.cardMessage}
              onChange={(event) => update("cardMessage", event.target.value)}
              className={cn(inputClass(), "h-auto resize-none py-3")}
            />
            <span className="mt-1 block text-right text-xs text-muted tabular-nums">{values.cardMessage.length}/250</span>
          </Field>
          <Field label={t("checkout.instructions")} name="instructions" wide>
            <input
              {...field("instructions")}
              placeholder={t("checkout.instructionsPlaceholder")}
              value={values.instructions}
              onChange={(event) => update("instructions", event.target.value)}
              className={inputClass()}
            />
          </Field>
        </FormSection>

        <FormSection step={4} title={t("checkout.paymentTitle")}>
          <fieldset className="sm:col-span-2">
            <legend className="sr-only">{t("checkout.paymentTitle")}</legend>
            <div className="space-y-3">
              {enabledPaymentMethods.map((method) => {
                const Icon = paymentIcons[method];
                const selected = values.payment === method;
                return (
                  <label
                    key={method}
                    className={cn(
                      "flex cursor-pointer items-start gap-4 rounded-2xl p-4 ring-1 transition-all",
                      selected ? "bg-brand-50/60 ring-2 ring-brand-500" : "bg-white ring-line hover:ring-navy-200",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={selected}
                      onChange={() => update("payment", method)}
                      className="mt-1 size-4 accent-brand-600"
                    />
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2 font-semibold text-navy-900">
                        <Icon className="size-4.5 text-brand-600" aria-hidden />
                        {t(paymentText[method].title)}
                        {method === "card" && (
                          <span className="ml-auto flex gap-1.5">
                            <VisaMark className="h-6 w-9" />
                            <MastercardMark className="h-6 w-9" />
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{t(paymentText[method].desc)}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </FormSection>
      </div>

      <div className="lg:sticky lg:top-28">
        <OrderSummary>
          <Button type="submit" size="lg" fullWidth className="mt-5" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden />
                {t("checkout.placing")}
              </>
            ) : (
              t("checkout.placeOrder", { total: money(subtotalUsd) })
            )}
          </Button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
            <Lock className="size-3.5" aria-hidden />
            {t("checkout.secureNote")}
          </p>
          <Link
            href={localePath(locale, "/cart")}
            className="mt-3 block text-center text-sm font-semibold text-brand-700 hover:text-brand-600"
          >
            {t("checkout.editCart")}
          </Link>
        </OrderSummary>
      </div>
    </form>
  );
}

function inputClass(error?: TranslationKey) {
  return cn(
    "h-12 w-full rounded-xl bg-white px-4 text-[15px] ring-1 outline-none transition-shadow placeholder:text-muted/70 focus:ring-2",
    error ? "ring-rose focus:ring-rose" : "ring-line focus:ring-brand-400",
  );
}

function FormSection({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-5 ring-1 ring-line sm:p-6">
      <h2 className="mb-5 flex items-center gap-3 text-lg font-extrabold text-navy-900">
        <span className="grid size-7 place-items-center rounded-full bg-navy-900 text-sm text-white">{step}</span>
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  wide,
  children,
}: {
  label: string;
  name: FieldName;
  error?: TranslationKey;
  wide?: boolean;
  children: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <div className={cn(wide && "sm:col-span-2")}>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label}
        {requiredFields.includes(name) && <span className="ml-0.5 text-rose">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-xs font-semibold text-rose">
          {t(error)}
        </p>
      )}
    </div>
  );
}
