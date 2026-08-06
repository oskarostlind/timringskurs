import type { MetadataRoute } from "next";
import { hamtaKurser, hamtaSite } from "@/lib/innehall";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const nu = new Date();
  const [kurser, site] = await Promise.all([hamtaKurser(), hamtaSite()]);
  return [
    { url: site.url, lastModified: nu, priority: 1 },
    { url: `${site.url}/om`, lastModified: nu, priority: 0.6 },
    { url: `${site.url}/kontakt`, lastModified: nu, priority: 0.8 },
    ...kurser.map((k) => ({
      url: `${site.url}/kurser/${k.slug}`,
      lastModified: nu,
      priority: 0.9,
    })),
  ];
}
