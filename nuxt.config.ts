// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/i18n",
    "@nuxt/ui",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@nuxt/image",
  ],

  i18n: {
    locales: [
      { code: "en", language: "en-US", file: "en.json", name: "English" },
      { code: "de", language: "de-DE", file: "de.json", name: "Deutsch" },
    ],
    defaultLocale: "en",
    experimental: {
      localeDetector: "localeDetector.ts",
    },
  },

  content: {
    experimental: { sqliteConnector: "native" },
    build: {
      transformers: ["~~/shared/gameContentTransformer.ts"],
    },
    renderer: {
      anchorLinks: false,
    },
  },

  icon: {
    serverBundle: {
      disabled: true,
    },
    clientBundle: {
      scan: true,
    },
  },

  compatibilityDate: "2025-07-07",
});
