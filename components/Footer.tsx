"use client"

import { useTranslation } from "@/lib/i18n"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative py-12 border-t border-[#1F2A44] bg-[#070B1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#E5E7EB]">
              PRO<span className="text-[#3B82F6]">VPN</span>
            </span>
          </div>

          <p className="text-sm text-[#94A3B8]">
            © {new Date().getFullYear()} PROVPN. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-1 text-sm text-[#94A3B8]">
            <span>{t("footer.builtBy")}</span>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E5E7EB] hover:text-[#3B82F6] transition-colors"
            >
              v0
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
