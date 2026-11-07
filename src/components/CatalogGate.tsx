"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { loadCatalog } from "@/store/catalogSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/Button";

/** Shows its children once the shop has loaded, a placeholder until then, and a retry if it failed. */
export function CatalogGate({ fallback, children }: { fallback: ReactNode; children: ReactNode }) {
  const { t } = useI18n();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.catalog.status);

  if (status === "ready") return children;
  if (status !== "failed") return fallback;

  return (
    <div role="alert" className="py-16 text-center">
      <p className="font-semibold text-navy-900">{t("common.loadFailed")}</p>
      <Button onClick={() => dispatch(loadCatalog())} className="mt-5">
        {t("common.retry")}
      </Button>
    </div>
  );
}
