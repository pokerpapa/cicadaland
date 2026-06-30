import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo/SeoLandingPage"
import { createSeoMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = createSeoMetadata({
  title: "VPN навсегда за 490₽ — GLOBAL и STEADY",
  description:
    "PROVPN с единоразовой оплатой 490₽: доступ навсегда, режимы GLOBAL и STEADY, подключение через Happ, INCY или Karing.",
  path: "/vpn",
  keywords: ["VPN навсегда", "VPN за 490 рублей", "GLOBAL MODE", "STEADY MODE"],
})

const faqs = [
  { question: "Сколько стоит PROVPN?", answer: "Доступ стоит 490₽. Это единоразовая оплата, а не ежемесячная подписка." },
  { question: "Какие приложения подходят?", answer: "Для подключения можно использовать Happ, INCY или Karing в зависимости от устройства и предпочтений." },
  { question: "Чем отличаются GLOBAL и STEADY?", answer: "GLOBAL — основной универсальный режим. STEADY стоит попробовать, если текущая сеть работает нестабильно." },
]

export default function VpnPage() {
  return (
    <SeoLandingPage
      path="/vpn"
      breadcrumbLabel="VPN"
      eyebrow="PROVPN"
      title="VPN навсегда с единоразовой оплатой"
      intro="PROVPN стоит 490₽ один раз. После оплаты вы получаете персональные ссылки GLOBAL и STEADY для подключения на телефоне или компьютере."
      sections={[
        {
          title: "Что входит в доступ PROVPN",
          bullets: [
            "Единоразовая оплата 490₽ без ежемесячного списания.",
            "Персональные ссылки GLOBAL и STEADY.",
            "Подключение через Happ, INCY или Karing.",
            "Помощь поддержки при оплате и настройке.",
          ],
        },
        {
          title: "GLOBAL и STEADY",
          paragraphs: ["В кабинете после оплаты отображаются два режима. Их можно добавить в совместимое приложение отдельно и переключаться между ними по ситуации."],
          subsections: [
            { title: "GLOBAL MODE", text: "Основной универсальный режим для повседневного использования." },
            { title: "STEADY MODE", text: "Режим для случаев, когда соединение в текущей сети становится нестабильным." },
          ],
        },
        {
          title: "Как начать",
          steps: [
            "Введите email в форме на главной странице.",
            "Перейдите на защищённую страницу оплаты Platega и оплатите 490₽.",
            "Вернитесь на сайт и получите ссылки GLOBAL и STEADY.",
            "Добавьте ссылки в выбранное приложение.",
          ],
        },
      ]}
      faqs={faqs}
      relatedLinks={[
        { href: "/kak-podklyuchit-vpn", label: "Как подключить VPN" },
        { href: "/vpn-dlya-iphone", label: "VPN для iPhone" },
        { href: "/vpn-dlya-android", label: "VPN для Android" },
        { href: "/happ-vpn", label: "Настройка Happ" },
      ]}
    />
  )
}
