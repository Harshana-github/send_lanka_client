"use client";

import { Banknote, CheckCircle2, CreditCard, Landmark, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { localePath, localeTags } from "@/i18n/config";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translate";
import { formatDate, sriLankaDate } from "@/lib/dates";
import { useDeliveryPlaces } from "@/lib/useDeliveryPlaces";
import { useIsClient } from "@/lib/useIsClient";
import { cn } from "@/lib/utils";
import { cartCleared } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector, useCartLines, useMoney } from "@/store/hooks";
import { placeOrder } from "@/store/ordersSlice";
import { Button } from "@/components/ui/Button";
import { MastercardMark, VisaMark } from "@/components/ui/icons";
import { EmptyCart, LoadingBlock } from "./CartView";
import { DeliveryMethods } from "./DeliveryMethods";
import { OrderSummary } from "./OrderSummary";

const countryCodes = ["AU", "GB", "US", "CA", "JP", "CN", "IT", "DE", "FR", "AE", "QA", "SA", "KW", "KR", "NZ", "SG", "MY", "LK"];

type Fields = {
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderCountry: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  postalCode: string;
  /** Which town, when a postal code covers several. */
  town: number;
  deliveryMethod: string;
  deliveryDate: string;
  timeSlot: string;
  cardMessage: string;
  instructions: string;
  payment: string;
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
  "postalCode",
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
  if (fields.postalCode && fields.postalCode.length !== 5) errors.postalCode = "checkout.errorPostal";
  for (const name of ["senderPhone", "recipientPhone"] as const) {
    if (fields[name] && fields[name].replace(/\D/g, "").length < 9) errors[name] = "checkout.errorPhone";
  }
  return errors;
}

const paymentIcons: Record<string, typeof CreditCard> = { card: CreditCard, bank: Landmark, cod: Banknote };

export function CheckoutForm() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const money = useMoney();
  const isClient = useIsClient();
  const hydrated = useAppSelector((state) => state.preferences.hydrated);
  const { lines, subtotalUsd } = useCartLines();
  const { timeSlots, paymentMethods, status } = useAppSelector((state) => state.catalog);

  const [fields, setFields] = useState<Fields | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const delivery = useDeliveryPlaces(fields?.postalCode ?? "", lines.map((line) => line.product.slug));

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
    postalCode: "",
    town: 0,
    deliveryMethod: "",
    deliveryDate: firstWithDate?.deliveryDate ?? "",
    timeSlot: firstWithDate?.timeSlot ?? lines[0]?.timeSlot ?? timeSlots[0]?.id ?? "",
    cardMessage: "",
    instructions: "",
    payment: paymentMethods[0]?.code ?? "",
  };

  if (!hydrated || status === "idle" || status === "loading") return <LoadingBlock />;
  if (lines.length === 0 && !submitting) {
    return <EmptyCart title={t("checkout.emptyTitle")} text={t("checkout.emptyText")} />;
  }

  const place = delivery.places[values.town] ?? delivery.places[0];
  const method = place?.methods.find((option) => option.id === values.deliveryMethod) ?? place?.methods[0];
  const totalUsd = subtotalUsd + (method?.priceUsd ?? 0);
  // A date picked earlier can be too soon for this area, so it moves up to the first day that works.
  const deliveryDate = method && values.deliveryDate < method.earliestDate ? method.earliestDate : values.deliveryDate;
  const postalProblem: TranslationKey | undefined = delivery.failed
    ? "checkout.errorDeliveryCheck"
    : delivery.checked && !place
      ? "checkout.errorNoDelivery"
      : undefined;

  function update<K extends FieldName>(name: K, value: Fields[K]) {
    setFields({ ...values, [name]: value });
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    const found = validate({ ...values, deliveryDate });
    if (!found.postalCode && !method) found.postalCode = postalProblem ?? "checkout.errorPostal";
    setErrors(found);

    const firstInvalid = requiredFields.find((name) => found[name]);
    if (firstInvalid || !place || !method) {
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      // The server works out the prices, the delivery fee and the total.
      const order = await dispatch(
        placeOrder({
          lines: lines.map(({ product, quantity }) => ({ slug: product.slug, quantity })),
          deliveryMethod: method.id,
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
            city: place.town.en,
            postalCode: values.postalCode,
          },
          deliveryDate,
          timeSlot: values.timeSlot,
          cardMessage: values.cardMessage.trim(),
          instructions: values.instructions.trim(),
        }),
      ).unwrap();
      router.push(`${localePath(locale, "/checkout/success")}?order=${order.id}`);
      dispatch(cartCleared());
    } catch (problem) {
      setSubmitError((problem as Error).message);
      setSubmitting(false);
    }
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
        {submitError && (
          <p role="alert" className="rounded-2xl bg-rose/10 px-5 py-3.5 text-sm font-semibold text-rose">
            {submitError}
          </p>
        )}
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
          <Field label={t("checkout.postalCode")} error={errors.postalCode ?? postalProblem} name="postalCode">
            <input
              {...field("postalCode")}
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              placeholder="10100"
              value={values.postalCode}
              onChange={(event) => {
                setFields({ ...values, postalCode: event.target.value.replace(/\D/g, ""), town: 0, deliveryMethod: "" });
                setErrors((current) => ({ ...current, postalCode: undefined }));
              }}
              className={inputClass(errors.postalCode ?? postalProblem)}
            />
            {delivery.checking && (
              <p role="status" className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                <Loader2 className="size-3.5 animate-spin" aria-hidden /> {t("checkout.postalChecking")}
              </p>
            )}
            {place && delivery.places.length === 1 && (
              <p role="status" className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-whatsapp">
                <CheckCircle2 className="size-3.5" aria-hidden /> {place.town[locale]}, {place.district[locale]}
              </p>
            )}
          </Field>
          {delivery.places.length > 1 && (
            <Field label={t("checkout.town")} name="town">
              <select
                {...field("town")}
                value={values.town}
                onChange={(event) => setFields({ ...values, town: Number(event.target.value), deliveryMethod: "" })}
                className={cn(inputClass(), "cursor-pointer")}
              >
                {delivery.places.map((option, index) => (
                  <option key={option.town.en} value={index}>
                    {option.town[locale]}, {option.district[locale]}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </FormSection>

        <FormSection step={3} title={t("checkout.deliveryTitle")}>
          {place && method ? (
            <DeliveryMethods options={place.methods} selectedId={method.id} onChange={(id) => update("deliveryMethod", id)} />
          ) : (
            <p className="rounded-2xl bg-surface px-4 py-3.5 text-sm text-muted sm:col-span-2">{t("checkout.enterPostalFirst")}</p>
          )}
          <Field label={t("checkout.deliveryDate")} error={deliveryDate ? undefined : errors.deliveryDate} name="deliveryDate">
            <input
              {...field("deliveryDate")}
              type="date"
              min={method?.earliestDate ?? (isClient ? sriLankaDate(0) : undefined)}
              max={isClient ? sriLankaDate(90) : undefined}
              value={deliveryDate}
              onChange={(event) => update("deliveryDate", event.target.value)}
              className={inputClass(deliveryDate ? undefined : errors.deliveryDate)}
            />
            {deliveryDate && <span className="mt-1 block text-xs text-muted">{formatDate(deliveryDate, locale)}</span>}
          </Field>
          <Field label={t("checkout.timeSlot")} name="timeSlot">
            <select
              {...field("timeSlot")}
              value={values.timeSlot}
              onChange={(event) => update("timeSlot", event.target.value)}
              className={cn(inputClass(), "cursor-pointer")}
            >
              {timeSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.name[locale]}
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
              {paymentMethods.map(({ code, name, description }) => {
                const Icon = paymentIcons[code] ?? Landmark;
                const selected = values.payment === code;
                return (
                  <label
                    key={code}
                    className={cn(
                      "flex cursor-pointer items-start gap-4 rounded-2xl p-4 ring-1 transition-all",
                      selected ? "bg-brand-50/60 ring-2 ring-brand-500" : "bg-white ring-line hover:ring-navy-200",
                    )}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={code}
                      checked={selected}
                      onChange={() => update("payment", code)}
                      className="mt-1 size-4 accent-brand-600"
                    />
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2 font-semibold text-navy-900">
                        <Icon className="size-4.5 text-brand-600" aria-hidden />
                        {name[locale]}
                        {code === "card" && (
                          <span className="ml-auto flex gap-1.5">
                            <VisaMark className="h-6 w-9" />
                            <MastercardMark className="h-6 w-9" />
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{description[locale]}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </FormSection>
      </div>

      <div className="lg:sticky lg:top-28">
        <OrderSummary deliveryFeeUsd={method?.priceUsd}>
          <Button type="submit" size="lg" fullWidth className="mt-5" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="size-5 animate-spin" aria-hidden />
                {t("checkout.placing")}
              </>
            ) : (
              t("checkout.placeOrder", { total: money(totalUsd) })
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
