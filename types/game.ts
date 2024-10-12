import type { ISize } from "image-size/dist/types/interface";

export interface Game {
  slug: string;
  title: string;
  thumbnailImage?: string;
  coverImage?: string;
  coverImageDimensions?: ISize;
  url?: string;
  githubUrl: string;
  js13k?: { year: number; url: string };
}
