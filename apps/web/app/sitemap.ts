import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tetramanor.com";

  // Define all static routes
  const staticRoutes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/investment",
    "/portfolio",
    "/portfolio/view-more",
    "/rental",
    "/services",
  ];

  // Map static routes to sitemap entries
  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
