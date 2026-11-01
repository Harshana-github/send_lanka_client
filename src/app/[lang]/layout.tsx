import type { Metadata, Viewport } from "next";
import { Noto_Sans_Sinhala, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { hasLocale, localeTags, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { I18nProvider } from "@/i18n/I18nProvider";
import { createTranslator } from "@/i18n/translate";
import { site } from "@/lib/site";
import { StoreProvider } from "@/store/StoreProvider";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const sinhala = Noto_Sans_Sinhala({ subsets: ["sinhala"], variable: "--font-sinhala", display: "swap" });
// Japanese and Chinese use the excellent system fonts (Hiragino, Yu Gothic, PingFang, YaHei) — see globals.css.

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dictionary = await getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: { default: dictionary.meta.title, template: `%s | ${site.name}` },
    description: dictionary.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((code) => [localeTags[code], `/${code}`])),
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      siteName: site.name,
      locale: localeTags[lang].replace("-", "_"),
      type: "website",
      images: [{ url: "/images/products/signature-gift-box.jpg", width: 1000, height: 667 }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0b2545",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);
  const t = createTranslator(dictionary);

  return (
    <html
      lang={lang}
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${sinhala.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <I18nProvider locale={lang} dictionary={dictionary}>
          <StoreProvider>
            <a
              href="#main"
              className="sr-only z-[60] rounded-full bg-navy-900 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              {t("common.skipToContent")}
            </a>
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer locale={lang} t={t} />
            <CartDrawer />
            <WhatsAppFab />
          </StoreProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
