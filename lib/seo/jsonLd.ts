export const SITE_URL = "https://www.provpn.bet"

export type FaqItem = {
  question: string
  answer: string
}

export type BreadcrumbItem = {
  name: string
  path: string
}

export type ReviewItem = {
  author: string
  body: string
  rating: number
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "PROVPN",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://t.me/provpnsup_bot",
      availableLanguage: ["Russian", "English"],
    },
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "PROVPN",
    url: SITE_URL,
    inLanguage: "ru-RU",
    publisher: { "@id": `${SITE_URL}/#organization` },
  }
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITE_URL}/#software`,
    name: "PROVPN",
    applicationCategory: "SecurityApplication",
    operatingSystem: "iOS, Android, Windows, macOS",
    description:
      "VPN-сервис с подключением через Happ, INCY или Karing и режимами GLOBAL и STEADY.",
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      price: "490",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#get-vpn`,
      description: "Единоразовая оплата за бессрочный доступ",
    },
  }
}

export function productJsonLd(reviews: ReviewItem[] = []) {
  const ratingValue = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/#product`,
    name: "PROVPN — доступ навсегда",
    description:
      "PROVPN с единоразовой оплатой 490₽, режимами GLOBAL и STEADY и подключением через совместимые приложения.",
    brand: { "@type": "Brand", name: "PROVPN" },
    image: `${SITE_URL}/assets/welcome.jpg`,
    offers: {
      "@type": "Offer",
      price: "490",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/#get-vpn`,
      description: "Единоразовая оплата",
    },
    ...(ratingValue
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: ratingValue.toFixed(1),
            bestRating: "5",
            worstRating: "1",
            ratingCount: reviews.length,
            reviewCount: reviews.length,
          },
          review: reviews.map((review) => ({
            "@type": "Review",
            author: { "@type": "Person", name: review.author },
            reviewBody: review.body,
            reviewRating: {
              "@type": "Rating",
              ratingValue: review.rating,
              bestRating: 5,
              worstRating: 1,
            },
          })),
        }
      : {}),
  }
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
