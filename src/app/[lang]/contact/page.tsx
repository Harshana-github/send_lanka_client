import { Clock, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/checkout/ContactForm";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { resolveLocale } from "@/lib/page";
import { site, whatsappLink } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { t } = await resolveLocale(params);
  return { title: t("contact.title"), description: t("contact.subtitle") };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { t } = await resolveLocale(params);

  const channels = [
    {
      icon: WhatsAppIcon,
      label: t("contact.whatsapp"),
      value: site.whatsappDisplay,
      href: whatsappLink(t("cta.whatsappMessage")),
      accent: "bg-whatsapp text-white",
    },
    { icon: Mail, label: t("contact.email"), value: site.email, href: `mailto:${site.email}`, accent: "bg-brand-500 text-white" },
    { icon: Clock, label: t("contact.hoursTitle"), value: t("contact.hours"), accent: "bg-navy-900 text-white" },
    { icon: MapPin, label: t("contact.locationTitle"), value: t("contact.location"), accent: "bg-gold text-navy-950" },
  ];

  return (
    <>
      <PageHeader title={t("contact.title")} subtitle={t("contact.subtitle")} />
      <Container className="grid gap-10 py-10 sm:py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <ul className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {channels.map(({ icon: Icon, label, value, href, accent }) => {
            const content = (
              <>
                <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${accent}`}>
                  <Icon className="size-5.5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-muted">{label}</span>
                  <span className="block font-semibold text-navy-900">{value}</span>
                </span>
              </>
            );
            return (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-line transition-shadow hover:shadow-card"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="rounded-3xl bg-surface p-6 ring-1 ring-line sm:p-8">
          <h2 className="mb-6 text-xl font-extrabold text-navy-900">{t("contact.formTitle")}</h2>
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
