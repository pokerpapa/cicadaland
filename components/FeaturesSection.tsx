"use client"

import { Zap, RefreshCw, Copy, Monitor, ShieldCheck, Trash2 } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function FeaturesSection() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Zap,
      title: t("features.items.0.title"),
      description: t("features.items.0.description"),
    },
    {
      icon: RefreshCw,
      title: t("features.items.1.title"),
      description: t("features.items.1.description"),
    },
    {
      icon: Copy,
      title: t("features.items.2.title"),
      description: t("features.items.2.description"),
    },
    {
      icon: Monitor,
      title: t("features.items.3.title"),
      description: t("features.items.3.description"),
    },
    {
      icon: ShieldCheck,
      title: t("features.items.4.title"),
      description: t("features.items.4.description"),
    },
    {
      icon: Trash2,
      title: t("features.items.5.title"),
      description: t("features.items.5.description"),
    },
  ]

  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B1026]/50" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#A78BFA]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-[#A78BFA] text-sm font-medium mb-6">
            {t("features.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-6 text-balance">
            {t("features.title1")}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#A78BFA] bg-clip-text text-transparent">
              {t("features.title2")}
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-[#0B1026] border border-[#1F2A44] rounded-2xl p-6 lg:p-8 hover:border-[#3B82F6]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#3B82F6]/5"
            >
              {/* Gradient Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3B82F6]/5 to-[#A78BFA]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6]/10 to-[#A78BFA]/10 border border-[#1F2A44] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#3B82F6]/30 transition-all">
                  <feature.icon className="w-5 h-5 text-[#3B82F6]" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-[#E5E7EB] mb-2">{feature.title}</h3>
                <p className="text-[#94A3B8] leading-relaxed text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
