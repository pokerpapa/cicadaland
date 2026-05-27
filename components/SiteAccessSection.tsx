"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  CheckCircle2,
  Copy,
  CreditCard,
  ExternalLink,
  Loader2,
  Mail,
  RefreshCw,
  ShieldCheck,
  Smartphone,
} from "lucide-react"

type SiteUser = {
  email?: string
  user_id?: number
  access_status?: string
  has_access?: number
  can_use_vpn?: boolean
}

type SiteLink = {
  mode: string
  title: string
  url: string
  is_active?: boolean
}

type ApiResponse = {
  ok?: boolean
  error?: string
  web_token?: string
  webToken?: string
  payment_url?: string
  paymentUrl?: string
  order_id?: string | number
  orderId?: string | number
  transaction_id?: string
  transactionId?: string
  status?: string
  can_use_vpn?: boolean
  has_access?: number
  already_paid?: boolean
  user?: SiteUser
  links?: SiteLink[]
  global?: string
  steady?: string
}

const TOKEN_KEY = "provpn_web_token"
const ORDER_KEY = "provpn_site_order_id"

const appDownloads = [
  {
    title: "Happ для iPhone",
    subtitle: "App Store",
    url: "https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973",
  },
  {
    title: "Happ для Android",
    subtitle: "Google Play",
    url: "https://play.google.com/store/apps/details?id=com.happproxy",
  },
  {
    title: "Happ APK",
    subtitle: "Если нет Google Play",
    url: "https://github.com/Happ-proxy/happ-android/releases/latest/download/Happ.apk",
  },
  {
    title: "INCY",
    subtitle: "Альтернативное приложение",
    url: "https://play.google.com/store/apps/details?id=llc.itdev.incy",
  },
  {
    title: "🛡 Karing для iPhone",
    subtitle: "Продвинутый вариант",
    url: "https://apps.apple.com/us/app/karing/id6472431552",
  },
]

function getAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
}

async function parseJson(response: Response): Promise<ApiResponse> {
  try {
    return (await response.json()) as ApiResponse
  } catch {
    return {}
  }
}

function normalizeLinks(data: ApiResponse): SiteLink[] {
  if (Array.isArray(data.links)) return data.links

  const links: SiteLink[] = []

  if (data.global) {
    links.push({
      mode: "black_vless",
      title: "GLOBAL MODE",
      url: data.global,
      is_active: true,
    })
  }

  if (data.steady) {
    links.push({
      mode: "white_mobile",
      title: "STEADY MODE",
      url: data.steady,
      is_active: true,
    })
  }

  return links
}

function isPaidStatus(status?: string) {
  return status === "paid" || status === "confirmed" || status === "trial_active"
}

export function SiteAccessSection() {
  const [email, setEmail] = useState("")
  const [webToken, setWebToken] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [user, setUser] = useState<SiteUser | null>(null)
  const [links, setLinks] = useState<SiteLink[]>([])

  const [loadingSession, setLoadingSession] = useState(false)
  const [loadingPayment, setLoadingPayment] = useState(false)
  const [checkingPayment, setCheckingPayment] = useState(false)
  const [loadingLinks, setLoadingLinks] = useState(false)

  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [copiedMode, setCopiedMode] = useState<string | null>(null)

  const canUseVpn = Boolean(
    user?.can_use_vpn ||
      user?.has_access === 1 ||
      isPaidStatus(user?.access_status)
  )

  const globalLink = useMemo(
    () => links.find((link) => link.mode === "black_vless"),
    [links]
  )

  const steadyLink = useMemo(
    () => links.find((link) => link.mode === "white_mobile"),
    [links]
  )

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_KEY)
    const savedOrderId = localStorage.getItem(ORDER_KEY)

    if (savedToken) {
      setWebToken(savedToken)
      loadMe(savedToken)
    }

    if (savedOrderId) {
      setOrderId(savedOrderId)
    }
  }, [])

  async function loadMe(token: string) {
    try {
      const response = await fetch("/api/site/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const json = await parseJson(response)

      if (!response.ok || json.error) {
        throw new Error(json.error || "Не удалось загрузить web-кабинет.")
      }

      const nextUser = json.user || json
      setUser(nextUser)

      if (nextUser.email) {
        setEmail(nextUser.email)
      }

      if (
        json.can_use_vpn ||
        nextUser.can_use_vpn ||
        nextUser.has_access === 1 ||
        isPaidStatus(nextUser.access_status)
      ) {
        await loadLinks(token)
      }
    } catch {
      localStorage.removeItem(TOKEN_KEY)
      setWebToken(null)
      setUser(null)
    }
  }

  async function createSession() {
    setError(null)
    setNotice(null)

    const cleanEmail = email.trim().toLowerCase()

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Введите корректный email.")
      return
    }

    setLoadingSession(true)

    try {
      const response = await fetch("/api/site/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail }),
      })

      const json = await parseJson(response)

      if (!response.ok || json.error) {
        throw new Error(json.error || "Не удалось создать web-доступ.")
      }

      const token = json.web_token || json.webToken

      if (!token) {
        throw new Error("Сервер не вернул web_token.")
      }

      localStorage.setItem(TOKEN_KEY, token)
      setWebToken(token)
      setUser(json.user || { email: cleanEmail, access_status: "none" })
      setNotice("Отлично. Теперь нажмите зелёную кнопку оплаты ниже.")

      window.setTimeout(() => {
        document.getElementById("site-pay-button")?.focus()
      }, 120)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка соединения с сервером.")
    } finally {
      setLoadingSession(false)
    }
  }

  async function createPayment() {
    if (!webToken) {
      setError("Сначала введите email.")
      return
    }

    setError(null)
    setNotice(null)
    setLoadingPayment(true)

    try {
      const response = await fetch("/api/site/create-payment", {
        method: "POST",
        headers: getAuthHeaders(webToken),
      })

      const json = await parseJson(response)

      if (!response.ok || json.error) {
        throw new Error(json.error || "Не удалось создать оплату.")
      }

      if (json.already_paid || json.can_use_vpn) {
        setUser((current) => ({
          ...(current || {}),
          has_access: 1,
          can_use_vpn: true,
          access_status: json.status || "paid",
        }))
        setNotice("Доступ уже активирован. Загружаем VPN-ссылки.")
        await loadLinks(webToken)
        return
      }

      const paymentUrl = json.payment_url || json.paymentUrl
      const nextOrderId = json.order_id || json.orderId

      if (!paymentUrl || !nextOrderId) {
        throw new Error("Сервер не вернул ссылку оплаты.")
      }

      const order = String(nextOrderId)
      localStorage.setItem(ORDER_KEY, order)
      setOrderId(order)
      setNotice("Сейчас откроется защищённая страница оплаты.")

      window.location.href = paymentUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка создания оплаты.")
      setLoadingPayment(false)
    }
  }

  async function checkPayment() {
    if (!webToken || !orderId) {
      setError("Заказ для проверки не найден.")
      return
    }

    setError(null)
    setNotice(null)
    setCheckingPayment(true)

    try {
      const response = await fetch(`/api/site/order/${encodeURIComponent(orderId)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${webToken}`,
        },
      })

      const json = await parseJson(response)

      if (!response.ok || json.error) {
        throw new Error(json.error || "Не удалось проверить оплату.")
      }

      const paid =
        json.can_use_vpn ||
        json.status === "confirmed" ||
        json.status === "paid" ||
        json.status === "success"

      if (!paid) {
        setNotice(
          `Оплата пока не подтверждена. Текущий статус: ${json.status || "pending"}. Если вы уже оплатили, подождите 1–2 минуты и нажмите проверку ещё раз.`
        )
        return
      }

      setNotice("Оплата подтверждена ✅ Сейчас загрузим ваши VPN-ссылки. Добавьте обе: GLOBAL и STEADY.")
      await loadMe(webToken)
      await loadLinks(webToken)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка проверки оплаты.")
    } finally {
      setCheckingPayment(false)
    }
  }

  async function loadLinks(token = webToken || "") {
    if (!token) return

    setError(null)
    setLoadingLinks(true)

    try {
      const response = await fetch("/api/site/links", {
        method: "POST",
        headers: getAuthHeaders(token),
      })

      const json = await parseJson(response)

      if (!response.ok || json.error) {
        throw new Error(json.error || "Не удалось получить VPN-ссылки.")
      }

      const nextLinks = normalizeLinks(json)

      if (!nextLinks.length) {
        throw new Error("Сервер не вернул ссылки GLOBAL / STEADY.")
      }

      setLinks(nextLinks)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки ссылок.")
    } finally {
      setLoadingLinks(false)
    }
  }

  async function copyText(text: string, mode: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedMode(mode)
      setNotice("Ссылка скопирована.")
      setTimeout(() => setCopiedMode(null), 1800)
    } catch {
      setError("Не удалось скопировать автоматически. Выделите ссылку вручную.")
    }
  }

  function openApp(app: "happ" | "incy", url: string) {
    const scheme = app === "happ" ? "happ" : "incy"
    const deepLink = `${scheme}://add/${url}`
    const origin = typeof window !== "undefined" ? window.location.origin : "https://www.provpn.bet"
    const redirectUrl = `${origin}/redirect_app?target=${encodeURIComponent(deepLink)}`
    window.location.href = redirectUrl
  }

  function resetSession() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(ORDER_KEY)
    setWebToken(null)
    setOrderId(null)
    setUser(null)
    setLinks([])
    setNotice(null)
    setError(null)

    window.setTimeout(() => {
      document.getElementById("site-email-input")?.focus()
    }, 80)
  }

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#3B82F6]/10 blur-[160px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#A78BFA]/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="mb-6 inline-flex rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-4 py-2 text-sm font-medium text-[#22C55E]">
            Быстрое подключение за 3 минуты
          </span>

          <h2 className="text-balance text-3xl font-bold text-[#E5E7EB] sm:text-4xl md:text-5xl">
            Получите VPN прямо на сайте
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#A78BFA] bg-clip-text text-transparent">
              {" "}
              за несколько кликов
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#94A3B8]">
            Введите email, оплатите доступ и получите ссылки для подключения.
            Всё происходит на этой странице.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-[#1F2A44] bg-[#0B1026] p-6 sm:p-8">
            <h3 className="mb-6 text-2xl font-bold text-[#E5E7EB]">
              3 простых шага
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4 rounded-2xl bg-[#070B1A]/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/15 text-[#3B82F6]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#E5E7EB]">1. Введите email</p>
                  <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                    Email нужен для входа в кабинет. Потом вы сможете открыть доступ
                    с другого устройства, просто введя тот же email.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-[#070B1A]/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#22C55E]/15 text-[#22C55E]">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#E5E7EB]">
                    2. Оплатите 490₽ один раз
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                    Это единоразовая оплата. Не подписка и не ежемесячный платёж.
                    Откроется защищённая страница Platega.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl bg-[#070B1A]/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#A78BFA]/15 text-[#A78BFA]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-[#E5E7EB]">
                    3. Подключите VPN навсегда
                  </p>
                  <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                    После оплаты вернитесь на сайт, проверьте оплату и добавьте
                    подписки в Happ или INCY.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
                Скачать приложение
              </h4>

              <div className="grid gap-3 sm:grid-cols-2">
                {appDownloads.map((app) => (
                  <a
                    key={app.url}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-[#1F2A44] bg-[#070B1A]/70 p-4 transition hover:border-[#3B82F6]/50 hover:bg-[#1F2A44]/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-[#E5E7EB]">{app.title}</p>
                        <p className="mt-1 text-sm text-[#94A3B8]">{app.subtitle}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 shrink-0 text-[#3B82F6]" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            id="get-vpn"
            className="scroll-mt-28 rounded-3xl border border-[#22C55E]/30 bg-[#0B1026] p-6 shadow-2xl shadow-[#22C55E]/10 transition-all duration-300 sm:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#E5E7EB]">
                  Купить VPN за 490₽ навсегда
                </h3>
                <p className="mt-2 text-sm text-[#94A3B8]">
                  Это единоразовая оплата. Не подписка и не ежемесячный платёж.
                </p>
              </div>

              {canUseVpn && (
                <div className="rounded-full bg-[#22C55E]/10 px-3 py-1 text-xs font-bold text-[#22C55E]">
                  ACTIVE
                </div>
              )}
            </div>

            {!webToken && (
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#E5E7EB]">
                    Ваш email для получения VPN
                  </span>
                  <input
                    id="site-email-input"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        createSession()
                      }
                    }}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="email@example.com"
                    className="h-14 w-full rounded-2xl border border-[#1F2A44] bg-[#070B1A] px-4 text-[#E5E7EB] outline-none transition placeholder:text-[#94A3B8]/50 focus:border-[#3B82F6]"
                  />
                </label>

                <Button
                  onClick={createSession}
                  disabled={loadingSession}
                  className="h-14 w-full rounded-2xl bg-[#3B82F6] text-base font-semibold text-white hover:bg-[#2563EB]"
                >
                  {loadingSession ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Создаём доступ...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Продолжить — 490₽ навсегда
                    </>
                  )}
                </Button>

                <p className="rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/10 p-4 text-sm leading-6 text-[#D1FAE5]">
                  Вы платите 490₽ один раз и получаете доступ навсегда.
                  После оплаты ссылки появятся здесь автоматически.
                </p>
              </div>
            )}

            {webToken && !canUseVpn && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#1F2A44] bg-[#070B1A]/70 p-4">
                  <p className="text-sm text-[#94A3B8]">Ваш web-кабинет</p>
                  <p className="mt-1 font-semibold text-[#E5E7EB]">
                    {user?.email || email}
                  </p>
                  <p className="mt-2 text-sm text-[#94A3B8]">
                    Статус:{" "}
                    <span className="font-semibold text-yellow-300">
                      {user?.access_status || "ожидает оплаты"}
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
                  <p className="font-bold text-yellow-200">
                    Важно перед оплатой
                  </p>
                  <ul className="mt-2 space-y-1 text-sm leading-6 text-yellow-100/85">
                    <li>1. Вы платите 490₽ один раз, не каждый месяц.</li>
                    <li>2. Сейчас откроется защищённая страница оплаты.</li>
                    <li>3. После оплаты вернитесь на сайт.</li>
                    <li>4. Если доступ не появился сразу — нажмите проверку.</li>
                  </ul>
                </div>

                <Button
                  id="site-pay-button"
                  onClick={createPayment}
                  disabled={loadingPayment}
                  className="h-14 w-full rounded-2xl bg-[#22C55E] text-base font-semibold text-white hover:bg-[#16A34A] focus:ring-4 focus:ring-[#22C55E]/30"
                >
                  {loadingPayment ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Создаём оплату...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Перейти к оплате 490₽
                    </>
                  )}
                </Button>

                <a
                  href="https://t.me/provpnsup_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-full items-center justify-center rounded-2xl border border-[#1F2A44] bg-[#070B1A] text-base font-semibold text-[#E5E7EB] transition hover:bg-[#1F2A44]"
                >
                  Нужна помощь? Написать в поддержку
                </a>

                {orderId && (
                  <Button
                    onClick={checkPayment}
                    disabled={checkingPayment}
                    variant="outline"
                    className="h-14 w-full rounded-2xl border-[#1F2A44] bg-[#070B1A] text-base font-semibold text-[#E5E7EB] hover:bg-[#1F2A44]"
                  >
                    {checkingPayment ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Проверяем...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-5 w-5" />
                        Я оплатил — проверить
                      </>
                    )}
                  </Button>
                )}

                <button
                  onClick={resetSession}
                  className="w-full text-sm text-[#94A3B8] transition hover:text-[#E5E7EB]"
                >
                  Ввести другой email
                </button>
              </div>
            )}

            {webToken && canUseVpn && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/10 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]" />
                    <div>
                      <p className="font-semibold text-[#E5E7EB]">
                        Доступ активирован навсегда
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#94A3B8]">
                        Ниже появились две подписки. Нажмите Happ или INCY возле GLOBAL,
                        затем повторите то же самое для STEADY.
                      </p>
                    </div>
                  </div>
                </div>

                {!links.length && (
                  <Button
                    onClick={() => loadLinks()}
                    disabled={loadingLinks}
                    className="h-14 w-full rounded-2xl bg-[#3B82F6] text-base font-semibold text-white hover:bg-[#2563EB]"
                  >
                    {loadingLinks ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Загружаем ссылки...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-5 w-5" />
                        Получить VPN-ссылки
                      </>
                    )}
                  </Button>
                )}

                {globalLink && (
                  <VpnLinkCard
                    title="⬛ GLOBAL MODE"
                    subtitle="Универсальный быстрый режим"
                    link={globalLink}
                    copied={copiedMode === globalLink.mode}
                    onCopy={() => copyText(globalLink.url, globalLink.mode)}
                    onHapp={() => openApp("happ", globalLink.url)}
                    onIncy={() => openApp("incy", globalLink.url)}
                  />
                )}

                {steadyLink && (
                  <VpnLinkCard
                    title="⬜ STEADY MODE"
                    subtitle="Устойчивый режим для нестабильных сетей"
                    link={steadyLink}
                    copied={copiedMode === steadyLink.mode}
                    onCopy={() => copyText(steadyLink.url, steadyLink.mode)}
                    onHapp={() => openApp("happ", steadyLink.url)}
                    onIncy={() => openApp("incy", steadyLink.url)}
                  />
                )}

                <a
                  href="https://t.me/provpnsup_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-extrabold text-white transition hover:bg-white/[0.08]"
                >
                  Нужна помощь с подключением? Написать в поддержку
                </a>
              </div>
            )}

            {notice && (
              <p className="mt-5 rounded-2xl border border-[#3B82F6]/20 bg-[#3B82F6]/10 p-4 text-sm leading-6 text-blue-100">
                {notice}
              </p>
            )}

            {error && (
              <p className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm leading-6 text-red-100">
                {error}
              </p>
            )}

            <p className="mt-6 text-center text-xs leading-5 text-[#94A3B8]">
              Telegram-бот по-прежнему доступен как альтернативный способ входа.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function VpnLinkCard({
  title,
  subtitle,
  link,
  copied,
  onCopy,
  onHapp,
  onIncy,
}: {
  title: string
  subtitle: string
  link: SiteLink
  copied: boolean
  onCopy: () => void
  onHapp: () => void
  onIncy: () => void
}) {
  return (
    <div className="rounded-2xl border border-[#1F2A44] bg-[#070B1A]/70 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-[#E5E7EB]">{title}</p>
          <p className="mt-1 text-sm text-[#94A3B8]">{subtitle}</p>
        </div>
        <Smartphone className="h-5 w-5 shrink-0 text-[#3B82F6]" />
      </div>

      <div className="mb-4 rounded-xl bg-black/30 p-3">
        <p className="break-all text-xs leading-5 text-[#94A3B8]">
          {link.url}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <Button
          onClick={onHapp}
          className="rounded-xl bg-[#3B82F6] text-white hover:bg-[#2563EB]"
        >
          Добавить в Happ
        </Button>

        <Button
          onClick={onIncy}
          className="rounded-xl bg-[#22C55E] text-white hover:bg-[#16A34A]"
        >
          Добавить в INCY
        </Button>

        <Button
          onClick={onCopy}
          variant="outline"
          className="rounded-xl border-[#1F2A44] bg-[#0B1026] text-[#E5E7EB] hover:bg-[#1F2A44]"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Скопировано" : "Копировать"}
        </Button>
      </div>
    </div>
  )
}
