import createImageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId, sanityAktiverat } from "../env";

let builder: ReturnType<typeof createImageUrlBuilder> | null = null;

/** Bygger en optimerad bild-URL. Bredd i pixlar, alltid modernt format. */
export function bildUrl(source: SanityImageSource, bredd = 1600): string | undefined {
  if (!sanityAktiverat) return undefined;
  if (!builder) builder = createImageUrlBuilder({ projectId, dataset });
  return builder.image(source).width(bredd).auto("format").fit("max").url();
}
