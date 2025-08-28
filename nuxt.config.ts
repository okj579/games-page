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

  routeRules: {
    "/api/**": { prerender: true },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/de"],
    },
  },

  vite: {
    define: {
      // Disable @nuxt/content client-side database
      "window.WebAssembly": false,
    },
  },

  compatibilityDate: "2025-07-07",
});
