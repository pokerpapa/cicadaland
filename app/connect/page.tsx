"use client"

import Script from "next/script"
import type { ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"

type WebAppLink = {
  mode: string
  title: string
  url: string
  is_active: boolean
}

type WebAppUser = {
  tg_user_id: number
  username?: string
  first_name?: string
  access_status: string
  trial_expires_at?: string | null
  trial_remaining_seconds?: number
}

type WebAppResponse = {
  ok: boolean
  can_use_vpn?: boolean
  paywall_reason?: string
  error?: string
  user?: WebAppUser
  links?: WebAppLink[]
}

type InstallScreen = "smartphone" | "windows" | "tv"
type SelectedApp = "happ" | "incy"
type SelectedMode = "global" | "steady"

type AppDownloadLink = {
  label: string
  subtitle?: string
  icon: string
  url: string
}

type BottomSheetProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string
        platform?: string
        ready: () => void
        expand: () => void
        close: () => void
        openLink?: (url: string) => void
      }
    }
  }
}

const HAPP_LINKS: AppDownloadLink[] = [
  {
    label: "(ru RU) App Store",
    icon: "🔵",
    url: "https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973",
  },
  {
    label: "(eu EN) App Store",
    icon: "🔵",
    url: "https://apps.apple.com/us/app/happ-proxy-utility/id6504287215",
  },
  {
    label: "Google Play",
    icon: "▶️",
    url: "https://play.google.com/store/apps/details?id=com.happproxy",
  },
  {
    label: "(APK) для Android",
    subtitle: "Если отсутствует Google Play, Huawei и др.",
    icon: "⬇️",
    url: "https://github.com/Happ-proxy/happ-android/releases/latest/download/Happ.apk",
  },
]

const INCY_LINKS: AppDownloadLink[] = [
  {
    label: "App Store",
    icon: "🔵",
    url: "https://apps.apple.com/us/app/incy/id6756943388",
  },
  {
    label: "Google Play",
    icon: "▶️",
    url: "https://play.google.com/store/apps/details?id=llc.itdev.incy",
  },
  {
    label: "(APK) для Android",
    subtitle: "Если отсутствует Google Play, Huawei и др.",
    icon: "⬇️",
    url: "https://github.com/INCY-DEV/incy-platforms/releases/latest/download/Incy.apk",
  },
]

function BottomSheet({ title, onClose, children }: BottomSheetProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-3 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <section className="relative z-10 w-full max-w-md overflow-hidden rounded-t-[32px] border border-white/10 bg-[#151922] shadow-2xl">
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/15" />

        <div className="flex items-center justify-between px-5 pb-3 pt-4">
          <h2 className="text-[17px] font-extrabold leading-tight text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 text-lg font-bold text-red-300 transition hover:bg-red-500/25"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className="max-h-[76vh] overflow-y-auto px-4 pb-6">
          {children}
        </div>
      </section>
    </div>
  )
}

function formatRemaining(seconds?: number) {
  if (!seconds || seconds <= 0) return "0 ч."

  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (days > 0) return `${days} д. ${hours} ч.`
  if (hours > 0) return `${hours} ч. ${minutes} мин.`
  return `${minutes} мин.`
}

function statusLabel(status?: string) {
  switch (status) {
    case "paid":
      return "PREMIUM"
    case "trial_active":
      return "ТЕСТОВЫЙ ПЕРИОД"
    case "trial_expired":
      return "ДОСТУП ЗАВЕРШЁН"
    case "banned":
      return "ЗАБЛОКИРОВАН"
    default:
      return "НЕТ ДОСТУПА"
  }
}

function statusClass(status?: string) {
  switch (status) {
    case "paid":
      return "bg-emerald-500/15 text-emerald-300"
    case "trial_active":
      return "bg-yellow-500/15 text-yellow-300"
    case "trial_expired":
      return "bg-red-500/15 text-red-300"
    case "banned":
      return "bg-red-700/30 text-red-200"
    default:
      return "bg-white/10 text-white/70"
  }
}

export default function ConnectPage() {
  const [data, setData] = useState<WebAppResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [copiedMode, setCopiedMode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [telegramScriptLoaded, setTelegramScriptLoaded] = useState(false)

  const [installScreen, setInstallScreen] = useState<InstallScreen | null>(null)
  const [selectedApp, setSelectedApp] = useState<SelectedApp>("happ")
  const [installStep, setInstallStep] = useState<1 | 2>(1)
  const [selectedMode, setSelectedMode] = useState<SelectedMode>("global")
  const [manualLinkVisible, setManualLinkVisible] = useState(false)
  const [openedFromFastSetup, setOpenedFromFastSetup] = useState(false)

  useEffect(() => {
    if (!telegramScriptLoaded) return

    const telegramObject = typeof window !== "undefined" ? window.Telegram : undefined
    const webApp = telegramObject?.WebApp

    webApp?.ready()
    webApp?.expand()

    const initData = webApp?.initData || ""

    if (!initData) {
      setLoading(false)
      setError(
        [
          "Откройте этот экран внутри Telegram через кнопку бота.",
          "",
          "Диагностика:",
          `Telegram object: ${telegramObject ? "yes" : "no"}`,
          `WebApp object: ${webApp ? "yes" : "no"}`,
          `initData length: ${initData.length}`,
          `platform: ${webApp?.platform || "unknown"}`,
        ].join("\n")
      )
      return
    }

    async function loadMe() {
      try {
        const response = await fetch("/api/webapp/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ initData }),
        })

        const json = (await response.json()) as WebAppResponse

        if (!response.ok || !json.ok) {
          setError(json.error || "Не удалось загрузить данные.")
          setData(json)
          return
        }

        setData(json)
      } catch {
        setError("Ошибка соединения с сервером.")
      } finally {
        setLoading(false)
      }
    }

    loadMe()
  }, [telegramScriptLoaded])

  const user = data?.user
  const links = data?.links || []

  const globalLink = useMemo(
    () => links.find((link) => link.mode === "black_vless"),
    [links]
  )

  const steadyLink = useMemo(
    () => links.find((link) => link.mode === "white_mobile"),
    [links]
  )

  const selectedInstallLink = selectedMode === "global" ? globalLink : steadyLink
  const appLinks = selectedApp === "happ" ? HAPP_LINKS : INCY_LINKS

  function showNotice(message: string) {
    setNotice(message)
    setTimeout(() => setNotice(null), 3500)
  }

  function openExternal(url: string) {
    if (typeof window === "undefined") return

    const webApp = window.Telegram?.WebApp

    if (webApp?.openLink) {
      webApp.openLink(url)
      return
    }

    window.open(url, "_blank", "noopener,noreferrer")
  }

  function openSmartphoneInstall() {
    setInstallScreen("smartphone")
    setSelectedApp("happ")
    setInstallStep(1)
    setSelectedMode("global")
    setManualLinkVisible(false)
    setNotice(null)
    setOpenedFromFastSetup(false)
  }

  function openAlreadyInstalled() {
    setInstallScreen("smartphone")
    setSelectedApp("happ")
    setInstallStep(2)
    setSelectedMode("global")
    setManualLinkVisible(false)
    setNotice(null)
    setOpenedFromFastSetup(true)
  }

  function openWindowsInstall() {
    setInstallScreen("windows")
    setInstallStep(1)
    setManualLinkVisible(false)
    setNotice(null)
    setOpenedFromFastSetup(false)
  }

  function openTvInstall() {
    setInstallScreen("tv")
    setInstallStep(1)
    setManualLinkVisible(false)
    setNotice(null)
    setOpenedFromFastSetup(false)
  }

  function closeInstall() {
    setInstallScreen(null)
    setInstallStep(1)
    setManualLinkVisible(false)
    setNotice(null)
    setOpenedFromFastSetup(false)
  }

  function backFromAutoSetup() {
    setManualLinkVisible(false)
    setNotice(null)

    if (openedFromFastSetup) {
      closeInstall()
      return
    }

    setInstallStep(1)
  }

  async function copyTextToClipboard(text: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        return true
      }

      const textarea = document.createElement("textarea")
      textarea.value = text
      textarea.setAttribute("readonly", "true")
      textarea.style.position = "fixed"
      textarea.style.opacity = "0"
      document.body.appendChild(textarea)
      textarea.select()
      const ok = document.execCommand("copy")
      document.body.removeChild(textarea)
      return ok
    } catch {
      return false
    }
  }

  async function copyLink(link?: WebAppLink) {
    if (!link?.url) return

    const ok = await copyTextToClipboard(link.url)

    if (ok) {
      setCopiedMode(link.mode)
      setManualLinkVisible(false)
      setTimeout(() => setCopiedMode(null), 1800)
      return
    }

    setManualLinkVisible(true)
    setError("Не удалось скопировать ссылку автоматически. Скопируйте её вручную.")
  }

  async function copyModeLink(mode: SelectedMode) {
    const link = mode === "global" ? globalLink : steadyLink
    const modeTitle = mode === "global" ? "GLOBAL MODE" : "STEADY MODE"

    if (!link?.url) return

    setSelectedMode(mode)

    const ok = await copyTextToClipboard(link.url)

    if (ok) {
      setCopiedMode(link.mode)
      setManualLinkVisible(false)
      showNotice(`${modeTitle}: ссылка скопирована ✅`)
      setTimeout(() => setCopiedMode(null), 1800)
      return
    }

    setManualLinkVisible(true)
    setError("Не удалось скопировать ссылку автоматически. Скопируйте её вручную.")
  }

  async function autoSetup(app: SelectedApp, mode: SelectedMode) {
    const link = mode === "global" ? globalLink : steadyLink

    if (!link?.url || !data?.can_use_vpn) return

    setSelectedMode(mode)

    const appName = app === "happ" ? "Happ" : "INCY"
    const appScheme = app === "happ" ? "happ" : "incy"

    const modeTitle = mode === "global" ? "GLOBAL MODE" : "STEADY MODE"
    const subscriptionUrl = link.url
    const deepLink = `${appScheme}://add/${subscriptionUrl}`

    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://cicadaland.vercel.app"

    const redirectUrl = `${origin}/redirect_app?target=${encodeURIComponent(deepLink)}`

    const ok = await copyTextToClipboard(subscriptionUrl)

    if (ok) {
      setCopiedMode(link.mode)
      setManualLinkVisible(false)
      showNotice(`Ссылка ${modeTitle} скопирована. Открываем ${appName}...`)
      setTimeout(() => setCopiedMode(null), 1800)
    } else {
      setManualLinkVisible(true)
      showNotice(`Открываем ${appName}. Если нужно — скопируйте ссылку вручную ниже.`)
    }

    const webApp = typeof window !== "undefined" ? window.Telegram?.WebApp : undefined

    if (webApp?.openLink) {
      webApp.openLink(redirectUrl)
      return
    }

    window.location.href = redirectUrl
  }

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="afterInteractive"
        onLoad={() => setTelegramScriptLoaded(true)}
        onReady={() => setTelegramScriptLoaded(true)}
      />

      <main className="min-h-screen bg-[#0b111c] px-4 py-5 text-[15px] text-white">
        <div className="mx-auto max-w-md space-y-4">
          <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-white/45">Cicada PROVPN</p>
                <h1 className="mt-1 text-2xl font-extrabold tracking-tight">Подключение</h1>
              </div>

              <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold text-emerald-300">
                Mini App ✅
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-white/65">
              Управляйте подключением, копируйте персональные ссылки и выбирайте
              режим VPN прямо внутри Telegram.
            </p>
          </section>

          {loading && (
            <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/70">Загружаем данные подписки...</p>
            </section>
          )}

          {!loading && error && !user && (
            <section className="rounded-[28px] border border-red-500/20 bg-red-500/[0.08] p-5">
              <h2 className="text-lg font-bold text-red-200">Не удалось открыть кабинет</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-red-100/80">
                {error}
              </p>
            </section>
          )}

          {!loading && user && (
            <>
              <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-extrabold">Подписка</h2>
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-extrabold ${statusClass(
                      user.access_status
                    )}`}
                  >
                    {statusLabel(user.access_status)}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-black/25 p-4">
                    <p className="text-[11px] uppercase tracking-wide text-white/35">Пользователь</p>
                    <p className="mt-1 truncate text-sm font-bold">
                      {user.username ? `@${user.username}` : user.first_name || user.tg_user_id}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/25 p-4">
                    <p className="text-[11px] uppercase tracking-wide text-white/35">Осталось</p>
                    <p className="mt-1 text-sm font-bold">
                      {user.access_status === "trial_active"
                        ? formatRemaining(user.trial_remaining_seconds)
                        : user.access_status === "paid"
                          ? "Навсегда"
                          : "0 ч."}
                    </p>
                  </div>
                </div>

                {!data?.can_use_vpn && (
                  <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/[0.08] p-4">
                    <p className="font-bold text-red-200">Доступ не активен</p>
                    <p className="mt-2 text-sm leading-6 text-red-100/75">
                      Тестовый период завершён или доступ заблокирован. Чтобы
                      продолжить пользоваться VPN, активируйте Premium в боте.
                    </p>
                  </div>
                )}
              </section>

              <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                <h2 className="text-lg font-extrabold">Режимы подключения</h2>

                <div className="mt-4 space-y-3">
                  <button
                    disabled={!globalLink || !data?.can_use_vpn}
                    onClick={() => copyLink(globalLink)}
                    className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-left font-extrabold shadow-lg transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
                  >
                    ⬛ GLOBAL MODE
                    <span className="block pt-1 text-xs font-normal text-white/75">
                      {copiedMode === "black_vless"
                        ? "Ссылка скопирована ✅"
                        : "Скопировать персональную ссылку"}
                    </span>
                  </button>

                  <button
                    disabled={!steadyLink || !data?.can_use_vpn}
                    onClick={() => copyLink(steadyLink)}
                    className="w-full rounded-2xl bg-slate-700 px-4 py-4 text-left font-extrabold shadow-lg transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
                  >
                    ⬜ STEADY MODE
                    <span className="block pt-1 text-xs font-normal text-white/75">
                      {copiedMode === "white_mobile"
                        ? "Ссылка скопирована ✅"
                        : "Скопировать персональную ссылку"}
                    </span>
                  </button>
                </div>

                {error && (
                  <p className="mt-4 whitespace-pre-line rounded-2xl bg-red-500/10 p-3 text-sm text-red-100/80">
                    {error}
                  </p>
                )}
              </section>

              <section className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                <h2 className="text-lg font-extrabold">Подключение VPN</h2>

                <div className="mt-4 overflow-hidden rounded-2xl bg-black/25">
                  <button
                    onClick={openSmartphoneInstall}
                    className="flex w-full items-center justify-between gap-3 border-b border-white/10 px-4 py-4 text-left text-sm font-extrabold transition hover:bg-white/5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">📱</span>
                      <span>Установка на Смартфон</span>
                    </span>
                    <span className="text-xl text-white/35">›</span>
                  </button>

                  <button
                    onClick={openWindowsInstall}
                    className="flex w-full items-center justify-between gap-3 border-b border-white/10 px-4 py-4 text-left text-sm font-extrabold transition hover:bg-white/5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">🪟</span>
                      <span>Установка на ПК</span>
                    </span>
                    <span className="text-xl text-white/35">›</span>
                  </button>

                  <button
                    onClick={openTvInstall}
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-extrabold transition hover:bg-white/5"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">📺</span>
                      <span>Подключить на Android TV</span>
                    </span>
                    <span className="text-xl text-white/35">›</span>
                  </button>
                </div>

                <button
                  onClick={openAlreadyInstalled}
                  className="mt-4 flex w-full items-center justify-between gap-3 rounded-2xl bg-black/30 px-4 py-4 text-left text-sm font-extrabold transition hover:bg-white/10"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">🅷</span>
                    <span className="text-lg">🟩</span>
                    <span>Уже есть Happ или INCY?</span>
                  </span>
                  <span className="text-xl text-white/35">›</span>
                </button>
              </section>
            </>
          )}

          <p className="pb-4 text-center text-xs text-white/35">
            PROVPN Cicada · secure subscription cabinet
          </p>
        </div>
      </main>

      {installScreen === "smartphone" && installStep === 1 && (
        <BottomSheet title="Установка на Смартфон" onClose={closeInstall}>
          <div className="rounded-2xl border border-blue-400/25 bg-blue-500/15 p-4">
            <p className="text-sm leading-6 text-blue-50">
              💡 Сначала{" "}
              <span className="font-bold text-emerald-300">скачайте приложение</span>{" "}
              на телефон, затем перейдите на{" "}
              <span className="font-bold text-emerald-300">Шаг 2</span> и добавьте подписки.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-black/25 p-1">
            <button
              onClick={() => setSelectedApp("happ")}
              className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                selectedApp === "happ" ? "bg-white/10 text-white" : "text-white/45"
              }`}
            >
              🅷 Happ ⭐
            </button>

            <button
              onClick={() => setSelectedApp("incy")}
              className={`rounded-xl px-4 py-3 text-sm font-extrabold transition ${
                selectedApp === "incy" ? "bg-white/10 text-white" : "text-white/45"
              }`}
            >
              🟩 INCY
            </button>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl bg-black/25">
            {appLinks.map((item) => (
              <button
                key={item.url}
                onClick={() => openExternal(item.url)}
                className="flex w-full items-center gap-3 border-b border-white/10 px-4 py-4 text-left last:border-b-0 transition hover:bg-white/5"
              >
                <span className="text-lg">{item.icon}</span>
                <span>
                  <span className="block text-sm font-extrabold">{item.label}</span>
                  {item.subtitle && (
                    <span className="block pt-0.5 text-xs text-white/40">{item.subtitle}</span>
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={closeInstall}
              className="rounded-2xl px-4 py-3 text-left text-sm font-extrabold text-blue-300"
            >
              Назад
            </button>

            <button
              onClick={() => {
                setInstallStep(2)
                setManualLinkVisible(false)
                setNotice(null)
              }}
              className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-extrabold shadow-lg shadow-blue-600/30"
            >
              Шаг 2 →
            </button>
          </div>
        </BottomSheet>
      )}

      {installScreen === "smartphone" && installStep === 2 && (
        <BottomSheet title="Авто-настройка VPN" onClose={closeInstall}>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
            <p className="text-sm leading-6 text-emerald-50/90">
              Добавьте обе подписки по очереди: сначала{" "}
              <span className="font-bold text-emerald-300">чёрный список</span>, затем{" "}
              <span className="font-bold text-slate-100">белый список</span>.
            </p>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl bg-black/25">
            <button
              disabled={!globalLink || !data?.can_use_vpn}
              onClick={() => autoSetup("happ", "global")}
              className="flex w-full items-center gap-3 border-b border-white/10 px-4 py-4 text-left transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-lg">⬛</span>
              <span>
                <span className="block text-sm font-extrabold">Happ — ЧЁРНЫЙ СПИСОК</span>
                <span className="block text-xs text-white/40">GLOBAL MODE · быстрый режим</span>
              </span>
            </button>

            <button
              disabled={!steadyLink || !data?.can_use_vpn}
              onClick={() => autoSetup("happ", "steady")}
              className="flex w-full items-center gap-3 border-b border-white/10 px-4 py-4 text-left transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-lg">⬜</span>
              <span>
                <span className="block text-sm font-extrabold">Happ — БЕЛЫЙ СПИСОК</span>
                <span className="block text-xs text-white/40">STEADY MODE · устойчивый режим</span>
              </span>
            </button>

            <button
              disabled={!globalLink || !data?.can_use_vpn}
              onClick={() => autoSetup("incy", "global")}
              className="flex w-full items-center gap-3 border-b border-white/10 px-4 py-4 text-left transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-lg">⬛</span>
              <span>
                <span className="block text-sm font-extrabold">INCY — ЧЁРНЫЙ СПИСОК</span>
                <span className="block text-xs text-white/40">GLOBAL MODE · быстрый режим</span>
              </span>
            </button>

            <button
              disabled={!steadyLink || !data?.can_use_vpn}
              onClick={() => autoSetup("incy", "steady")}
              className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="text-lg">⬜</span>
              <span>
                <span className="block text-sm font-extrabold">INCY — БЕЛЫЙ СПИСОК</span>
                <span className="block text-xs text-white/40">STEADY MODE · устойчивый режим</span>
              </span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              disabled={!globalLink || !data?.can_use_vpn}
              onClick={() => copyModeLink("global")}
              className="rounded-2xl bg-emerald-600 px-4 py-4 text-left text-sm font-extrabold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
            >
              Скопировать GLOBAL
            </button>

            <button
              disabled={!steadyLink || !data?.can_use_vpn}
              onClick={() => copyModeLink("steady")}
              className="rounded-2xl bg-slate-700 px-4 py-4 text-left text-sm font-extrabold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
            >
              Скопировать STEADY
            </button>
          </div>

          {notice && (
            <p className="mt-4 whitespace-pre-line rounded-2xl bg-blue-500/10 p-3 text-sm text-blue-100/90">
              {notice}
            </p>
          )}

          {copiedMode && (
            <p className="mt-4 rounded-2xl bg-emerald-500/10 p-3 text-sm text-emerald-100/90">
              Ссылка скопирована ✅
            </p>
          )}

          {manualLinkVisible && selectedInstallLink?.url && (
            <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/40">
                Ссылка для ручного копирования
              </p>
              <p className="mt-2 break-all text-sm leading-6 text-white/80">
                {selectedInstallLink.url}
              </p>
            </div>
          )}

          {!data?.can_use_vpn && (
            <p className="mt-4 rounded-2xl bg-red-500/10 p-3 text-sm text-red-100/80">
              Доступ не активен. Активируйте Premium в боте, чтобы получить ссылки.
            </p>
          )}

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={backFromAutoSetup}
              className="rounded-2xl px-4 py-3 text-left text-sm font-extrabold text-blue-300"
            >
              ← Назад
            </button>

            <button
              onClick={closeInstall}
              className="rounded-2xl bg-blue-600 px-6 py-4 text-sm font-extrabold shadow-lg shadow-blue-600/30"
            >
              Готово
            </button>
          </div>
        </BottomSheet>
      )}

      {installScreen === "windows" && (
        <BottomSheet title="Установка на Windows" onClose={closeInstall}>
          <ol className="space-y-3 text-sm leading-6 text-white/75">
            <li className="rounded-2xl bg-black/25 p-3">1. Установите совместимый VPN-клиент для Windows.</li>
            <li className="rounded-2xl bg-black/25 p-3">2. Скопируйте ссылку GLOBAL или STEADY.</li>
            <li className="rounded-2xl bg-black/25 p-3">3. Добавьте её как Subscription.</li>
            <li className="rounded-2xl bg-black/25 p-3">4. Обновите список серверов и подключитесь.</li>
          </ol>

          <div className="mt-4 space-y-3">
            <button
              disabled={!globalLink || !data?.can_use_vpn}
              onClick={() => copyLink(globalLink)}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-left text-sm font-extrabold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
            >
              Скопировать GLOBAL
            </button>

            <button
              disabled={!steadyLink || !data?.can_use_vpn}
              onClick={() => copyLink(steadyLink)}
              className="w-full rounded-2xl bg-slate-700 px-4 py-4 text-left text-sm font-extrabold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
            >
              Скопировать STEADY
            </button>
          </div>
        </BottomSheet>
      )}

      {installScreen === "tv" && (
        <BottomSheet title="Android TV" onClose={closeInstall}>
          <ol className="space-y-3 text-sm leading-6 text-white/75">
            <li className="rounded-2xl bg-black/25 p-3">1. Установите совместимый VPN-клиент на Android TV.</li>
            <li className="rounded-2xl bg-black/25 p-3">2. Передайте subscription-ссылку на устройство.</li>
            <li className="rounded-2xl bg-black/25 p-3">3. Добавьте ссылку в приложение.</li>
            <li className="rounded-2xl bg-black/25 p-3">4. Обновите подписку и подключитесь.</li>
          </ol>

          <div className="mt-4 space-y-3">
            <button
              disabled={!globalLink || !data?.can_use_vpn}
              onClick={() => copyLink(globalLink)}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-left text-sm font-extrabold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
            >
              Скопировать GLOBAL
            </button>

            <button
              disabled={!steadyLink || !data?.can_use_vpn}
              onClick={() => copyLink(steadyLink)}
              className="w-full rounded-2xl bg-slate-700 px-4 py-4 text-left text-sm font-extrabold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
            >
              Скопировать STEADY
            </button>
          </div>
        </BottomSheet>
      )}
    </>
  )
}
