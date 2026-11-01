import { Zap } from "lucide-react";
import type { Badge } from "@/data/catalog";
import { cn } from "@/lib/utils";

const styles: Record<Badge | "sameDay", string> = {
  bestseller: "bg-gold text-navy-950",
  new: "bg-brand-500 text-white",
  premium: "bg-navy-900 text-white",
  sameDay: "bg-white/95 text-navy-900 ring-1 ring-line",
};

export function ProductBadge({ type, label }: { type: Badge | "sameDay"; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] leading-none font-bold shadow-sm",
        styles[type],
      )}
    >
      {type === "sameDay" && <Zap className="size-3 fill-gold text-gold" aria-hidden />}
      {label}
    </span>
  );
}
