import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo/SeoLandingPage"
import { createSeoMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = createSeoMetadata({
  title: "VPN для Telegram — покупка PROVPN через сайт",
  description: "PROVPN для стабильного доступа к Telegram. Купить VPN можно на сайте без Telegram, а после оплаты при желании подключить Telegram-бота.",
  path: "/vpn-dlya-telegram",
  keywords: ["VPN для Telegram", "купить VPN без Telegram", "PROVPN Telegram"],
})

const faqs = [
  { question: "Можно ли купить PROVPN без Telegram?", answer: "Да. Введите email и оплатите доступ прямо на сайте. Персональные ссылки появятся здесь же после проверки оплаты." },
  { question: "Обязательно ли использовать Telegram-бота?", answer: "Нет. Бот остаётся дополнительным способом управления и связи, но покупку и получение ссылок можно выполнить на сайте." },
  { question: "Что делать, если Telegram не открывается?", answer: "Сначала оформите доступ через сайт, добавьте ссылку в Happ, INCY или Karing и включите VPN. После подключения снова откройте Telegram." },
]

export default function VpnForTelegramPage() {
  return (
    <SeoLandingPage
      path="/vpn-dlya-telegram"
      breadcrumbLabel="VPN для Telegram"
      eyebrow="Telegram"
      title="VPN для Telegram можно купить прямо на сайте"
      intro="Если Telegram недоступен без VPN в вашей текущей сети, для покупки PROVPN он не нужен: весь путь от email до получения ссылок работает на сайте."
      sections={[
        {
          title: "Покупка без Telegram",
          steps: [
            "Откройте форму покупки на главной странице.",
            "Введите email для web-кабинета.",
            "Оплатите 490₽ на странице Platega.",
            "Вернитесь на сайт и проверьте оплату.",
            "Добавьте GLOBAL и STEADY в совместимое приложение.",
          ],
        },
        {
          title: "Telegram-бот после оплаты",
          paragraphs: ["После подключения VPN можно открыть Telegram-бот PROVPN. Он дополняет сайт, но не заменяет и не изменяет уже работающий web-кабинет или выданные ссылки."],
        },
        {
          title: "Как использовать VPN для Telegram",
          bullets: [
            "Включите GLOBAL как основной режим.",
            "Если соединение нестабильно, переключитесь на STEADY.",
            "Обновляйте подписку внутри приложения, чтобы получать актуальную конфигурацию.",
          ],
        },
      ]}
      faqs={faqs}
      relatedLinks={[
        { href: "/vpn", label: "О PROVPN" },
        { href: "/kak-podklyuchit-vpn", label: "Как подключить VPN" },
        { href: "/happ-vpn", label: "Happ VPN" },
        { href: "/vpn-dlya-android", label: "VPN для Android" },
      ]}
    />
  )
}
