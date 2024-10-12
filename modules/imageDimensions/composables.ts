import manifest from "#build/publicAssets.manifest.json";
import { withoutLeadingSlash } from "ufo";
import type { ISize } from "image-size/dist/types/interface";

export function useImageDimensions(url: MaybeRefOrGetter<string | undefined>) {
  return computed(() => {
    const src = toValue<string | undefined>(url);
    const meta = manifest[withoutLeadingSlash(src)] as ISize | undefined;
    return { src, ...meta };
  });
}
