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
      { code: "en", language: "en-US", file: "en.yaml", name: "English" },
      { code: "de", language: "de-DE", file: "de.yaml", name: "Deutsch" },
    ],
    defaultLocale: "en",
    experimental: {
      localeDetector: "localeDetector.ts",
    },
  },

  content: {
    locales: ["en", "de"],
    markdown: {
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

  routeRules: {
    "/api/**": { prerender: true },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/de"],
    },
  },

  compatibilityDate: "2025-07-07",
});
