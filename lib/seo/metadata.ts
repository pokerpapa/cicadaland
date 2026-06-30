import type { Metadata } from "next"

const image = {
  url: "/assets/welcome.jpg",
  width: 1024,
  height: 1024,
  alt: "PROVPN — стабильный VPN для разных устройств",
}

export function createSeoMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      locale: "ru_RU",
      url: path,
      siteName: "PROVPN",
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  }
}
