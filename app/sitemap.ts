import type { MetadataRoute } from "next"

const routes = [
  "",
  "/vpn",
  "/vpn-dlya-iphone",
  "/vpn-dlya-android",
  "/vpn-dlya-telegram",
  "/kak-podklyuchit-vpn",
  "/karing-vpn",
  "/happ-vpn",
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `https://www.provpn.bet${route}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }))
}
