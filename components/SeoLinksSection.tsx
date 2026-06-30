import Link from "next/link"

const links = [
  ["/vpn", "VPN PROVPN"],
  ["/vpn-dlya-iphone", "VPN для iPhone"],
  ["/vpn-dlya-android", "VPN для Android"],
  ["/vpn-dlya-telegram", "VPN для Telegram"],
  ["/kak-podklyuchit-vpn", "Как подключить VPN"],
  ["/karing-vpn", "Karing VPN"],
  ["/happ-vpn", "Happ VPN"],
] as const

export function SeoLinksSection() {
  return (
    <section className="relative border-y border-[#1F2A44] bg-[#0B1026]/50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold text-[#E5E7EB] sm:text-4xl">
            Подключение PROVPN на любом устройстве
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#94A3B8]">
            После единоразовой оплаты вы получите персональные ссылки GLOBAL и
            STEADY. Добавьте их в Happ, INCY или Karing и выберите подходящий режим
            для текущей сети. Подробные инструкции собраны ниже.
          </p>
        </div>

        <nav aria-label="Полезные материалы о PROVPN" className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded-2xl border border-[#1F2A44] bg-[#070B1A] px-5 py-4 font-semibold text-[#E5E7EB] transition hover:border-[#3B82F6]/50 hover:text-[#60A5FA]"
            >
              {label} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
