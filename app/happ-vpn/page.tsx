import type { Metadata } from "next"
import { SeoLandingPage } from "@/components/seo/SeoLandingPage"
import { createSeoMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = createSeoMetadata({
  title: "Happ VPN — настройка PROVPN на iPhone и Android",
  description: "Как подключить PROVPN через Happ на iPhone и Android: установка приложения, добавление и обновление GLOBAL и STEADY подписок.",
  path: "/happ-vpn",
  keywords: ["Happ VPN", "Happ iPhone", "Happ Android", "добавить подписку Happ"],
})

const faqs = [
  { question: "На каких устройствах работает Happ?", answer: "На главной странице PROVPN доступны ссылки Happ для iPhone и Android, а также официальный APK для Android без Google Play." },
  { question: "Как добавить вторую подписку?", answer: "После импорта GLOBAL вернитесь в web-кабинет и нажмите Happ рядом со STEADY." },
  { question: "Что делать при ошибке Happ?", answer: "Обновите подписку, переключите режим и перезапустите приложение. Если ошибка повторяется, передайте её текст поддержке." },
]

export default function HappVpnPage() {
  return (
    <SeoLandingPage
      path="/happ-vpn"
      breadcrumbLabel="Happ VPN"
      eyebrow="Простое подключение"
      title="PROVPN через Happ на iPhone и Android"
      intro="Happ — простой основной вариант для подключения PROVPN. Установите приложение, добавьте GLOBAL и STEADY и включите нужный режим."
      sections={[
        {
          title: "Как добавить подписку в Happ",
          steps: [
            "Установите Happ на iPhone или Android.",
            "Оплатите PROVPN и дождитесь появления персональных ссылок.",
            "Нажмите Happ рядом с GLOBAL и подтвердите открытие приложения.",
            "Вернитесь на сайт и так же добавьте STEADY.",
            "В Happ выберите импортированный режим и включите VPN.",
          ],
        },
        {
          title: "Как обновить подписку",
          paragraphs: ["Откройте список подписок в Happ, выберите добавленную подписку PROVPN и запустите обновление. Название команды может немного отличаться между версиями iOS и Android."],
          bullets: [
            "Обновляйте подписку, если подключение перестало работать как раньше.",
            "После обновления снова выберите нужный режим.",
            "Не публикуйте и не передавайте персональную subscription-ссылку.",
          ],
        },
        {
          title: "Что делать при ошибке",
          subsections: [
            { title: "Нет подключения", text: "Переключитесь между GLOBAL и STEADY и перезапустите VPN." },
            { title: "Ссылка не добавляется", text: "Скопируйте её заново из web-кабинета или воспользуйтесь кнопкой Happ рядом с режимом." },
            { title: "Профиль устарел", text: "Запустите обновление подписки внутри Happ." },
            { title: "Ошибка повторяется", text: "Напишите в поддержку и приложите текст или скриншот ошибки без персональной ссылки." },
          ],
        },
      ]}
      faqs={faqs}
      relatedLinks={[
        { href: "/vpn-dlya-iphone", label: "Happ на iPhone" },
        { href: "/vpn-dlya-android", label: "Happ на Android" },
        { href: "/karing-vpn", label: "Альтернатива — Karing" },
        { href: "/kak-podklyuchit-vpn", label: "Полная инструкция" },
      ]}
    />
  )
}
