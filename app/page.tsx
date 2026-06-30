import { Header } from "@/components/Header"
import { HeroVideoSection } from "@/components/HeroVideoSection"
import { SiteAccessSection } from "@/components/SiteAccessSection"
import { FaqSection } from "@/components/FaqSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { AppsSection } from "@/components/AppsSection"
import { KeysSection } from "@/components/KeysSection"
import { ReviewsSection } from "@/components/ReviewsSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { BackToTop } from "@/components/BackToTop"
import { FloatingBuyCta } from "@/components/FloatingBuyCta"
import { JsonLd } from "@/components/JsonLd"
import { SeoLinksSection } from "@/components/SeoLinksSection"
import {
  faqPageJsonLd,
  organizationJsonLd,
  productJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/seo/jsonLd"

const homeFaqs = [
  {
    question: "Что представляет собой сервис «PROVPN»?",
    answer:
      "«PROVPN» — это сервис для быстрого подключения к защищённым VPN-серверам. Получить доступ можно через сайт или через Telegram-бота. Сервис помогает повысить приватность, защитить соединение и безопаснее пользоваться интернетом на разных устройствах.",
  },
  {
    question: "Какие возможности и функционал у «PROVPN»?",
    answer:
      "PROVPN предоставляет доступ к защищённым VPN-подключениям в разных странах, помогает сохранять стабильное соединение в сложных сетевых условиях и защищает трафик при использовании публичных Wi-Fi сетей. Пользователь может выбрать подходящий режим подключения: GLOBAL или STEADY.",
  },
  {
    question: "С чего начать работу с «PROVPN»?",
    answer:
      "Вы можете начать прямо на сайте: введите email, оплатите доступ и получите персональные ссылки GLOBAL и STEADY. Также доступен Telegram-бот: откройте его, нажмите «Запустить» или отправьте команду /start.",
  },
  {
    question: "Как обратиться в поддержку?",
    answer:
      "Если нужна помощь с оплатой или подключением, напишите в Telegram-бот поддержки @provpnsup_bot.",
  },
]

const visibleReviews = [
  {
    author: "Алексей Д.",
    rating: 5,
    body: "Невероятно быстрая настройка. Подключился меньше чем за 2 минуты. Telegram бот — это очень удобно: не нужно ничего регистрировать.",
  },
  {
    author: "Мария К.",
    rating: 5,
    body: "Пользуюсь PROVPN уже 3 месяца. Серверы супер-стабильные. Здорово, что можно просто написать /keys в боте и получить настройки за секунду.",
  },
  {
    author: "Ярослав Т.",
    rating: 5,
    body: "Наконец-то VPN, который просто работает. Без перегруженных приложений. Скопировал, вставил, подключился. VLESS заметно быстрее моего старого VPN.",
  },
  {
    author: "Сара Л.",
    rating: 5,
    body: "Автоматическое удаление сообщений — это гениально. В телеграме порядок, но ключи всегда можно вернуть. Отлично для тех, кто ценит приватность.",
  },
  {
    author: "Михаил Б.",
    rating: 5,
    body: "Безупречно работает на всех устройствах. iOS, Android и ПК — везде одни и те же ключи. Поддержка тоже отвечает быстро.",
  },
  {
    author: "Эмма В.",
    rating: 5,
    body: "Сначала скептически относилась к VPN через Telegram, но это на самом деле блестяще. Просто, быстро и надежно. Именно то, что мне было нужно.",
  },
]

export default function Home() {
  return (
    <>
      <JsonLd id="organization-json-ld" data={organizationJsonLd()} />
      <JsonLd id="website-json-ld" data={websiteJsonLd()} />
      <JsonLd id="software-json-ld" data={softwareApplicationJsonLd()} />
      <JsonLd id="product-json-ld" data={productJsonLd(visibleReviews)} />
      <JsonLd id="faq-json-ld" data={faqPageJsonLd(homeFaqs)} />

      <main className="min-h-screen bg-[#070B1A]">
        <Header />
        <HeroVideoSection />
        <SiteAccessSection />
        <FeaturesSection />
        <AppsSection />
        <KeysSection />
        <ReviewsSection />
        <SeoLinksSection />
        <FaqSection />
        <ContactSection />
        <Footer />
        <BackToTop />
        <FloatingBuyCta />
      </main>
    </>
  )
}
