import {
  addImports,
  addTemplate,
  defineNuxtModule,
  createResolver,
} from "@nuxt/kit";
import { imageSize as _imageSize } from "image-size";
import { readdir } from "node:fs/promises";
import { relative } from "pathe";
import { promisify } from "node:util";

const imageSize = promisify(_imageSize);

const { resolve } = createResolver(import.meta.url);

export default defineNuxtModule({
  name: "imageDimensions",
  parallel: true,
  async setup(resolvedOptions, nuxt) {
    const publicDir = resolve(nuxt.options.srcDir, nuxt.options.dir.public);

    addTemplate({
      filename: "publicAssets.manifest.json",
      getContents: async () =>
        readdir(publicDir, {
          recursive: true,
          withFileTypes: true,
        })
          .then((listing) => listing.filter((entry) => entry.isFile()))
          .then((files) =>
            Promise.all(
              files.map(async (file) => {
                const absPath = resolve(file.parentPath, file.name);
                const relPath = relative(publicDir, absPath);
                return [relPath, await imageSize(absPath)];
              }),
            ),
          )
          .then(Object.fromEntries)
          .then(JSON.stringify),
    });

    addImports({
      name: "useImageDimensions",
      from: resolve("./composables.ts"),
    });
  },
});
