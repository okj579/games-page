import { resolveFallbacks } from "~~/shared/resolveFallbacks";
import { useI18nConfig } from "~~/server/composables/useI18nConfig";
import { createDefu } from "defu";

const merge = createDefu((obj, key, value) => {
  if (key === "body") {
    obj[key] = value;
    return true;
  }
});

export default defineEventHandler(async (event) => {
  const { game: slug, locale } = getRouterParams(event);

  const { fallbackLocale } = await useI18nConfig();
  const locales = resolveFallbacks(fallbackLocale, locale);

  const data = await queryCollection(event, "games")
    .where("slug", "=", slug)
    .where("locale", "IN", locales)
    .all();

  if (!data.length) {
    throw createError({
      statusCode: 404,
      message: `Game '${slug}' not found`,
    });
  }

  data.sort((a, b) => locales.indexOf(a.locale) - locales.indexOf(b.locale));
  return data.reduce(merge);
});
