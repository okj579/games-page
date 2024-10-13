import vueI18nConfig from "~/i18n.config";

export const useI18nConfig = cachedFunction(async function () {
  return vueI18nConfig();
});
