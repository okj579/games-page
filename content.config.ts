import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: {
        include: "**",
        exclude: ["*/_games"],
      },
      schema: z.object({
        locale: z.string(),
      }),
    }),

    games: defineCollection({
      type: "page",
      source: "*/_games/*",
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        locale: z.string(),
        thumbnailImage: z.string(),
        coverImage: z.string(),
        url: z.string(),
        githubUrl: z.string(),
        js13k: z.object({
          year: z.string(),
          url: z.string(),
        }),
        tags: z.array(z.string()),
      }),
    }),
  },
});
