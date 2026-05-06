import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL || process.env.URL;

  const generateRoute = (route: string) => {
    return `${baseUrl}/${route}`;
  };

  const routes: MetadataRoute.Sitemap = [
    {
      url: generateRoute(""),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  return [...routes];
}
