import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: { canonical: "/connect" },
  robots: { index: false, follow: false, nocache: true },
}

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return children
}
