"use client"

import { Suspense, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"

function isAllowedTarget(target: string) {
  return target.startsWith("happ://add/") || target.startsWith("incy://add/")
}

function RedirectAppContent() {
  const searchParams = useSearchParams()
  const rawTarget = searchParams.get("target") || ""

  const target = useMemo(() => {
    try {
      return decodeURIComponent(rawTarget)
    } catch {
      return rawTarget
    }
  }, [rawTarget])

  const isValid = Boolean(target && isAllowedTarget(target))

  useEffect(() => {
    if (!isValid) return

    const timer = setTimeout(() => {
      window.location.href = target
    }, 500)

    return () => clearTimeout(timer)
  }, [isValid, target])

  function openApp() {
    if (!isValid) return
    window.location.href = target
  }

  return (
    <main className="min-h-screen bg-[#fff5f5] px-5 py-10 text-[#171717]">
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center text-center">
        {isValid ? (
          <>
            <h1 className="text-2xl font-bold">Открываем приложение...</h1>

            <p className="mt-4 text-sm text-black/60">Пожалуйста, подождите</p>

            <div className="mt-8 rounded-xl border border-yellow-400 bg-yellow-100 px-5 py-4 text-sm text-yellow-900">
              ⚠️ Если ничего не происходит, нажмите кнопку ниже.
            </div>

            <div className="mt-8 h-px w-full bg-black/10" />

            <p className="mt-8 text-sm text-black/60">
              Если приложение не открылось автоматически:
            </p>

            <button
              onClick={openApp}
              className="mt-5 rounded-xl bg-[#2b2b2b] px-7 py-4 font-bold text-white shadow-lg"
            >
              Нажмите сюда для открытия
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Некорректная ссылка</h1>
            <p className="mt-4 text-sm text-black/60">
              Вернитесь в бот и попробуйте открыть настройку ещё раз.
            </p>
          </>
        )}
      </div>
    </main>
  )
}

export default function RedirectAppPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#fff5f5] px-5 py-10 text-[#171717]">
          <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-bold">Открываем приложение...</h1>
            <p className="mt-4 text-sm text-black/60">Пожалуйста, подождите</p>
          </div>
        </main>
      }
    >
      <RedirectAppContent />
    </Suspense>
  )
}
