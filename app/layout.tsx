import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/i18n"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

const title = "PROVPN — стабильный VPN для iPhone, Android и компьютера"
const description =
  "PROVPN — VPN-сервис с единоразовой оплатой 490₽ и доступом навсегда. Подключение через Happ, INCY, Karing, GLOBAL и STEADY режимы."

export const metadata: Metadata = {
  metadataBase: new URL("https://www.provpn.bet"),
  title: {
    default: title,
    template: "%s | PROVPN",
  },
  description,
  keywords: [
    "PROVPN",
    "VPN",
    "VPN для iPhone",
    "VPN для Android",
    "VPN для компьютера",
    "Happ VPN",
    "Karing VPN",
    "GLOBAL MODE",
    "STEADY MODE",
  ],
  authors: [{ name: "PROVPN", url: "https://www.provpn.bet" }],
  creator: "PROVPN",
  publisher: "PROVPN",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "PROVPN",
    title,
    description,
    images: [
      {
        url: "/assets/welcome.jpg",
        width: 1024,
        height: 1024,
        alt: "PROVPN — VPN для iPhone, Android и компьютера",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/welcome.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#070B1A',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-background text-foreground`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
