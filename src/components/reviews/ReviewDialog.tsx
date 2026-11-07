"use client";

import { CheckCircle2, Star, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import type { TranslationKey } from "@/i18n/translate";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { submitReview } from "@/store/reviewsSlice";
import { REVIEW_LIMITS, type Product, type Rating } from "@/types";
import { Button } from "@/components/ui/Button";

const ratingWords: Record<Rating, TranslationKey> = {
  1: "reviews.rating1",
  2: "reviews.rating2",
  3: "reviews.rating3",
  4: "reviews.rating4",
  5: "reviews.rating5",
};

type Errors = { rating?: TranslationKey; name?: TranslationKey };

/** Rendered only while open, so its state starts fresh each time. */
export function ReviewDialog({ product, onClose }: { product: Product; onClose: () => void }) {
  const { locale, t } = useI18n();
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<Rating | 0>(0);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [hovered, setHovered] = useState<Rating | 0>(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const firstStar = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found: Errors = {};
    if (!rating) found.rating = "reviews.errorRating";
    if (!name.trim()) found.name = "reviews.errorName";
    setErrors(found);
    if (found.rating) return firstStar.current?.focus();
    if (found.name) return nameInput.current?.focus();

    // Bots fill every field, people never see this one: accept silently but don't save.
    if (!honeypot.current?.value) {
      setSending(true);
      setSendError("");
      try {
        await dispatch(submitReview({ productSlug: product.slug, rating: rating as Rating, name: name.trim(), comment: comment.trim() })).unwrap();
      } catch (problem) {
        setSendError((problem as Error).message);
        setSending(false);
        return;
      }
    }
    setDone(true);
  }

  const shown = hovered || rating;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="review-dialog-title">
      <button type="button" aria-label={t("reviews.close")} className="absolute inset-0 animate-fade-in bg-navy-950/50 backdrop-blur-sm" onClick={onClose} />

      <div
        tabIndex={-1}
        autoFocus
        className="relative max-h-[92dvh] w-full animate-fade-in overflow-y-auto rounded-t-3xl bg-white shadow-lift outline-none sm:max-w-lg sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-white/95 px-5 py-4 backdrop-blur">
          <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-surface ring-1 ring-line">
            <Image src={product.image} alt="" fill sizes="48px" className="object-cover" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="review-dialog-title" className="font-extrabold text-navy-900">
              {t("reviews.formTitle")}
            </h2>
            <p className="truncate text-sm text-muted">{t("reviews.formSubtitle", { product: product.name[locale] })}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t("reviews.close")} className="grid size-10 shrink-0 place-items-center rounded-full hover:bg-navy-50">
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {done ? (
          <div role="status" className="flex flex-col items-center px-6 py-12 text-center">
            <span className="grid size-18 animate-pop place-items-center rounded-full bg-whatsapp/10">
              <CheckCircle2 className="size-10 text-whatsapp" aria-hidden />
            </span>
            <p className="mt-5 text-xl font-extrabold text-navy-900">{t("reviews.thanksTitle")}</p>
            <p className="mt-2 max-w-sm text-muted">{t("reviews.thanksText")}</p>
            <Button onClick={onClose} size="lg" className="mt-8 min-w-40" autoFocus>
              {t("reviews.done")}
            </Button>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit} className="space-y-6 px-5 pt-6 pb-6">
            <fieldset>
              <legend className="mb-3 block w-full text-center text-sm font-semibold text-navy-900">{t("reviews.ratingLabel")}</legend>
              <div className="flex justify-center gap-1.5" onMouseLeave={() => setHovered(0)}>
                {([1, 2, 3, 4, 5] as const).map((value) => (
                  <label key={value} className="cursor-pointer" onMouseEnter={() => setHovered(value)}>
                    <input
                      ref={value === 1 ? firstStar : undefined}
                      type="radio"
                      name="rating"
                      value={value}
                      checked={rating === value}
                      onChange={() => {
                        setRating(value);
                        setErrors((current) => ({ ...current, rating: undefined }));
                      }}
                      className="peer sr-only"
                    />
                    <span className="sr-only">{t("reviews.starLabel", { count: value })}</span>
                    <Star
                      aria-hidden
                      className={cn(
                        "size-11 rounded-lg p-0.5 transition-transform duration-150 hover:scale-110 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-400 sm:size-12",
                        value <= shown ? "fill-gold text-gold" : "fill-surface text-navy-200",
                      )}
                    />
                  </label>
                ))}
              </div>
              <p className={cn("mt-2 h-5 text-center text-sm font-semibold", errors.rating ? "text-rose" : shown ? "text-navy-900" : "text-muted")} aria-live="polite">
                {errors.rating ? t(errors.rating) : shown ? t(ratingWords[shown]) : t("reviews.ratingHint")}
              </p>
            </fieldset>

            <div>
              <label htmlFor="review-name" className="mb-1.5 block text-sm font-semibold text-navy-900">
                {t("reviews.name")}
              </label>
              <input
                ref={nameInput}
                id="review-name"
                autoComplete="name"
                maxLength={REVIEW_LIMITS.name}
                value={name}
                placeholder={t("reviews.namePlaceholder")}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "review-name-error" : undefined}
                onChange={(event) => {
                  setName(event.target.value);
                  if (errors.name) setErrors((current) => ({ ...current, name: undefined }));
                }}
                className={cn(
                  "h-12 w-full rounded-xl bg-white px-4 text-[15px] ring-1 outline-none placeholder:text-muted/70 focus:ring-2",
                  errors.name ? "ring-rose focus:ring-rose" : "ring-line focus:ring-brand-400",
                )}
              />
              {errors.name && (
                <p id="review-name-error" className="mt-1.5 text-xs font-semibold text-rose">
                  {t(errors.name)}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="review-comment" className="mb-1.5 flex items-baseline justify-between text-sm font-semibold text-navy-900">
                <span>
                  {t("reviews.comment")} <span className="font-normal text-muted">({t("reviews.optional")})</span>
                </span>
                <span className="text-xs font-normal text-muted tabular-nums">
                  {comment.length}/{REVIEW_LIMITS.comment}
                </span>
              </label>
              <textarea
                id="review-comment"
                rows={4}
                maxLength={REVIEW_LIMITS.comment}
                value={comment}
                placeholder={t("reviews.commentPlaceholder")}
                onChange={(event) => setComment(event.target.value)}
                className="w-full resize-none rounded-xl bg-white px-4 py-3 text-[15px] ring-1 ring-line outline-none placeholder:text-muted/70 focus:ring-2 focus:ring-brand-400"
              />
            </div>

            <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <div className="space-y-3">
              {sendError && (
                <p role="alert" className="mb-3 text-sm font-semibold text-rose">
                  {sendError}
                </p>
              )}
              <Button type="submit" size="lg" fullWidth disabled={sending}>
                {t("reviews.submit")}
              </Button>
              <p className="text-center text-xs text-muted">{t("reviews.privacy")}</p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
