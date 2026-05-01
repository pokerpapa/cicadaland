"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void
        expand: () => void
        close: () => void
      }
    }
  }
}

export default function ConnectPage() {
  useEffect(() => {
    window.Telegram?.WebApp?.ready()
    window.Telegram?.WebApp?.expand()
  }, [])

  return (
    <main className="min-h-screen bg-[#0b111c] text-white px-4 py-5">
      <div className="mx-auto max-w-md space-y-4">
        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-white/50">Cicada PROVPN</p>
              <h1 className="mt-1 text-2xl font-bold">Подключение</h1>
            </div>

            <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              Mini App ✅
            </div>
          </div>

          <p className="mt-4 text-sm leading-6 text-white/70">
            Личный кабинет подключения успешно открыт внутри Telegram.
            Следующим шагом сюда будут подключены ваши реальные данные:
            статус подписки, trial-таймер и персональные ссылки.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Подписка</h2>
            <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-bold text-yellow-300">
              TEST MODE
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-black/25 p-4">
              <p className="text-xs text-white/45">Статус</p>
              <p className="mt-1 font-semibold">Тест активен</p>
            </div>

            <div className="rounded-2xl bg-black/25 p-4">
              <p className="text-xs text-white/45">Осталось</p>
              <p className="mt-1 font-semibold">72 часа</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-bold">Режимы подключения</h2>

          <div className="mt-4 space-y-3">
            <button className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-left font-bold shadow-lg">
              ⬛ GLOBAL MODE
              <span className="block pt-1 text-sm font-normal text-white/75">
                Максимальная скорость и обход блокировок
              </span>
            </button>

            <button className="w-full rounded-2xl bg-slate-700 px-4 py-4 text-left font-bold shadow-lg">
              ⬜ STEADY MODE
              <span className="block pt-1 text-sm font-normal text-white/75">
                Устойчивое соединение в сложных сетях
              </span>
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-lg font-bold">Установка</h2>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="rounded-2xl bg-black/25 p-4 text-left font-semibold">
              📱 iPhone
            </button>

            <button className="rounded-2xl bg-black/25 p-4 text-left font-semibold">
              🤖 Android
            </button>

            <button className="rounded-2xl bg-black/25 p-4 text-left font-semibold">
              💻 Windows
            </button>

            <button className="rounded-2xl bg-black/25 p-4 text-left font-semibold">
              📺 Android TV
            </button>
          </div>
        </section>

        <p className="pb-4 text-center text-xs text-white/35">
          PROVPN Cicada · secure subscription cabinet
        </p>
      </div>
    </main>
  )
}
