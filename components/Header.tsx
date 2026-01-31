"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Zap, Menu, X, Languages } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import Image from "next/image"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t, language, setLanguage } = useTranslation()

  const navLinks = [
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#features", label: t("nav.features") },
    { href: "#apps", label: t("nav.apps") },
    { href: "#reviews", label: t("nav.reviews") },
  ]

  const countryFlags = ["us", "gb", "de", "fr", "jp", "sg", "ca", "au"]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#070B1A]/80 backdrop-blur-xl border-b border-[#1F2A44]"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#3B82F6]/20 blur-lg rounded-full group-hover:bg-[#3B82F6]/30 transition-colors" />
              <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-[#1F2A44] bg-[#0B1026]">
                <Image
                  src="/assets/welcome.jpg"
                  alt="PROVPN Logo"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <span className="text-xl font-bold text-[#E5E7EB] tracking-tight">
              PRO<span className="text-[#3B82F6]">VPN</span>
            </span>
            {/* Country Flags - Global Presence */}
            <div className="flex items-center gap-1.5 sm:gap-2 ml-2 sm:ml-4 opacity-80 bg-[#1F2A44]/30 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#1F2A44]/50">
              {countryFlags.map((code, index) => (
                <div
                  key={code}
                  className={`relative w-4 h-3 sm:w-5 sm:h-3.5 overflow-hidden rounded-sm hover:scale-110 transition-transform shadow-sm ${index > 3 ? "hidden sm:block" : ""}`}
                  title={code.toUpperCase()}
                >
                  <img
                    src={`https://flagcdn.com/w40/${code}.png`}
                    srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
                    alt={code}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <span className="text-[9px] sm:text-[10px] text-[#94A3B8] ml-0.5 sm:ml-1 font-medium">+24</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-[#94A3B8] hover:text-[#E5E7EB] transition-colors rounded-lg hover:bg-[#1F2A44]/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Lang Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#E5E7EB] transition-colors rounded-lg border border-[#1F2A44] hover:bg-[#1F2A44]/50 uppercase"
            >
              <Languages className="w-4 h-4" />
              {language}
            </button>
            <Button
              asChild
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium px-5 py-2 rounded-xl shadow-lg shadow-[#3B82F6]/25 hover:shadow-[#3B82F6]/40 transition-all"
            >
              <a href="https://t.me/PROVPN_SecureBot" target="_blank" rel="noopener noreferrer">
                <Zap className="w-4 h-4 mr-2" />
                {t("nav.openBot")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 text-[#94A3B8] hover:text-[#E5E7EB] transition-colors uppercase font-medium text-xs"
            >
              {language}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#94A3B8] hover:text-[#E5E7EB] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0B1026]/98 backdrop-blur-2xl border-b border-[#1F2A44] animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col px-6 py-8 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-4 text-lg font-medium text-[#94A3B8] hover:text-[#3B82F6] transition-all rounded-xl hover:bg-[#3B82F6]/5 active:scale-95"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-[#1F2A44] my-4 mx-4" />
            <Button
              asChild
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-2xl h-14 text-lg shadow-lg shadow-[#3B82F6]/20 transition-all active:scale-95"
            >
              <a href="https://t.me/PROVPN_SecureBot" target="_blank" rel="noopener noreferrer">
                <Zap className="w-5 h-5 mr-3" />
                {t("nav.openBot")}
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
