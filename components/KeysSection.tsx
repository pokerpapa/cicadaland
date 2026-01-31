"use client"

import { Shield, Globe, Server, Network, Lock, Eye, AlertTriangle } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function KeysSection() {
  const { t } = useTranslation()

  const modernTechItems = t("technology.modernTech.items")
  const maxProtectionItems = t("technology.maxProtection.items")

  const modernTechIcons = [Shield, Globe, Server, Network]
  const maxProtectionIcons = [Lock, Eye, AlertTriangle]

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0B1026]/50" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#A78BFA]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-sm font-medium mb-6">
            {t("technology.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-6 text-balance">
            {t("technology.title1")}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#A78BFA] bg-clip-text text-transparent">
              {t("technology.title2")}
            </span>
          </h2>
          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            {t("technology.subtitle")}
          </p>
        </div>

        {/* Modern Technologies */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#E5E7EB] mb-8 text-center">
            {t("technology.modernTech.title")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modernTechItems.map((item: any, index: number) => {
              const Icon = modernTechIcons[index]
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B82F6] to-[#A78BFA] rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />

                  <div className="relative bg-[#0B1026] border border-[#1F2A44] rounded-2xl p-6 hover:border-[#3B82F6]/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#A78BFA]/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#E5E7EB] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Maximum Data Protection */}
        <div>
          <h3 className="text-2xl font-bold text-[#E5E7EB] mb-8 text-center">
            {t("technology.maxProtection.title")}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {maxProtectionItems.map((item: any, index: number) => {
              const Icon = maxProtectionIcons[index]
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#22C55E] to-[#3B82F6] rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300" />

                  <div className="relative bg-[#0B1026] border border-[#1F2A44] rounded-2xl p-8 hover:border-[#22C55E]/50 transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#22C55E]/20 to-[#3B82F6]/20 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#22C55E]" />
                    </div>
                    <h4 className="text-xl font-semibold text-[#E5E7EB] mb-3">
                      {item.title}
                    </h4>
                    <p className="text-[#94A3B8] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20">
            <Shield className="w-5 h-5 text-[#22C55E]" />
            <span className="text-sm font-medium text-[#22C55E]">
              Enterprise-grade security for everyone
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
