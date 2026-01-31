"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/30 hover:bg-[#2563EB] hover:shadow-[#3B82F6]/50 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      aria-label={t("common.backToTop")}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
