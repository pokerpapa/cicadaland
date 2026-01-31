"use client"

import { MessageCircle, Mail, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"

export function ContactSection() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#A78BFA]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1026] border border-[#1F2A44] rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Contact Info */}
            <div className="p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#3B82F6]/10 to-transparent">
              <span className="inline-block px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-sm font-medium mb-6">
                {t("contact.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#E5E7EB] mb-6">
                {t("contact.title")}
              </h2>
              <p className="text-[#94A3B8] text-lg mb-8">
                {t("contact.subtitle")}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1026] border border-[#1F2A44] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8] mb-0.5">{t("contact.telegram")}</p>
                    <a
                      href="#"
                      className="text-[#E5E7EB] hover:text-[#3B82F6] font-medium transition-colors"
                    >
                      @PROVPN_Support
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1026] border border-[#1F2A44] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#94A3B8] mb-0.5">{t("contact.email")}</p>
                    <a
                      href="mailto:support@provpn.example"
                      className="text-[#E5E7EB] hover:text-[#3B82F6] font-medium transition-colors"
                    >
                      support@provpn.example
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-center text-center bg-[#070B1A]/50">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#3B82F6] flex items-center justify-center mb-6 shadow-lg shadow-[#3B82F6]/20">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#E5E7EB] mb-4">
                {t("contact.ctaTitle")}
              </h3>
              <p className="text-[#94A3B8] mb-8 max-w-sm">
                {t("contact.ctaDesc")}
              </p>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-6 rounded-2xl text-lg font-semibold"
              >
                <a href="https://t.me/PROVPN_SecureBot" target="_blank" rel="noopener noreferrer">
                  {t("contact.ctaButton")}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
