import Link from "next/link"
import { Footer } from "@/components/Footer"
import { JsonLd } from "@/components/JsonLd"
import {
  breadcrumbListJsonLd,
  faqPageJsonLd,
  type FaqItem,
} from "@/lib/seo/jsonLd"

type Section = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  steps?: string[]
  subsections?: Array<{ title: string; text: string }>
}

type RelatedLink = {
  href: string
  label: string
}

type SeoLandingPageProps = {
  path: string
  breadcrumbLabel: string
  eyebrow: string
  title: string
  intro: string
  sections: Section[]
  faqs: FaqItem[]
  relatedLinks: RelatedLink[]
}

export function SeoLandingPage({
  path,
  breadcrumbLabel,
  eyebrow,
  title,
  intro,
  sections,
  faqs,
  relatedLinks,
}: SeoLandingPageProps) {
  return (
    <div className="min-h-screen bg-[#070B1A] text-[#E5E7EB]">
      <JsonLd
        id="breadcrumbs-json-ld"
        data={breadcrumbListJsonLd([
          { name: "Главная", path: "/" },
          { name: breadcrumbLabel, path },
        ])}
      />
      <JsonLd id="faq-json-ld" data={faqPageJsonLd(faqs)} />

      <header className="border-b border-[#1F2A44] bg-[#070B1A]/95">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold" aria-label="PROVPN — главная">
            PRO<span className="text-[#3B82F6]">VPN</span>
          </Link>
          <Link
            href="/#get-vpn"
            className="rounded-xl bg-[#22C55E] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#16A34A]"
          >
            Купить VPN за 490₽
          </Link>
        </div>
      </header>

      <main>
        <article>
          <div className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6 sm:pb-24 lg:px-8">
            <nav aria-label="Хлебные крошки" className="text-sm text-[#94A3B8]">
              <Link href="/" className="transition hover:text-[#60A5FA]">Главная</Link>
              <span className="mx-2" aria-hidden="true">/</span>
              <span aria-current="page">{breadcrumbLabel}</span>
            </nav>

            <header className="pb-12 pt-14 text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#60A5FA]">
                {eyebrow}
              </p>
              <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#94A3B8] sm:text-xl">
                {intro}
              </p>
              <Link
                href="/#get-vpn"
                className="mt-8 inline-flex rounded-2xl bg-[#3B82F6] px-7 py-4 font-bold text-white transition hover:bg-[#2563EB]"
              >
                Получить PROVPN
              </Link>
            </header>

            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.title} className="rounded-3xl border border-[#1F2A44] bg-[#0B1026] p-6 sm:p-8">
                  <h2 className="text-2xl font-bold sm:text-3xl">{section.title}</h2>

                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="mt-4 leading-7 text-[#B6C2D4]">{paragraph}</p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-5 space-y-3 text-[#B6C2D4]">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <span className="text-[#22C55E]" aria-hidden="true">✓</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.steps && (
                    <ol className="mt-6 space-y-4">
                      {section.steps.map((step, index) => (
                        <li key={step} className="flex gap-4 text-[#B6C2D4]">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3B82F6]/15 font-bold text-[#60A5FA]">
                            {index + 1}
                          </span>
                          <span className="pt-1">{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}

                  {section.subsections && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {section.subsections.map((item) => (
                        <div key={item.title} className="rounded-2xl bg-[#070B1A]/70 p-5">
                          <h3 className="font-bold text-[#E5E7EB]">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">Частые вопросы</h2>
              <div className="mt-6 space-y-4">
                {faqs.map((faq) => (
                  <article key={faq.question} className="rounded-2xl border border-[#1F2A44] bg-[#0B1026] p-6">
                    <h3 className="text-lg font-bold">{faq.question}</h3>
                    <p className="mt-3 leading-7 text-[#94A3B8]">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-3xl border border-[#3B82F6]/25 bg-[#3B82F6]/10 p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Полезные материалы</h2>
              <nav aria-label="Связанные страницы" className="mt-5 flex flex-wrap gap-3">
                {relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="rounded-xl border border-[#1F2A44] bg-[#070B1A] px-4 py-3 text-sm font-semibold transition hover:border-[#60A5FA] hover:text-[#60A5FA]">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </section>

            <section className="mt-12 rounded-3xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] p-8 text-center sm:p-10">
              <h2 className="text-3xl font-bold">PROVPN за 490₽ один раз</h2>
              <p className="mx-auto mt-4 max-w-2xl text-blue-50">
                Введите email на главной странице, оплатите доступ и получите ссылки GLOBAL и STEADY.
              </p>
              <Link href="/#get-vpn" className="mt-6 inline-flex rounded-2xl bg-white px-7 py-4 font-bold text-[#1D4ED8] transition hover:bg-blue-50">
                Перейти к покупке
              </Link>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
