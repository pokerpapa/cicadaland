"use client"

import { Star, Quote } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function ReviewsSection() {
  const { t } = useTranslation()

  const reviews = t("reviews.items")

  return (
    <section id="reviews" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-[#A78BFA]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-sm font-medium mb-6">
            {t("reviews.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-6 text-balance">
            {t("reviews.title1")}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#A78BFA] bg-clip-text text-transparent">
              {t("reviews.title2")}
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            {t("reviews.subtitle")}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((review: any, index: number) => (
            <div
              key={index}
              className="group relative bg-[#0B1026] border border-[#1F2A44] rounded-2xl p-6 lg:p-8 hover:border-[#3B82F6]/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#1F2A44] group-hover:text-[#3B82F6]/30 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#E5E7EB] leading-relaxed mb-6">{review.text}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#A78BFA] flex items-center justify-center text-white font-semibold text-sm">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#E5E7EB]">{review.name}</p>
                  <p className="text-xs text-[#94A3B8]">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
