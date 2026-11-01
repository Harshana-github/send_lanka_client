import { Compass } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-brand-50">
        <Compass className="size-9 text-brand-500" aria-hidden />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-navy-900">404</h1>
      <p className="mt-2 text-muted">Page not found · පිටුව හමු නොවුණා · ページが見つかりません · 页面未找到</p>
      <Link href="/" className="mt-8 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-800">
        SENDLANKA
      </Link>
    </Container>
  );
}
