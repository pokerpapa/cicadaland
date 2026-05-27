export function scrollToBuy() {
  if (typeof window === "undefined") return

  const target =
    document.getElementById("get-vpn") ||
    document.getElementById("site-email-input")

  if (!target) return

  const headerOffset = window.innerWidth < 768 ? 88 : 104
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: "smooth",
  })

  window.setTimeout(() => {
    const input = document.getElementById(
      "site-email-input"
    ) as HTMLInputElement | null

    input?.focus({ preventScroll: true })

    const card = document.getElementById("get-vpn")
    card?.classList.add("buy-card-highlight")

    window.setTimeout(() => {
      card?.classList.remove("buy-card-highlight")
    }, 2200)
  }, 650)
}
