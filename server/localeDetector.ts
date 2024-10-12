export default defineI18nLocaleDetector((event, config) => {
  return getRouterParam(event, "locale") ?? config.defaultLocale;
});
