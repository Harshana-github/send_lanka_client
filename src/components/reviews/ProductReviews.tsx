"use client";

import { BadgeCheck, Clock, PenLine } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { formatDate } from "@/lib/dates";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadReviews } from "@/store/reviewsSlice";
import type { Product, Review } from "@/types";
import { Button } from "@/components/ui/Button";
import { ReviewDialog } from "./ReviewDialog";
import { Stars } from "./Stars";

const PAGE_SIZE = 3;

export function ProductReviews({ product }: { product: Product }) {
  const { t } = useI18n();
  const [writing, setWriting] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const dispatch = useAppDispatch();
  const submitted = useAppSelector((state) => state.reviews.submitted);
  const loaded = useAppSelector((state) => state.reviews.approved[product.slug]);
  const closeDialog = useCallback(() => setWriting(false), []);

  // Close the dialog if the page is hidden by client navigation, so it isn't open on return.
  useLayoutEffect(() => () => setWriting(false), []);

  useEffect(() => {
    dispatch(loadReviews(product.slug));
  }, [product.slug, dispatch]);

  const approved = useMemo(() => loaded ?? [], [loaded]);
  // A review the admin has approved now shows with the others, so it's no longer waiting.
  const pending = useMemo(
    () =>
      submitted.filter(
        (review) =>
          review.productSlug === product.slug &&
          !approved.some((item) => item.name === review.name && item.comment === review.comment),
      ),
    [submitted, approved, product.slug],
  );

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-28 py-14 sm:py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="reviews-title" className="text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
            {t("reviews.title")}
          </h2>
          <div className="mt-5 rounded-3xl bg-surface p-6 ring-1 ring-line">
            {product.reviewCount > 0 && (
              <div className="mb-6 flex items-center gap-4 border-b border-line pb-6">
                <span className="text-5xl font-extrabold text-navy-900 tabular-nums">{product.rating.toFixed(1)}</span>
                <div>
                  <Stars rating={product.rating} size="lg" label={t("reviews.starLabel", { count: product.rating.toFixed(1) })} />
                  <p className="mt-1 text-sm text-muted">{t("reviews.basedOn", { count: product.reviewCount })}</p>
                </div>
              </div>
            )}
            <div>
              <p className="text-sm text-muted">{t("reviews.writeHint")}</p>
              <Button onClick={() => setWriting(true)} size="lg" fullWidth className="mt-4">
                <PenLine className="size-4.5" aria-hidden />
                {t("reviews.write")}
              </Button>
            </div>
          </div>
        </div>

        <div>
          {pending.length === 0 && approved.length === 0 ? (
            <p className="rounded-3xl bg-surface p-8 text-center text-muted ring-1 ring-line">{t("reviews.empty")}</p>
          ) : (
            <ul className="space-y-4">
              {pending.map((review) => (
                <ReviewCard key={review.id} review={review} pending />
              ))}
              {approved.slice(0, visible).map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </ul>
          )}

          {approved.length > visible && (
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                {t("reviews.showMore")}
              </Button>
            </div>
          )}
        </div>
      </div>

      {writing && <ReviewDialog product={product} onClose={closeDialog} />}
    </section>
  );
}

function ReviewCard({ review, pending = false }: { review: Review; pending?: boolean }) {
  const { locale, t } = useI18n();
  return (
    <li className={cn("rounded-3xl p-5 ring-1 sm:p-6", pending ? "bg-gold/5 ring-gold/40" : "bg-white ring-line")}>
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy-900 font-bold text-white">
          {review.name.trim().charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="font-bold text-navy-900">{review.name}</p>
            {pending ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-navy-900">
                <Clock className="size-3.5" aria-hidden />
                {t("reviews.pending")}
              </span>
            ) : (
              review.verified && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-whatsapp">
                  <BadgeCheck className="size-4" aria-hidden />
                  {t("reviews.verified")}
                </span>
              )
            )}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <Stars rating={review.rating} size="sm" label={t("reviews.starLabel", { count: review.rating })} />
            <span className="text-xs text-muted">{formatDate(review.createdAt, locale)}</span>
          </div>
        </div>
      </div>
      {review.comment && <p className="mt-4 text-[15px] leading-relaxed whitespace-pre-line text-ink">{review.comment}</p>}
      {pending && <p className="mt-3 text-xs font-medium text-muted">{t("reviews.pendingNote")}</p>}
    </li>
  );
}
