"use client"

import Script from "next/script"
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
  const selectedModeTitle = selectedMode === "global" ? "GLOBAL MODE" : "STEADY MODE"
  const selectedModeSubtitle =
    selectedMode === "global"
      ? "Черный список · быстрый режим"
      : "Белый список · устойчивый режим"

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
  }

  function openWindowsInstall() {
    setInstallScreen("windows")
    setInstallStep(1)
    setManualLinkVisible(false)
    setNotice(null)
  }

  function openTvInstall() {
    setInstallScreen("tv")
    setInstallStep(1)
    setManualLinkVisible(false)
    setNotice(null)
  }

  function closeInstall() {
    setInstallScreen(null)
    setInstallStep(1)
    setManualLinkVisible(false)
    setNotice(null)
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

  async function copySelectedLink() {
    if (!selectedInstallLink?.url) return

    const ok = await copyTextToClipboard(selectedInstallLink.url)

    if (ok) {
      setCopiedMode(selectedInstallLink.mode)
      setManualLinkVisible(false)
      showNotice(`${selectedModeTitle}: ссылка скопирована ✅`)
      setTimeout(() => setCopiedMode(null), 1800)
      return
    }

    setManualLinkVisible(true)
    setError("Не удалось скопировать ссылку автоматически. Скопируйте её вручную.")
  }

  async function autoSetup(app: SelectedApp) {
    if (!selectedInstallLink?.url || !data?.can_use_vpn) return

    const appName = app === "happ" ? "Happ" : "INCY"
    const appScheme = app === "happ" ? "happ" : "incy"

    const subscriptionUrl = selectedInstallLink.url
    const deepLink = `${appScheme}://add/${subscriptionUrl}`
    const redirectUrl = `/redirect_app?target=${encodeURIComponent(deepLink)}`

    const ok = await copyTextToClipboard(subscriptionUrl)

    if (ok) {
      setCopiedMode(selectedInstallLink.mode)
      setManualLinkVisible(false)
      showNotice(`Ссылка ${selectedModeTitle} скопирована. Открываем ${appName}...`)
      setTimeout(() => setCopiedMode(null), 1800)
    } else {
      setManualLinkVisible(true)
      showNotice(`Открываем ${appName}. Если нужно — скопируйте ссылку вручную ниже.`)
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
              Управляйте подключением, копируйте персональные ссылки и выбирайте
              режим VPN прямо внутри Telegram.
            </p>
          </section>

          {loading && (
            <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm text-white/70">Загружаем данные подписки...</p>
            </section>
          )}

          {!loading && error && !user && (
            <section className="rounded-3xl border border-red-500/20 bg-red-500/[0.08] p-5">
              <h2 className="text-lg font-bold text-red-200">Не удалось открыть кабинет</h2>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-red-100/80">
                {error}
              </p>
            </section>
          )}

          {!loading && user && (
            <>
              <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold">Подписка</h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass(
                      user.access_status
                    )}`}
                  >
                    {statusLabel(user.access_status)}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-black/25 p-4">
                    <p className="text-xs text-white/45">Пользователь</p>
                    <p className="mt-1 truncate font-semibold">
                      {user.username ? `@${user.username}` : user.first_name || user.tg_user_id}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black/25 p-4">
                    <p className="text-xs text-white/45">Осталось</p>
                    <p className="mt-1 font-semibold">
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
                    <p className="font-semibold text-red-200">Доступ не активен</p>
                    <p className="mt-2 text-sm leading-6 text-red-100/75">
                      Тестовый период завершён или доступ заблокирован. Чтобы
                      продолжить пользоваться VPN, активируйте Premium в боте.
                    </p>
                  </div>
                )}
              </section>

              <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h2 className="text-lg font-bold">Режимы подключения</h2>

                <div className="mt-4 space-y-3">
                  <button
                    disabled={!globalLink || !data?.can_use_vpn}
                    onClick={() => copyLink(globalLink)}
                    className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-left font-bold shadow-lg disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
                  >
                    ⬛ GLOBAL MODE
                    <span className="block pt-1 text-sm font-normal text-white/75">
                      {copiedMode === "black_vless"
                        ? "Ссылка скопирована ✅"
                        : "Скопировать персональную ссылку"}
                    </span>
                  </button>

                  <button
                    disabled={!steadyLink || !data?.can_use_vpn}
                    onClick={() => copyLink(steadyLink)}
                    className="w-full rounded-2xl bg-slate-700 px-4 py-4 text-left font-bold shadow-lg disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
                  >
                    ⬜ STEADY MODE
                    <span className="block pt-1 text-sm font-normal text-white/75">
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

              <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h2 className="text-lg font-bold">Установка</h2>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={openSmartphoneInstall}
                    className="rounded-2xl bg-black/25 p-4 text-left font-semibold transition hover:bg-white/10"
                  >
                    📱 iPhone
                  </button>

                  <button
                    onClick={openSmartphoneInstall}
                    className="rounded-2xl bg-black/25 p-4 text-left font-semibold transition hover:bg-white/10"
                  >
                    🤖 Android
                  </button>

                  <button
                    onClick={openWindowsInstall}
                    className="rounded-2xl bg-black/25 p-4 text-left font-semibold transition hover:bg-white/10"
                  >
                    💻 Windows
                  </button>

                  <button
                    onClick={openTvInstall}
                    className="rounded-2xl bg-black/25 p-4 text-left font-semibold transition hover:bg-white/10"
                  >
                    📺 Android TV
                  </button>
                </div>
              </section>

              {installScreen === "smartphone" && installStep === 1 && (
                <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-bold">Установка на Смартфон</h2>
                    <button
                      onClick={closeInstall}
                      className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-bold text-red-300"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-blue-400/25 bg-blue-500/15 p-4">
                    <p className="text-sm leading-6 text-blue-50">
                      💡 Сначала{" "}
                      <span className="font-bold text-emerald-300">скачайте приложение</span>{" "}
                      на ваш телефон, затем перейдите на{" "}
                      <span className="font-bold text-emerald-300">Шаг 2</span> и добавьте
                      подписку.
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl bg-black/25 p-1">
                    <button
                      onClick={() => setSelectedApp("happ")}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                        selectedApp === "happ" ? "bg-white/10 text-white" : "text-white/45"
                      }`}
                    >
                      🅷 Happ ⭐
                    </button>

                    <button
                      onClick={() => setSelectedApp("incy")}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
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
                        <span className="text-xl">{item.icon}</span>
                        <span>
                          <span className="block font-bold">{item.label}</span>
                          {item.subtitle && (
                            <span className="block text-xs text-white/40">{item.subtitle}</span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <button
                      onClick={closeInstall}
                      className="rounded-2xl px-4 py-3 text-left font-bold text-blue-300"
                    >
                      Назад
                    </button>

                    <button
                      onClick={() => {
                        setInstallStep(2)
                        setManualLinkVisible(false)
                        setNotice(null)
                      }}
                      className="rounded-2xl bg-blue-600 px-6 py-4 font-bold shadow-lg shadow-blue-600/30"
                    >
                      Шаг 2 →
                    </button>
                  </div>
                </section>
              )}

              {installScreen === "smartphone" && installStep === 2 && (
                <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-bold">Установка на Смартфон</h2>
                    <button
                      onClick={closeInstall}
                      className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-bold text-red-300"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                    <p className="text-sm leading-6 text-emerald-50/90">
                      Откройте установленное приложение и нажмите{" "}
                      <span className="font-bold text-emerald-300">«Авто-настройка»</span>.
                      Ссылка будет скопирована автоматически.
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/45">
                      Выберите режим
                    </p>

                    <div className="grid grid-cols-2 gap-2 rounded-2xl bg-black/25 p-1">
                      <button
                        onClick={() => {
                          setSelectedMode("global")
                          setManualLinkVisible(false)
                          setNotice(null)
                        }}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                          selectedMode === "global" ? "bg-emerald-600 text-white" : "text-white/45"
                        }`}
                      >
                        ⬛ GLOBAL
                      </button>

                      <button
                        onClick={() => {
                          setSelectedMode("steady")
                          setManualLinkVisible(false)
                          setNotice(null)
                        }}
                        className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                          selectedMode === "steady" ? "bg-slate-600 text-white" : "text-white/45"
                        }`}
                      >
                        ⬜ STEADY
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-white/45">{selectedModeSubtitle}</p>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl bg-black/25">
                    <button
                      disabled={!selectedInstallLink || !data?.can_use_vpn}
                      onClick={() => autoSetup("happ")}
                      className="flex w-full items-center gap-3 border-b border-white/10 px-4 py-4 text-left font-bold transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="text-xl">🅷</span>
                      <span>
                        <span className="block">Авто-настройка Happ</span>
                        <span className="block text-xs font-normal text-white/40">
                          Скопируем ссылку и откроем приложение
                        </span>
                      </span>
                    </button>

                    <button
                      disabled={!selectedInstallLink || !data?.can_use_vpn}
                      onClick={() => autoSetup("incy")}
                      className="flex w-full items-center gap-3 border-b border-white/10 px-4 py-4 text-left font-bold transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="text-xl">🟩</span>
                      <span>
                        <span className="block">Авто-настройка INCY</span>
                        <span className="block text-xs font-normal text-white/40">
                          Скопируем ссылку и откроем приложение
                        </span>
                      </span>
                    </button>

                    <button
                      disabled={!selectedInstallLink || !data?.can_use_vpn}
                      onClick={copySelectedLink}
                      className="flex w-full items-center gap-3 px-4 py-4 text-left font-bold transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="text-xl">🔗</span>
                      <span>
                        <span className="block">Скопировать ссылку</span>
                        <span className="block text-xs font-normal text-white/40">
                          {selectedModeTitle}
                        </span>
                      </span>
                    </button>
                  </div>

                  {notice && (
                    <p className="mt-4 whitespace-pre-line rounded-2xl bg-blue-500/10 p-3 text-sm text-blue-100/90">
                      {notice}
                    </p>
                  )}

                  {copiedMode === selectedInstallLink?.mode && (
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
                      onClick={() => {
                        setInstallStep(1)
                        setManualLinkVisible(false)
                        setNotice(null)
                      }}
                      className="rounded-2xl px-4 py-3 text-left font-bold text-blue-300"
                    >
                      ← Назад
                    </button>

                    <button
                      onClick={closeInstall}
                      className="rounded-2xl bg-blue-600 px-6 py-4 font-bold shadow-lg shadow-blue-600/30"
                    >
                      Готово
                    </button>
                  </div>
                </section>
              )}

              {installScreen === "windows" && (
                <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-bold">💻 Установка на Windows</h2>
                    <button
                      onClick={closeInstall}
                      className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-bold text-red-300"
                    >
                      ×
                    </button>
                  </div>

                  <ol className="mt-4 space-y-3 text-sm leading-6 text-white/75">
                    <li className="rounded-2xl bg-black/25 p-3">
                      1. Установите совместимый VPN-клиент для Windows.
                    </li>
                    <li className="rounded-2xl bg-black/25 p-3">
                      2. Скопируйте ссылку GLOBAL или STEADY.
                    </li>
                    <li className="rounded-2xl bg-black/25 p-3">
                      3. Добавьте её как Subscription.
                    </li>
                    <li className="rounded-2xl bg-black/25 p-3">
                      4. Обновите список серверов и подключитесь.
                    </li>
                  </ol>

                  <div className="mt-4 space-y-3">
                    <button
                      disabled={!globalLink || !data?.can_use_vpn}
                      onClick={() => copyLink(globalLink)}
                      className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-left font-bold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
                    >
                      Скопировать GLOBAL
                    </button>

                    <button
                      disabled={!steadyLink || !data?.can_use_vpn}
                      onClick={() => copyLink(steadyLink)}
                      className="w-full rounded-2xl bg-slate-700 px-4 py-4 text-left font-bold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
                    >
                      Скопировать STEADY
                    </button>
                  </div>
                </section>
              )}

              {installScreen === "tv" && (
                <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-lg font-bold">📺 Android TV</h2>
                    <button
                      onClick={closeInstall}
                      className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-bold text-red-300"
                    >
                      ×
                    </button>
                  </div>

                  <ol className="mt-4 space-y-3 text-sm leading-6 text-white/75">
                    <li className="rounded-2xl bg-black/25 p-3">
                      1. Установите совместимый VPN-клиент на Android TV.
                    </li>
                    <li className="rounded-2xl bg-black/25 p-3">
                      2. Передайте subscription-ссылку на устройство.
                    </li>
                    <li className="rounded-2xl bg-black/25 p-3">
                      3. Добавьте ссылку в приложение.
                    </li>
                    <li className="rounded-2xl bg-black/25 p-3">
                      4. Обновите подписку и подключитесь.
                    </li>
                  </ol>

                  <div className="mt-4 space-y-3">
                    <button
                      disabled={!globalLink || !data?.can_use_vpn}
                      onClick={() => copyLink(globalLink)}
                      className="w-full rounded-2xl bg-emerald-600 px-4 py-4 text-left font-bold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
                    >
                      Скопировать GLOBAL
                    </button>

                    <button
                      disabled={!steadyLink || !data?.can_use_vpn}
                      onClick={() => copyLink(steadyLink)}
                      className="w-full rounded-2xl bg-slate-700 px-4 py-4 text-left font-bold disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-55"
                    >
                      Скопировать STEADY
                    </button>
                  </div>
                </section>
              )}
            </>
          )}

          <p className="pb-4 text-center text-xs text-white/35">
            PROVPN Cicada · secure subscription cabinet
          </p>
        </div>
      </main>
    </>
  )
}
