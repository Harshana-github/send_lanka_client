import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Read-only star rating. Pass `label` so screen readers hear the score. */
export function Stars({
  rating,
  size = "md",
  label,
  className,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}) {
  const iconSize = size === "sm" ? "size-3.5" : size === "lg" ? "size-6" : "size-4";
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={label}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={cn(iconSize, value <= Math.round(rating) ? "fill-gold text-gold" : "fill-line text-line")}
          aria-hidden
        />
      ))}
    </span>
  );
}
