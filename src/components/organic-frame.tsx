"use client"

import { useRef } from "react"
import { useDraw } from "@/components/motion-bits"
import { cn } from "@/lib/utils"

// Moldura 4:5 com um canto bem arredondado. O raio em % casa com o path do SVG (grade 400 × 500).
const RADIUS = "7% 45% 7% 7% / 5.6% 36% 5.6% 5.6%"
const RADIUS_FLIP = "45% 7% 7% 7% / 36% 5.6% 5.6% 5.6%"
const FRAME_D = "M28 0H220A180 180 0 0 1 400 180V472A28 28 0 0 1 372 500H28A28 28 0 0 1 0 472V28A28 28 0 0 1 28 0Z"

/**
 * Foto em moldura orgânica com uma linha fina deslocada que se desenha ao entrar na tela
 * (técnica da Rafaela Salvato, com a cor da marca).
 */
export function OrganicFrame({
  children,
  className,
  flip = false,
  line = "var(--berry)",
  offset = 14,
}: {
  children: React.ReactNode
  className?: string
  flip?: boolean
  line?: string
  offset?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useDraw(ref, { duration: 2, start: "top 85%" })
  return (
    <div ref={ref} className={cn("relative aspect-[4/5]", className)}>
      <svg
        aria-hidden="true"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
        style={{ transform: `translate(${flip ? -offset : offset}px, ${offset}px)${flip ? " scaleX(-1)" : ""}` }}
      >
        <path data-draw d={FRAME_D} fill="none" stroke={line} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="relative size-full overflow-hidden" style={{ borderRadius: flip ? RADIUS_FLIP : RADIUS }}>
        {children}
      </div>
    </div>
  )
}
