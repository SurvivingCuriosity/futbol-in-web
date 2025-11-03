import { MetadataRoute } from "next";
import { ciudades } from "@/src/client/shared/assets/ciudades/ciudades";
import { marcas } from "../shared/db/marcas";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://futbolin.app";

  // Landings de ciudades
  const ciudadUrls = ciudades.map((c) => ({
    url: `${baseUrl}/ciudad/${encodeURIComponent(c.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Landings de marcas
  const marcaUrls = marcas.map((m) => ({
    url: `${baseUrl}/marcas/${encodeURIComponent(m.label)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Home
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
  ];

  return [...staticPages, ...ciudadUrls, ...marcaUrls];
}
