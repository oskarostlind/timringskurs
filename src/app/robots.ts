import type { MetadataRoute } from "next";
import { hamtaSite } from "@/lib/innehall";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await hamtaSite();
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
