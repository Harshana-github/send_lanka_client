import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  action,
  align = "left",
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-4 sm:mb-10",
        align === "center" ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        <h2 className="text-2xl font-extrabold tracking-tight text-navy-900 text-balance sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-base text-muted sm:text-lg">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
