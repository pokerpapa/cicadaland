import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/redirect_app" },
  robots: { index: false, follow: false, nocache: true },
}

export default function RedirectAppLayout({ children }: { children: React.ReactNode }) {
  return children
}
