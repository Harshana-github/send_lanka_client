"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/icons";

export function WhatsAppFab() {
  const { t } = useI18n();
  const pathname = usePathname();
  // Product pages show a sticky purchase bar on phones, so lift the button above it.
  const raised = /\/product\//.test(pathname);
  const hidden = /\/checkout/.test(pathname);

  if (hidden) return null;

  return (
    <a
      href={whatsappLink(t("cta.whatsappMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("cta.button")}
      className={cn(
        "fixed right-4 z-30 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-lift transition-transform hover:scale-105 hover:bg-whatsapp-hover sm:right-6 sm:bottom-6",
        raised ? "bottom-24" : "bottom-5",
      )}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.5s]" aria-hidden />
      <WhatsAppIcon className="relative size-7" />
    </a>
  );
}
