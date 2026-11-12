"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Mapa do Google incorporado (sem chave de API).
 * O iframe só recebe o mouse depois de um clique: assim a roda do mouse e o toque continuam rolando
 * a página (Lenis) quando passam por cima do mapa. Sair do mapa ou clicar fora devolve a rolagem.
 */
export function MapEmbed({ src, title, className }: { src: string; title: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!active) return
    const off = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setActive(false)
    }
    document.addEventListener("pointerdown", off)
    return () => document.removeEventListener("pointerdown", off)
  }, [active])

  return (
    <div ref={ref} onMouseLeave={() => setActive(false)} className={cn("absolute inset-0", className)}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        data-lenis-prevent
        className={cn("absolute inset-0 size-full border-0", !active && "pointer-events-none")}
      />
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label="Ativar o mapa para mover e dar zoom"
          className="absolute inset-0 size-full cursor-pointer"
        />
      )}
    </div>
  )
}
