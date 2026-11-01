import { useDispatch, useSelector, useStore } from "react-redux";
import { formatMoney } from "@/lib/currency";
import { useI18n } from "@/i18n/I18nProvider";
import { getProduct } from "@/data/catalog";
import type { AppDispatch, AppStore, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

/** Formats a USD amount in the shopper's chosen currency and language. */
export function useMoney() {
  const currency = useAppSelector((state) => state.preferences.currency);
  const { locale } = useI18n();
  return (usd: number) => formatMoney(usd, currency, locale);
}

export function useCartLines() {
  const items = useAppSelector((state) => state.cart.items);
  const lines = items.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ ...item, product }] : [];
  });
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotalUsd = lines.reduce((sum, line) => sum + line.quantity * line.product.priceUsd, 0);
  return { lines, count, subtotalUsd };
}
