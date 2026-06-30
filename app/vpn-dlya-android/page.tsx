import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo/SeoLandingPage"
import { createSeoMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = createSeoMetadata({
  title: "VPN для Android — Happ, APK и INCY",
  description: "Инструкция по подключению PROVPN на Android через Happ, Happ APK или INCY. Добавление GLOBAL и STEADY подписок.",
  path: "/vpn-dlya-android",
  keywords: ["VPN для Android", "Happ APK", "INCY VPN", "VPN подписка Android"],
})

const faqs = [
  { question: "Где скачать Happ для Android?", answer: "Happ доступен в Google Play. Если магазин недоступен на устройстве, на главной странице PROVPN есть ссылка на официальный APK-релиз." },
  { question: "Можно ли подключиться через INCY?", answer: "Да. После оплаты рядом с персональными ссылками доступны кнопки для добавления подписки в INCY." },
  { question: "Какой режим выбрать?", answer: "Начните с GLOBAL. Если сеть работает нестабильно, добавьте и используйте STEADY." },
]

export default function VpnForAndroidPage() {
  return (
    <SeoLandingPage
      path="/vpn-dlya-android"
      breadcrumbLabel="VPN для Android"
      eyebrow="Android"
      title="VPN для Android через Happ или INCY"
      intro="PROVPN подключается на Android через совместимое приложение. Можно установить Happ из Google Play, скачать Happ APK или использовать INCY."
      sections={[
        {
          title: "Как установить приложение",
          subsections: [
            { title: "Google Play", text: "Установите Happ или INCY из магазина приложений и откройте его после загрузки." },
            { title: "Happ APK", text: "Если Google Play отсутствует, используйте ссылку на официальный APK, размещённую на главной странице PROVPN." },
          ],
        },
        {
          title: "Как добавить подписку",
          steps: [
            "Оплатите доступ на главной странице.",
            "Выберите кнопку Happ или INCY рядом со ссылкой GLOBAL.",
            "Подтвердите импорт подписки в приложении.",
            "Повторите импорт для STEADY.",
            "Включите выбранный режим в приложении.",
          ],
        },
        {
          title: "GLOBAL и STEADY на Android",
          paragraphs: ["Сохраните оба режима в приложении. GLOBAL подходит как основной вариант, а STEADY полезен при нестабильной работе мобильной сети или Wi‑Fi."],
        },
      ]}
      faqs={faqs}
      relatedLinks={[
        { href: "/happ-vpn", label: "Настройка Happ" },
        { href: "/kak-podklyuchit-vpn", label: "Как подключить VPN" },
        { href: "/vpn-dlya-iphone", label: "VPN для iPhone" },
        { href: "/vpn", label: "О PROVPN" },
      ]}
    />
  )
}
