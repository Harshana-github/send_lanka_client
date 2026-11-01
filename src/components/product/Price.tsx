"use client";

import { useMoney } from "@/store/hooks";
import { cn } from "@/lib/utils";

export function Price({
  usd,
  compareAtUsd,
  size = "md",
  className,
}: {
  usd: number;
  compareAtUsd?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const money = useMoney();

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2 gap-y-0.5", className)}>
      <span
        className={cn(
          "font-extrabold text-navy-900 tabular-nums",
          size === "sm" && "text-base",
          size === "md" && "text-lg",
          size === "lg" && "text-3xl",
        )}
      >
        {money(usd)}
      </span>
      {compareAtUsd && compareAtUsd > usd && (
        <span className={cn("text-muted line-through tabular-nums", size === "lg" ? "text-lg" : "text-sm")}>
          {money(compareAtUsd)}
        </span>
      )}
    </span>
  );
}
