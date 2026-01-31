"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Zap, ChevronDown, Key, Shield, Smartphone, RefreshCw } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function HeroVideoSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useTranslation()

  const trustChips = [
    { icon: Shield, label: t("hero.trust.protocol") },
    { icon: Smartphone, label: t("hero.trust.platforms") },
    { icon: RefreshCw, label: t("hero.trust.servers") },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      alpha: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.alpha})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80"
          poster="/assets/welcome.jpg"
        >
          <source src="/assets/header.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay Gradient - Lightened to show more video */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B1A]/40 via-transparent to-[#070B1A]/80" />
      </div>

      {/* Animated Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A78BFA]/10 rounded-full blur-[120px] z-0" />

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 sm:py-2.5 rounded-2xl sm:rounded-full bg-[#1F2A44]/40 border border-[#1F2A44]/50 mb-8 max-w-[95%] sm:max-w-none backdrop-blur-md hover:bg-[#1F2A44]/60 transition-colors cursor-default">
          <div className="shrink-0">
            <span className="relative flex h-2 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#22C55E]" />
            </span>
          </div>
          <span className="text-[10px] sm:text-sm font-medium text-[#E5E7EB]/90 leading-tight text-left">
            {t("hero.badge")}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#E5E7EB] tracking-tight mb-8">
          <span className="block mb-2 text-balance leading-[1.1]">
            {t("hero.title1")}
          </span>
          <span className="bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#A78BFA] bg-clip-text text-transparent animate-gradient-x">
            {t("hero.title2")}
          </span>
        </h1>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-7 text-lg rounded-2xl shadow-xl shadow-[#3B82F6]/25 hover:shadow-[#3B82F6]/40 transition-all hover:scale-[1.02] active:scale-95"
          >
            <a href="https://t.me/PROVPN_SecureBot" target="_blank" rel="noopener noreferrer">
              <Zap className="w-5 h-5 mr-3" />
              {t("hero.ctaStart")}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-[#1F2A44] bg-[#0B1026]/40 hover:bg-[#1F2A44]/40 text-[#E5E7EB] font-semibold px-8 py-7 text-lg rounded-2xl backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-95"
          >
            <a href="#apps">{t("hero.ctaView")}</a>
          </Button>
        </div>

        {/* Trust Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
          {trustChips.map((chip, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0B1026]/40 border border-[#1F2A44]/50 backdrop-blur-md hover:border-[#3B82F6]/30 transition-all group"
            >
              <chip.icon className="w-4 h-4 text-[#3B82F6] group-hover:scale-110 transition-transform" />
              <span className="text-[12px] sm:text-sm text-[#94A3B8] font-medium">{chip.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
          <ChevronDown className="w-6 h-6 text-[#94A3B8] opacity-50" />
        </div>
      </div>
    </section>
  )
}
