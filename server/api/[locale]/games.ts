import type { ParsedContent } from "@nuxt/content";
import type { Game } from "~/types/game";
import { resolveFallbacks } from "~/shared/resolveFallbacks";
import { serverQueryContent } from "#content/server";
import { objectPick } from "@vueuse/shared";
import { Simplify } from "type-fest";
import { useI18nConfig } from "~/server/composables/useI18nConfig";

const pickKeys = (["slug", "title", "thumbnailImage"] as const).slice();

type Keys = (typeof pickKeys)[number];
type GameListItem = Simplify<Pick<Game, Keys>>;

export default defineEventHandler(async (event) => {
  const { fallbackLocale } = await useI18nConfig();

  const { locale } = getRouterParams(event);

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
    data.reduce(
      (page, data) => ({ ...data.get(path), ...page }),
      <GameListItem>{},
    ),
  );
});
