import { defineTransformer, type TransformedContent } from "@nuxt/content";

export default defineTransformer({
  name: "games",
  extensions: ["md"],
  transform(content, options) {
    const [collection, locale, ...path] = content.id.split("/");
    content.locale = locale;

    if (collection === "games") {
      const [slug, _ext] = path[path.length - 1]!.split(".", 2);
      content.slug = slug;
    }

    return content;
  },
});
