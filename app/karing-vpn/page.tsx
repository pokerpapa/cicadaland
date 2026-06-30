import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo/SeoLandingPage"
import { createSeoMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = createSeoMetadata({
  title: "Karing VPN — подключение PROVPN через Karing",
  description: "Как использовать Karing с PROVPN: добавить GLOBAL и STEADY, обновить подписку и выбрать стабильный режим подключения.",
  path: "/karing-vpn",
  keywords: ["Karing VPN", "Karing iPhone", "добавить подписку Karing", "PROVPN Karing"],
})

const faqs = [
  { question: "Когда стоит выбрать Karing?", answer: "Karing подойдёт как продвинутый дополнительный вариант, если нужен другой клиент или подключение в основном приложении нестабильно." },
  { question: "Какие режимы добавлять в Karing?", answer: "Добавьте доступные на сайте GLOBAL и STEADY. Другие резервные режимы эта инструкция не предполагает." },
  { question: "Как обновить подписку?", answer: "Откройте меню добавленного профиля в Karing и запустите обновление, затем повторно выберите нужный режим." },
]

export default function KaringVpnPage() {
  return (
    <SeoLandingPage
      path="/karing-vpn"
      breadcrumbLabel="Karing VPN"
      eyebrow="Продвинутый клиент"
      title="Подключение PROVPN через Karing"
      intro="Karing — дополнительный вариант для пользователей, которым нужен более продвинутый клиент. В него можно добавить доступные подписки GLOBAL и STEADY."
      sections={[
        {
          title: "Как добавить PROVPN в Karing",
          steps: [
            "Установите Karing из официального магазина приложений.",
            "После оплаты PROVPN скопируйте ссылку GLOBAL на сайте.",
            "Добавьте ссылку как новую подписку в Karing.",
            "Повторите действия для STEADY.",
            "Обновите подписки и выберите подходящий режим.",
          ],
        },
        {
          title: "GLOBAL и STEADY в Karing",
          subsections: [
            { title: "GLOBAL", text: "Основной режим для повседневного подключения." },
            { title: "STEADY", text: "Альтернативный режим для нестабильной мобильной сети или Wi‑Fi." },
          ],
          paragraphs: ["На сайте отображаются только фактически доступные пользователю режимы. Эта страница не предполагает наличие дополнительных резервных конфигураций."],
        },
        {
          title: "Что проверить при ошибке",
          bullets: [
            "Подписка добавлена полностью, без пробелов в ссылке.",
            "Karing получил разрешение на создание VPN-профиля.",
            "Подписка обновлена после добавления.",
            "Для проверки попробованы оба доступных режима.",
          ],
        },
      ]}
      faqs={faqs}
      relatedLinks={[
        { href: "/vpn-dlya-iphone", label: "VPN для iPhone" },
        { href: "/happ-vpn", label: "Простой вариант — Happ" },
        { href: "/kak-podklyuchit-vpn", label: "Общая инструкция" },
        { href: "/vpn", label: "О PROVPN" },
      ]}
    />
  )
}
