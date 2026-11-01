"use client";

import { Minus, Plus } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { MAX_QUANTITY } from "@/store/cartSlice";
import { cn } from "@/lib/utils";

export function QuantityStepper({
  value,
  onChange,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  size?: "sm" | "md";
}) {
  const { t } = useI18n();
  const buttonClass = cn(
    "grid place-items-center rounded-full text-navy-900 transition-colors hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent",
    size === "sm" ? "size-7" : "size-9",
  );

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-surface p-1 ring-1 ring-line",
        size === "sm" ? "gap-1" : "gap-2",
      )}
    >
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={t("common.decrease")}
      >
        <Minus className="size-3.5" aria-hidden />
      </button>
      <span
        className={cn("min-w-6 text-center font-bold tabular-nums", size === "sm" ? "text-sm" : "text-base")}
        aria-live="polite"
        aria-label={t("common.quantity")}
      >
        {value}
      </span>
      <button
        type="button"
        className={buttonClass}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY}
        aria-label={t("common.increase")}
      >
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}
