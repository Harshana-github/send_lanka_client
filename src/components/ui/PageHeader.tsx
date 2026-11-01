import type { ReactNode } from "react";
import { Container } from "./Container";

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="border-b border-line bg-gradient-to-br from-brand-50 via-white to-navy-50">
      <Container className="py-10 sm:py-14">
        {children}
        <h1 className="text-3xl font-extrabold tracking-tight text-navy-900 text-balance sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">{subtitle}</p>}
      </Container>
    </section>
  );
}
