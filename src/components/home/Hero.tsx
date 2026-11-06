import { Landmark, CheckCircle2, MapPin, Star, Truck, Zap } from "lucide-react";
import Image from "next/image";
import { localePath, type Locale } from "@/i18n/config";
import type { Translate } from "@/i18n/translate";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero({ locale, t }: { locale: Locale; t: Translate }) {
  const badges = [
    { icon: MapPin, label: t("hero.badgeIslandwide") },
    { icon: Zap, label: t("hero.badgeSameDay") },
    { icon: Landmark, label: t("checkout.payBankTitle") },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-navy-50">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -left-32 size-[420px] rounded-full bg-navy-100/60 blur-3xl"
      />

      <Container className="relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-100">
            <span className="size-1.5 rounded-full bg-brand-500" aria-hidden />
            {t("hero.eyebrow")}
          </p>

          <h1 className="mt-5 text-[2.1rem] leading-[1.12] font-extrabold tracking-tight text-navy-900 text-balance sm:text-5xl lg:text-[3.4rem]">
            {t("hero.titleLine1")}
            <span className="mt-1 block bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              {t("hero.titleLine2")}
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t("hero.subtitle")}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href={localePath(locale, "/shop")} size="lg" variant="accent">
              {t("hero.ctaPrimary")}
            </Button>
            <Button href={localePath(locale, "/how-it-works")} size="lg" variant="outline">
              {t("hero.ctaSecondary")}
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2">
            {badges.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-navy-800 shadow-sm ring-1 ring-line"
              >
                <Icon className="size-3.5 text-brand-600" aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-4 border-t border-navy-100 pt-6">
            <div className="flex -space-x-2.5" aria-hidden>
              {["/images/occasions/love.jpg", "/images/occasions/mothers-day.jpg", "/images/occasions/birthday.jpg"].map(
                (src) => (
                  <span key={src} className="relative size-9 overflow-hidden rounded-full ring-2 ring-white">
                    <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                  </span>
                ),
              )}
            </div>
            <div className="text-sm">
              <p className="flex items-center gap-1 font-bold text-navy-900">
                {[0, 1, 2, 3, 4].map((index) => (
                  <Star key={index} className="size-3.5 fill-gold text-gold" aria-hidden />
                ))}
                <span className="ml-1">{t("hero.statRating")}</span>
              </p>
              <p className="text-muted">{t("hero.statFamilies")}</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift ring-8 ring-white sm:aspect-[5/5]">
            <Image
              src="/images/products/signature-gift-box.jpg"
              alt=""
              fill
              preload
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lift ring-1 ring-line sm:-left-8">
            <span className="relative size-12 overflow-hidden rounded-xl">
              <Image src="/images/products/red-rose-bouquet.jpg" alt="" fill sizes="48px" className="object-cover" />
            </span>
            <div>
              <p className="flex items-center gap-1 text-xs font-bold text-whatsapp">
                <CheckCircle2 className="size-3.5" aria-hidden />
                {t("hero.deliveredToday")}
              </p>
              <p className="text-sm font-semibold text-navy-900">{t("hero.deliveredTo")}</p>
            </div>
          </div>

          <div className="absolute -top-4 -right-2 flex items-center gap-2 rounded-2xl bg-navy-900 px-4 py-3 text-white shadow-lift sm:-right-6">
            <Truck className="size-5 text-brand-300" aria-hidden />
            <span className="text-sm font-semibold">{t("hero.badgeSameDay")}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
