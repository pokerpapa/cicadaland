"use client"

import { CreditCard, MessageCircle } from "lucide-react"

export function FloatingBuyCta() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 sm:bottom-6">
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-[#1F2A44] bg-[#0B1026]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:max-w-xl">
        <a
          href="#get-vpn"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#22C55E] px-4 text-sm font-extrabold text-white shadow-lg shadow-[#22C55E]/20 transition hover:bg-[#16A34A] active:scale-[0.98]"
        >
          <CreditCard className="h-4 w-4" />
          Получить VPN за 490₽
        </a>

        <a
          href="https://t.me/provpnsup_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#1F2A44] bg-[#070B1A] text-[#3B82F6] transition hover:bg-[#1F2A44]"
          aria-label="Поддержка"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </div>
  )
}
