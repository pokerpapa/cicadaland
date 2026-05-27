"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Apple,
  Smartphone,
  Monitor,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function AppsSection() {
  const [activeTab, setActiveTab] = useState("ios")
  const { t } = useTranslation()

  const platforms = [
    {
      id: "ios",
      name: t("apps.platforms.ios.name"),
      icon: Apple,
      app: t("apps.platforms.ios.appName"),
      steps: t("apps.platforms.ios.steps"),
      storeLink: t("apps.platforms.ios.appLink"),
      videoPath: t("apps.platforms.ios.videoPath"),
      storeName: "App Store",
    },
    {
      id: "android",
      name: t("apps.platforms.android.name"),
      icon: Smartphone,
      app: t("apps.platforms.android.appName"),
      steps: t("apps.platforms.android.steps"),
      storeLink: t("apps.platforms.android.appLink"),
      videoPath: t("apps.platforms.android.videoPath"),
      storeName: "Google Play",
    },
    {
      id: "windows",
      name: t("apps.platforms.windows.name"),
      icon: Monitor,
      app: t("apps.platforms.windows.appName"),
      steps: t("apps.platforms.windows.steps"),
      storeLink: t("apps.platforms.windows.appLink"),
      videoPath: t("apps.platforms.windows.videoPath"),
      storeName: t("apps.downloadApp"),
    },
  ]

  const activePlatform = platforms.find((p) => p.id === activeTab)!

  const karingSteps = [
    "Добавьте GLOBAL MODE.",
    "Затем добавьте STEADY MODE.",
    "Если сайты или приложения открываются нестабильно — включите STEADY MODE.",
  ]

  return (
    <section id="apps" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-[#22C55E]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-sm font-medium mb-6">
            {t("apps.badge")}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#E5E7EB] mb-6 text-balance">
            {t("apps.title1")}
            <span className="bg-gradient-to-r from-[#3B82F6] to-[#A78BFA] bg-clip-text text-transparent">
              {t("apps.title2")}
            </span>
          </h2>

          <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
            {t("apps.subtitle")}
          </p>
        </div>

        <div className="flex overflow-x-auto pb-4 sm:pb-0 sm:flex-wrap justify-start sm:justify-center gap-3 mb-12 no-scrollbar px-2 sm:px-0">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setActiveTab(platform.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap shrink-0 ${
                activeTab === platform.id
                  ? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/30"
                  : "bg-[#0B1026] border border-[#1F2A44] text-[#94A3B8] hover:text-[#E5E7EB] hover:border-[#3B82F6]/30"
              }`}
            >
              <platform.icon className="w-5 h-5" />
              {platform.name}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[9/16] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden border border-[#1F2A44] bg-[#0B1026] shadow-2xl">
                <video
                  key={activePlatform.id}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={activePlatform.videoPath} type="video/mp4" />
                </video>

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
                    {activePlatform.app}
                  </div>

                  <div className="px-3 py-1.5 rounded-full bg-[#22C55E]/90 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    Live Demo
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="bg-[#0B1026] border border-[#1F2A44] rounded-3xl p-8 lg:p-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-[#1F2A44]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#A78BFA] flex items-center justify-center">
                      <activePlatform.icon className="w-7 h-7 text-white" />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#E5E7EB]">
                        {activePlatform.name}
                      </h3>

                      <p className="text-sm text-[#94A3B8]">
                        {t("apps.recommended")}{" "}
                        <span className="text-[#3B82F6] font-semibold">
                          {activePlatform.app}
                        </span>
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40 transition-all"
                  >
                    <a
                      href={activePlatform.storeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {activePlatform.storeName}
                    </a>
                  </Button>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider">
                    {t("apps.howToImport")}
                  </h4>

                  <ol className="space-y-4">
                    {activePlatform.steps.map((step: string, index: number) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#1F2A44] flex items-center justify-center text-sm font-medium text-[#3B82F6]">
                          {index + 1}
                        </span>

                        <span className="text-[#E5E7EB] pt-0.5">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4 text-[#94A3B8]" />

                  <span className="text-[#94A3B8]">
                    {t("apps.needHelp")}
                  </span>

                  <a
                    href="https://t.me/PROVPN_SecureBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3B82F6] hover:text-[#2563EB] inline-flex items-center gap-1 transition-colors"
                  >
                    {t("apps.contactSupport")}{" "}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-[#22C55E]/25 bg-gradient-to-br from-[#0B1026] via-[#0B1026] to-[#052E1A]/50 p-6 shadow-2xl shadow-[#22C55E]/10 sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/25 bg-[#22C55E]/10 px-4 py-2 text-sm font-bold text-[#22C55E]">
                  <ShieldCheck className="h-4 w-4" />
                  Продвинутый вариант
                </div>

                <h3 className="text-2xl font-bold text-[#E5E7EB] sm:text-3xl">
                  Karing — профессиональное приложение для стабильного подключения
                </h3>

                <p className="mt-4 text-base leading-7 text-[#94A3B8]">
                  Если Hiddify, HAPP или другое приложение работает нестабильно,
                  попробуйте Karing. Это продвинутый софт для более устойчивого
                  подключения в сложных сетях.
                </p>

                <div className="mt-6 rounded-2xl border border-[#1F2A44] bg-[#070B1A]/70 p-5">
                  <p className="mb-4 font-semibold text-[#E5E7EB]">
                    Рекомендуемая схема:
                  </p>

                  <ol className="space-y-3">
                    {karingSteps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#22C55E]/15 text-sm font-bold text-[#22C55E]">
                          {index + 1}
                        </span>

                        <span className="pt-0.5 text-sm leading-6 text-[#E5E7EB]">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6 rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/10 p-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]" />

                    <p className="text-sm leading-6 text-[#D1FAE5]">
                      STEADY MODE создан для более устойчивого подключения в сложных
                      сетях. Если что-то открывается нестабильно — переключитесь на
                      STEADY MODE.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    className="h-12 rounded-xl bg-[#22C55E] px-6 font-bold text-white hover:bg-[#16A34A]"
                  >
                    <a
                      href="https://apps.apple.com/us/app/karing/id6472431552"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Скачать Karing в App Store
                    </a>
                  </Button>

                  <a
                    href="https://t.me/PROVPN_SecureBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center rounded-xl border border-[#1F2A44] bg-[#070B1A]/70 px-6 text-sm font-bold text-[#E5E7EB] transition hover:border-[#3B82F6]/50 hover:bg-[#1F2A44]/50"
                  >
                    Нужна помощь?
                  </a>
                </div>
              </div>

              <div className="rounded-3xl border border-[#1F2A44] bg-[#070B1A] p-3 shadow-xl">
                <div className="mb-3 flex items-center justify-between px-2">
                  <div>
                    <p className="text-sm font-bold text-[#E5E7EB]">
                      Видеоинструкция Karing
                    </p>
                    <p className="text-xs text-[#94A3B8]">
                      Как добавить GLOBAL и STEADY
                    </p>
                  </div>

                  <span className="rounded-full bg-[#22C55E]/10 px-3 py-1 text-xs font-bold text-[#22C55E]">
                    MP4
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-[#1F2A44] bg-black">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                    poster="/assets/welcome.jpg"
                  >
                    <source src="/assets/karing.mp4" type="video/mp4" />
                  </video>
                </div>

                <p className="mt-3 px-2 text-xs leading-5 text-[#94A3B8]">
                  Сначала добавьте GLOBAL MODE, затем STEADY MODE. В сложных сетях
                  используйте STEADY MODE для более стабильной работы.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
