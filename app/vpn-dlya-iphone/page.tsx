import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo/SeoLandingPage"
import { createSeoMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = createSeoMetadata({
  title: "VPN для iPhone — подключение через Happ и Karing",
  description: "Как подключить PROVPN на iPhone через Happ или Karing: установка из App Store, добавление subscription-ссылок GLOBAL и STEADY.",
  path: "/vpn-dlya-iphone",
  keywords: ["VPN для iPhone", "VPN iOS", "Happ iPhone", "Karing iPhone"],
})

const faqs = [
  { question: "Какое приложение установить на iPhone?", answer: "Простой основной вариант — Happ из App Store. Karing можно использовать как дополнительный продвинутый вариант." },
  { question: "Как добавить subscription-ссылку?", answer: "После оплаты нажмите кнопку подходящего приложения рядом с GLOBAL, затем повторите действие для STEADY." },
  { question: "Что делать при нестабильном соединении?", answer: "Обновите подписку в приложении и попробуйте переключиться с GLOBAL на STEADY." },
]

export default function VpnForIphonePage() {
  return (
    <SeoLandingPage
      path="/vpn-dlya-iphone"
      breadcrumbLabel="VPN для iPhone"
      eyebrow="iOS"
      title="VPN для iPhone через Happ или Karing"
      intro="Установите совместимое приложение из App Store и добавьте персональные ссылки PROVPN. Оба режима — GLOBAL и STEADY — доступны после оплаты на сайте."
      sections={[
        {
          title: "Подключение PROVPN на iOS",
          steps: [
            "Купите PROVPN на сайте и дождитесь появления ссылок.",
            "Установите Happ или Karing из App Store.",
            "Нажмите Happ или скопируйте ссылку GLOBAL и импортируйте её в приложение.",
            "Таким же способом добавьте STEADY.",
            "Разрешите приложению добавить VPN-конфигурацию в iOS.",
          ],
        },
        {
          title: "Happ или Karing",
          subsections: [
            { title: "Happ", text: "Подходит для быстрого старта: добавьте подписку и включите соединение." },
            { title: "Karing", text: "Более продвинутый вариант с дополнительными настройками интерфейса и подключения." },
          ],
        },
        {
          title: "Если VPN на iPhone работает нестабильно",
          bullets: [
            "Проверьте, что подписка обновлена внутри приложения.",
            "Переключитесь с GLOBAL на STEADY.",
            "Перезапустите подключение после смены Wi‑Fi на мобильную сеть или обратно.",
            "Если ошибка сохраняется, напишите в поддержку и укажите используемое приложение.",
          ],
        },
      ]}
      faqs={faqs}
      relatedLinks={[
        { href: "/happ-vpn", label: "Инструкция по Happ" },
        { href: "/karing-vpn", label: "Инструкция по Karing" },
        { href: "/kak-podklyuchit-vpn", label: "Общая инструкция" },
        { href: "/vpn-dlya-android", label: "VPN для Android" },
      ]}
    />
  )
}
