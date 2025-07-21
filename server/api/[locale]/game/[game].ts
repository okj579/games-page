import { withLeadingSlash } from "ufo";
import { join } from "pathe";
import { resolveFallbacks } from "~~/shared/resolveFallbacks";
import { serverQueryContent } from "#content/server";
import { ParsedContent } from "@nuxt/content";
import { Game } from "~~/types/game";
import { useI18nConfig } from "~~/server/composables/useI18nConfig";

const isDefined = <T>(val: T): val is Exclude<T, undefined | null> =>
  typeof val !== "undefined" && val !== null;

export default defineEventHandler(async (event) => {
  const { locale, game: slug } = getRouterParams(event);
  const { fallbackLocale } = await useI18nConfig();

  const locales = resolveFallbacks(fallbackLocale, locale);

  const _path = withLeadingSlash(join("_games", slug));

  const localeData = (
    await Promise.all(
      locales.map((_locale) =>
        serverQueryContent<Game & ParsedContent>(event)
          .where({ _path, _locale })
          .findOne()
          .catch(() => undefined),
      ),
    )
  ).filter(isDefined);

  if (!localeData.length) {
    throw createError({
      statusCode: 404,
      message: `Game '${slug}' not found`,
    });
  }

  const game = localeData.reduce((a, b) => ({ ...b, ...a }));
  return omitInternal(game);
});

type ExcludeExtends<A, B> = A extends B ? never : A;
function omitInternal<T extends Record<string, any>>(
  data: T,
): Pick<T, ExcludeExtends<keyof T, "_">> {
  return Object.fromEntries(
    Object.entries(data).filter(([k]) => !k.startsWith("_")),
  ) as any;
}
