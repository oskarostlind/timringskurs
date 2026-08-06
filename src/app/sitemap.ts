import type { MetadataRoute } from "next";
import { kurser } from "@/data/kurser";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const nu = new Date();
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
