import { resolveFallbacks } from "~/shared/resolveFallbacks";

export function useFallbackLocales() {
  const { locale, fallbackLocale } = useI18n();
  return computed(() => resolveFallbacks(fallbackLocale.value, locale.value));
}
