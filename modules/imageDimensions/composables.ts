import manifest from "#build/publicAssets.manifest.json";
import { withoutLeadingSlash } from "ufo";
import type { ISize } from "image-size/dist/types/interface";
import { objectPick } from "@vueuse/shared";

interface ImageMeta extends ISize {
  src: string;
  original?: Pick<ISize, "width" | "height">;
}
interface Constraints {
  width?: number;
  height?: number;
}

export function useImageDimensions(
  _src: MaybeRefOrGetter<string | undefined>,
  _constraints?: MaybeRefOrGetter<Constraints>,
) {
  return computed<ImageMeta>(() => {
    const src = toValue<string | undefined>(_src);
    const constraints = toValue<Constraints>(_constraints);
    const meta = manifest[withoutLeadingSlash(src)] as ISize | undefined;
    const original = meta && objectPick(meta, ["width", "height"]);

    if (meta && constraints) {
      if (meta.width > constraints.width) {
        meta.height *= constraints.width / meta.width;
        meta.width = constraints.width;
      }
      if (meta.height > constraints.height) {
        meta.width *= constraints.height / meta.height;
        meta.height = constraints.height;
      }
    }

    return { src, ...meta, original };
  });
}
