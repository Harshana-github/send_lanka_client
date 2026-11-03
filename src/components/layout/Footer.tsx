import { Clock, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { featuredCategoryIds } from "@/data/catalog";
import { localePath, type Locale } from "@/i18n/config";
import type { Translate } from "@/i18n/translate";
import { features } from "@/lib/features";
import { site, whatsappLink } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { MastercardMark, VisaMark, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";

export function Footer({ locale, t }: { locale: Locale; t: Translate }) {
  const helpLinks = [
    { label: t("nav.howItWorks"), href: localePath(locale, "/how-it-works") },
    { label: t("footer.faq"), href: `${localePath(locale, "/how-it-works")}#faq` },
    { label: t("nav.track"), href: localePath(locale, "/track") },
    { label: t("footer.deliveryInfo"), href: `${localePath(locale, "/how-it-works")}#faq` },
    { label: t("nav.contact"), href: localePath(locale, "/contact") },
  ];

  return (
    <footer className="bg-navy-950 text-navy-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <Logo href={localePath(locale)} tagline={t("brand.tagline")} inverted />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-navy-200">{t("footer.about")}</p>
          <div className="mt-6">
            <p className="mb-2.5 text-xs font-bold tracking-wider text-navy-200 uppercase">{t("footer.payments")}</p>
            <div className="flex flex-wrap items-center gap-2">
              {features.onlinePayment && (
                <>
                  <VisaMark className="h-8 w-12" />
                  <MastercardMark className="h-8 w-12" />
                </>
              )}
              {[t("checkout.payBankTitle"), t("checkout.payCodTitle")].map((label) => (
                <span key={label} className="rounded-md bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-bold text-white">{t("footer.shop")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {featuredCategoryIds.map((id) => (
              <li key={id}>
                <Link href={`${localePath(locale, "/shop")}?category=${id}`} className="hover:text-brand-300">
                  {t(`categories.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-bold text-white">{t("footer.help")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {helpLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-brand-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-sm font-bold text-white">{t("footer.contact")}</h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li>
              <a
                href={whatsappLink(t("cta.whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-brand-300"
              >
                <WhatsAppIcon className="size-4.5 text-brand-300" />
                {site.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-brand-300">
                <Mail className="size-4.5 text-brand-300" aria-hidden />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4.5 shrink-0 text-brand-300" aria-hidden />
              {t("contact.hours")}
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4.5 text-brand-300" aria-hidden />
              {t("contact.location")}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-200 sm:flex-row">
          <p>{t("footer.rights")}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <li>{t("footer.terms")}</li>
            <li>{t("footer.privacy")}</li>
            <li>{t("footer.refund")}</li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
