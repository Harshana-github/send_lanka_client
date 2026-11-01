import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  href,
  tagline,
  inverted = false,
  className,
}: {
  href: string;
  tagline: string;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={cn("group flex items-center gap-2.5", className)} aria-label="SENDLANKA home">
      <span
        className={cn(
          "grid size-10 place-items-center rounded-xl transition-transform group-hover:-rotate-6 sm:size-11",
          inverted ? "bg-white" : "bg-brand-50",
        )}
      >
        <Image src="/brand/logo-mark.png" alt="" width={36} height={27} loading="eager" className="h-auto w-7 sm:w-8" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-lg font-extrabold tracking-[0.08em] sm:text-xl",
            inverted ? "text-white" : "text-navy-900",
          )}
        >
          SENDLANKA
        </span>
        <span className={cn("mt-1 text-[11px] font-medium", inverted ? "text-brand-200" : "text-brand-600")}>
          {tagline}
        </span>
      </span>
    </Link>
  );
}
