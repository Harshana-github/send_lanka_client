"use client";

import { ChevronDown } from "lucide-react";
import { CatalogGate } from "@/components/CatalogGate";
import { useI18n } from "@/i18n/I18nProvider";
import { useAppSelector } from "@/store/hooks";

export function FaqList() {
  const { locale } = useI18n();
  const faqs = useAppSelector((state) => state.catalog.faqs);

  return (
    <CatalogGate fallback={<div aria-hidden className="h-64 animate-pulse rounded-2xl bg-white" />}>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details key={faq.id} className="group rounded-2xl bg-white ring-1 ring-line open:shadow-card" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-base font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
              {faq.question[locale]}
              <ChevronDown className="size-5 shrink-0 text-brand-600 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted">{faq.answer[locale]}</p>
          </details>
        ))}
      </div>
    </CatalogGate>
  );
}
