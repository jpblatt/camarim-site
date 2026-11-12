"use client"

import { useRef, useState } from "react"
import { SHIELD_D, SYMBOL_D } from "@/components/logo"
import { gsap, prefersReducedMotion, useGSAP, useMotion } from "@/components/motion-provider"

/** Abertura curta (~1,4 s): o perfil da logo se desenha dentro do escudo e a cortina sobe. */
export function Preloader() {
  const { setReady } = useMotion()
  const root = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(false)

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setDone(true)
        setReady(true)
        return
      }
      const line = root.current!.querySelector<SVGPathElement>("[data-line]")!
      const len = line.getTotalLength()
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })

      gsap
        .timeline({ onComplete: () => setDone(true) })
        .from("[data-shield]", { scale: 0.86, autoAlpha: 0, duration: 0.45, ease: "power3.out", transformOrigin: "50% 50%" })
        .to(line, { strokeDashoffset: 0, duration: 0.65, ease: "power2.inOut" }, 0.1)
        .from("[data-fill]", { autoAlpha: 0, duration: 0.25, ease: "power1.out" }, "-=.2")
        .add(() => setReady(true), "+=.05")
        .to("[data-mark]", { y: -40, autoAlpha: 0, duration: 0.4, ease: "power3.in" }, "<")
        .to(root.current, { yPercent: -100, duration: 0.6, ease: "power4.inOut" }, "<.1")
    },
    { scope: root }
  )

  if (done) return null
  return (
    <div ref={root} aria-hidden="true" className="fixed inset-0 z-[70] grid place-items-center bg-wine-deep">
      <svg data-mark viewBox="58 27 480 557" className="w-[clamp(84px,9vw,120px)] overflow-visible">
        <path data-shield d={SHIELD_D} fill="var(--berry)" />
        <path data-fill d={SYMBOL_D} fill="#fff" />
        <path data-line d={SYMBOL_D} fill="none" stroke="#fff" strokeWidth={5} strokeLinejoin="round" />
      </svg>
    </div>
  )
}
