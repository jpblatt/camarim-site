"use client"

import { Fragment, useRef } from "react"
import { BrandSymbol } from "@/components/logo"
import { gsap, prefersReducedMotion, useGSAP, useMotion } from "@/components/motion-provider"
import { marqueeWords } from "@/data/site"

/** Faixa framboesa com palavras em cursiva separadas pelo símbolo. Acelera e inverte com a rolagem. */
export function Marquee() {
  const { lenis } = useMotion()
  const track = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (prefersReducedMotion() || !track.current) return
    const el = track.current
    let x = 0
    let speed = 0.6
    let dir = -1
    const tick = () => {
      const l = lenis.current // lido a cada frame: na montagem o Lenis pode ainda não existir
      if (l && Math.abs(l.velocity) > 0.1) {
        speed = Math.max(speed, 0.6 + Math.min(Math.abs(l.velocity) * 0.35, 8))
        dir = l.direction === -1 ? 1 : -1
      }
      const w = (el.firstElementChild as HTMLElement).offsetWidth
      x += dir * speed
      if (x <= -w) x += w
      if (x > 0) x -= w
      el.style.transform = `translate3d(${x}px,0,0)`
      speed += (0.6 - speed) * 0.04
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  })

  const group = (
    <span className="inline-flex shrink-0 items-center">
      {marqueeWords.map((w) => (
        <Fragment key={w}>
          <span className="px-[.45em]">{w}</span>
          <BrandSymbol className="h-[.62em] w-auto text-gold" />
        </Fragment>
      ))}
    </span>
  )

  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-gold/50 bg-berry py-3 whitespace-nowrap text-white md:py-4">
      <div ref={track} className="inline-flex font-script text-[clamp(44px,6vw,84px)] leading-[1.15] will-change-transform">
        {group}
        {group}
        {group}
      </div>
    </div>
  )
}
