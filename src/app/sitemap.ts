import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/casos", "/landings", "/como-trabajo", "/open-source", "/cv", "/contacto"];
  return paths.map(path => ({ url: `${siteUrl}${path}` }));
}
