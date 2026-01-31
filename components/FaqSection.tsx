"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslation } from "@/lib/i18n"

export function FaqSection() {
  const { t } = useTranslation()

  const faqs = t("faq.items")

  return (
    <section id="faq" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B1026]/50" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-sm font-medium mb-6">
            {t("faq.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-6 text-balance">
            {t("faq.title1")}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#A78BFA] bg-clip-text text-transparent">
              {t("faq.title2")}
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq: any, index: number) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-[#0B1026] border border-[#1F2A44] rounded-2xl px-6 data-[state=open]:border-[#3B82F6]/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-[#E5E7EB] hover:text-[#3B82F6] py-5 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#94A3B8] pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
