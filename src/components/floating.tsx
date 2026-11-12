"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { gsap, useMotion } from "@/components/motion-provider"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { whatsappUrl } from "@/data/site"
import { cn } from "@/lib/utils"

/** Botão flutuante do WhatsApp (dourado), aparece depois do preloader. */
export function WhatsAppFab() {
  const { ready } = useMotion()
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className={cn(
        "fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full border border-wine-deep/10 bg-gold text-wine-deep shadow-[0_12px_30px_-8px_rgb(77_7_29/.55)] transition-transform duration-500 ease-[cubic-bezier(.2,1.4,.4,1)] hover:scale-110 md:right-6 md:bottom-6",
        ready ? "scale-100" : "scale-0"
      )}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  )
}

const FINE_POINTER = "(hover: hover) and (pointer: fine)"
const getFinePointer = () => window.matchMedia(FINE_POINTER).matches
const subscribeFinePointer = (cb: () => void) => {
  const mq = window.matchMedia(FINE_POINTER)
  mq.addEventListener("change", cb)
  return () => mq.removeEventListener("change", cb)
}

/** Cursor em anel (modo "difference": aparece no vinho e no claro). Só em desktop com mouse. */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [big, setBig] = useState(false)
  const enabled = useSyncExternalStore(subscribeFinePointer, getFinePointer, () => false)

  useEffect(() => {
    if (!enabled || !ref.current) return
    const qx = gsap.quickTo(ref.current, "x", { duration: 0.3, ease: "power3" })
    const qy = gsap.quickTo(ref.current, "y", { duration: 0.3, ease: "power3" })
    const move = (e: PointerEvent) => {
      qx(e.clientX)
      qy(e.clientY)
      setBig(!!(e.target as HTMLElement).closest("a, button"))
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [enabled])

  if (!enabled) return null
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[65] mix-blend-difference"
    >
      <div
        className={cn(
          "rounded-full border border-white transition-[width,height,margin,background-color] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]",
          big ? "-mt-6 -ml-6 size-12 bg-white/10" : "-mt-1.5 -ml-1.5 size-3 bg-white"
        )}
      />
    </div>
  )
}
