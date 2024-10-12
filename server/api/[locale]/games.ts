import type { ParsedContent } from "@nuxt/content";
import type { Game } from "~/types/game";
import { resolveFallbacks } from "~/shared/resolveFallbacks";
import { serverQueryContent } from "#content/server";
import { objectPick } from "@vueuse/shared";

const pickKeys = ["slug", "title", "thumbnailImage"] as const;

export default defineEventHandler(async (event) => {
  const { locale } = getRouterParams(event);
  const { fallbackLocale } = event.context.i18n;

  const queries = resolveFallbacks(fallbackLocale, locale).map((locale) =>
    serverQueryContent<ParsedContent & Game>(event, "_games")
      .locale(locale)
      .find()
      .then(
        (data) =>
          new Map(
            data.map((game) => [game._path!, objectPick(game, pickKeys)]),
          ),
      ),
  );
  const data = await Promise.all(queries);
  const allKeys = [...new Set(data.flatMap((pages) => [...pages.keys()]))];
  return allKeys.map((path) =>
    data.reduce((page, data) => ({ ...data.get(path), ...page }), <Game>{}),
  );
});
