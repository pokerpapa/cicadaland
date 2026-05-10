import { Header } from "@/components/Header"
import { HeroVideoSection } from "@/components/HeroVideoSection"
import { SiteAccessSection } from "@/components/SiteAccessSection"
import { FaqSection } from "@/components/FaqSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { AppsSection } from "@/components/AppsSection"
import { KeysSection } from "@/components/KeysSection"
import { ReviewsSection } from "@/components/ReviewsSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { BackToTop } from "@/components/BackToTop"
import { FloatingBuyCta } from "@/components/FloatingBuyCta"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070B1A]">
      <Header />
      <HeroVideoSection />
      <SiteAccessSection />
      <FeaturesSection />
      <AppsSection />
      <KeysSection />
      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <FloatingBuyCta />
    </main>
  )
}
