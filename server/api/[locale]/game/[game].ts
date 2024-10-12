import { withLeadingSlash } from "ufo";
import { join } from "pathe";
import defu from "defu";
import { resolveFallbacks } from "~/shared/resolveFallbacks";
import { serverQueryContent } from "#content/server";
import { objectOmit } from "@vueuse/shared";
import { objectKeys } from "@antfu/utils";

export default defineEventHandler(async (event) => {
  const { locale, game: slug } = getRouterParams(event);
  const { fallbackLocale } = event.context.i18n;

  const locales = resolveFallbacks(fallbackLocale, locale);

  const _path = withLeadingSlash(join("_games", slug));

  const localeData = await Promise.all(
    locales.map((_locale) =>
      serverQueryContent(event)
        .where({ _path, _locale })
        .findOne()
        .catch(() => undefined),
    ),
  );

  if (!localeData.some(Boolean)) {
    throw createError({ statusCode: 404, message: `Game '${slug}' not found` });
  }

  return omitInternal(defu(...localeData));
});

type ExcludeExtends<A, B> = A extends B ? never : A;
function omitInternal<T>(
  data: T,
): Pick<T, ExcludeExtends<keyof T, `_${string}`>> {
  return objectOmit(
    data,
    objectKeys(data).filter((k) => k[0] === "_"),
  );
}
