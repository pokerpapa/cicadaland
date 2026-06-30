import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/sub/", "/connect", "/redirect_app"],
    },
    sitemap: "https://www.provpn.bet/sitemap.xml",
  }
}
