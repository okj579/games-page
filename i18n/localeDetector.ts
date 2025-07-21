export default defineI18nLocaleDetector((event, config) => {
  return (
    getRouterParam(event, "locale") ??
    tryQueryLocale(event)?.toString() ??
    config.defaultLocale
  );
});
