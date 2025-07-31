import { resolveFallbacks } from "~~/shared/resolveFallbacks";
import { useI18nConfig } from "~~/server/composables/useI18nConfig";
import { defu } from "defu";

const group = <T>(
  list: T[],
  groupBy: (item: T) => any,
  sortBy: (item: T) => number,
) =>
  Map.groupBy(list, groupBy)
    .values()
    .map((group) => group.toSorted((a, b) => sortBy(a) - sortBy(b)))
    .toArray();

export default defineEventHandler(async (event) => {
  const { fallbackLocale } = await useI18nConfig();
  const locale = getRouterParam(event, "locale")!;

  const locales = resolveFallbacks(fallbackLocale, locale);

  const data = await queryCollection(event, "games")
    .where("locale", "IN", locales)
    .select("slug", "locale", "title", "thumbnailImage")
    .all();

  return group(
    data,
    (it) => it.slug,
    (it) => locales.indexOf(it.locale),
  ).map((group) => group.reduce(defu));
});
