import {
  ArrowRight,
  Camera,
  Gift,
  HeartHandshake,
  MessageCircle,
  PenLine,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { localePath, type Locale } from "@/i18n/config";
import type { Translate } from "@/i18n/translate";
import { whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

type SectionProps = { locale: Locale; t: Translate };

export function HowItWorksSteps({ t }: { t: Translate }) {
  const steps = [
    { icon: Gift, title: t("how.step1Title"), text: t("how.step1Desc") },
    { icon: PenLine, title: t("how.step2Title"), text: t("how.step2Desc") },
    { icon: Wallet, title: t("how.step3Title"), text: t("how.step3Desc") },
    { icon: Camera, title: t("how.step4Title"), text: t("how.step4Desc") },
  ];

  return (
    <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <span
        aria-hidden
        className="absolute top-8 right-[12%] left-[12%] hidden border-t-2 border-dashed border-brand-200 lg:block"
      />
      {steps.map(({ icon: Icon, title, text }, index) => (
        <li key={title} className="relative rounded-2xl bg-white p-6 text-center shadow-card ring-1 ring-line">
          <span className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-md">
            <Icon className="size-7" aria-hidden />
            <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-navy-900 text-xs font-bold text-white ring-2 ring-white">
              {index + 1}
            </span>
          </span>
          <h3 className="mt-5 text-lg font-bold text-navy-900">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
        </li>
      ))}
    </ol>
  );
}

export function HowItWorksSection({ locale, t }: SectionProps) {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading title={t("how.title")} subtitle={t("how.subtitle")} align="center" />
        <HowItWorksSteps t={t} />
        <div className="mt-10 text-center">
          <Button href={localePath(locale, "/shop")} variant="primary" size="lg">
            {t("hero.ctaPrimary")}
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      </Container>
    </section>
  );
}

export function WhyChooseUs({ t }: { t: Translate }) {
  const features = [
    { icon: Truck, title: t("why.deliveryTitle"), text: t("why.deliveryDesc") },
    { icon: MessageCircle, title: t("why.supportTitle"), text: t("why.supportDesc") },
    { icon: Sparkles, title: t("why.qualityTitle"), text: t("why.qualityDesc") },
    { icon: ShieldCheck, title: t("why.paymentTitle"), text: t("why.paymentDesc") },
  ];

  const stats = [
    { value: "25", label: t("why.statDistricts") },
    { value: "12k+", label: t("why.statFamilies") },
    { value: "4.9★", label: t("why.statRating") },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-900 py-14 text-white sm:py-20">
      <Image
        src="/images/site/sri-lanka.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-15"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/95 to-navy-900/70" />
      <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-300">
            <HeartHandshake className="size-6" aria-hidden />
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{t("why.title")}</h2>
          <p className="mt-3 max-w-md text-lg text-navy-100">{t("why.subtitle")}</p>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <dt className="mt-1 text-xs leading-snug text-navy-200">{stat.label}</dt>
                <dd className="text-2xl font-extrabold text-brand-300 sm:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur-sm">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-500 text-white">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-100">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Testimonials({ t }: { t: Translate }) {
  const items = [
    { quote: t("testimonials.q1"), name: t("testimonials.n1"), place: t("testimonials.l1") },
    { quote: t("testimonials.q2"), name: t("testimonials.n2"), place: t("testimonials.l2") },
    { quote: t("testimonials.q3"), name: t("testimonials.n3"), place: t("testimonials.l3") },
  ];

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading title={t("testimonials.title")} subtitle={t("testimonials.subtitle")} align="center" />
        <ul className="grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <li key={item.name}>
              <figure className="flex h-full flex-col rounded-2xl bg-surface p-6 ring-1 ring-line">
                <Quote className="size-8 fill-brand-100 text-brand-200" aria-hidden />
                <div className="mt-3 flex gap-0.5" aria-label="5/5">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <Star key={index} className="size-4 fill-gold text-gold" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">“{item.quote}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <span className="grid size-10 place-items-center rounded-full bg-navy-900 text-sm font-bold text-white">
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy-900">{item.name}</span>
                    <span className="block text-xs text-muted">{item.place}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function WhatsAppCta({ t }: { t: Translate }) {
  return (
    <section className="pb-14 sm:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-10 sm:px-12 sm:py-14">
          <Image src="/images/site/ribbons-dark.jpg" alt="" fill sizes="100vw" className="object-cover opacity-40" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/40" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl font-extrabold text-white text-balance sm:text-3xl">{t("cta.title")}</h2>
              <p className="mt-3 text-base text-navy-100 sm:text-lg">{t("cta.subtitle")}</p>
            </div>
            <Button href={whatsappLink(t("cta.whatsappMessage"))} external variant="whatsapp" size="lg">
              <WhatsAppIcon className="size-5" />
              {t("cta.button")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
