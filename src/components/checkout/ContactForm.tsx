"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";

const inputClass =
  "w-full rounded-xl bg-white px-4 text-[15px] ring-1 ring-line outline-none focus:ring-2 focus:ring-brand-400";

export function ContactForm() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center rounded-3xl bg-brand-50 px-6 py-14 text-center">
        <CheckCircle2 className="size-12 text-whatsapp" aria-hidden />
        <p className="mt-4 max-w-sm font-semibold text-navy-900">{t("contact.sent")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy-900">{t("contact.name")}</span>
          <input required name="name" autoComplete="name" className={`${inputClass} h-12`} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-navy-900">{t("contact.emailField")}</span>
          <input required type="email" name="email" autoComplete="email" className={`${inputClass} h-12`} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold text-navy-900">{t("contact.message")}</span>
        <textarea required name="message" rows={5} className={`${inputClass} resize-none py-3`} />
      </label>
      <Button type="submit" size="lg">
        <Send className="size-4.5" aria-hidden />
        {t("contact.send")}
      </Button>
    </form>
  );
}
