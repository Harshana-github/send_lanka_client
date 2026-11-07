import { Truck, Zap } from "lucide-react";
import type { Badge } from "@/data/catalog";
import { cn } from "@/lib/utils";

type BadgeType = Badge | "sameDay" | "freeDelivery";

const styles: Record<BadgeType, string> = {
  bestseller: "bg-gold text-navy-950",
  new: "bg-brand-500 text-white",
  premium: "bg-navy-900 text-white",
  sameDay: "bg-white/95 text-navy-900 ring-1 ring-line",
  freeDelivery: "bg-white/95 text-whatsapp ring-1 ring-line",
};

export function ProductBadge({ type, label }: { type: BadgeType; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] leading-none font-bold shadow-sm",
        styles[type],
      )}
    >
      {type === "sameDay" && <Zap className="size-3 fill-gold text-gold" aria-hidden />}
      {type === "freeDelivery" && <Truck className="size-3" aria-hidden />}
      {label}
    </span>
  );
}
