"use client"

import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

const seoLinks = [
  ["/vpn", "VPN"],
  ["/vpn-dlya-iphone", "VPN для iPhone"],
  ["/vpn-dlya-android", "VPN для Android"],
  ["/vpn-dlya-telegram", "VPN для Telegram"],
  ["/kak-podklyuchit-vpn", "Как подключить VPN"],
  ["/karing-vpn", "Karing VPN"],
  ["/happ-vpn", "Happ VPN"],
] as const

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="relative py-12 border-t border-[#1F2A44] bg-[#070B1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.5fr] md:items-start">
          <div>
            <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#E5E7EB]">
              PRO<span className="text-[#3B82F6]">VPN</span>
            </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#94A3B8]">
              VPN для iPhone, Android и компьютера с подключением через совместимые приложения.
            </p>
          </div>

          <nav aria-label="Навигация по материалам" className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
            {seoLinks.map(([href, label]) => (
              <Link key={href} href={href} className="text-[#94A3B8] transition hover:text-[#60A5FA]">
                {label}
              </Link>
            ))}
            <a
              href="https://t.me/provpnsup_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] transition hover:text-[#60A5FA]"
            >
              Поддержка
            </a>
          </nav>
        </div>

        <div className="mt-10 border-t border-[#1F2A44] pt-6">
          <p className="text-sm text-[#94A3B8]">© {new Date().getFullYear()} PROVPN. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  )
}
