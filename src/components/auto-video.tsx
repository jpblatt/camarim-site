"use client"

import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/components/motion-provider"
import { cn } from "@/lib/utils"

/**
 * Vídeo sem áudio em loop contínuo, que pausa quando sai da tela (economiza bateria no celular).
 * Com "reduzir movimento" ativo, não toca: fica só o poster.
 *
 * No celular o autoplay pode ser recusado (iPhone em modo de economia de energia, Android com
 * economia de dados ou bateria). Nesse caso o play é tentado de novo no primeiro toque ou rolagem.
 */
export function AutoVideo({ src, poster, label, className }: { src: string; poster: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (prefersReducedMotion()) {
      v.autoplay = false
      v.pause()
      v.load() // volta para o poster
      return
    }

    // o navegador só libera o autoplay se o vídeo estiver mudo e inline: garante as propriedades,
    // não só os atributos do HTML
    v.muted = true
    v.defaultMuted = true
    v.playsInline = true
    v.setAttribute("muted", "")
    v.setAttribute("playsinline", "")

    let visible = false
    const tryPlay = () => {
      if (!visible || !v.paused) return
      v.play().catch(() => {
        // recusado: tenta de novo no próximo gesto
        armRetry()
      })
    }

    const gestures = ["touchstart", "pointerdown", "scroll", "keydown"] as const
    const onGesture = () => {
      disarmRetry()
      tryPlay()
    }
    let armed = false
    const armRetry = () => {
      if (armed) return
      armed = true
      gestures.forEach((g) => window.addEventListener(g, onGesture, { passive: true }))
    }
    const disarmRetry = () => {
      if (!armed) return
      armed = false
      gestures.forEach((g) => window.removeEventListener(g, onGesture))
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) tryPlay()
        else v.pause()
      },
      { threshold: 0.15 }
    )
    io.observe(v)

    // se o vídeo ainda não tinha dados quando entrou na tela, tenta assim que puder tocar
    v.addEventListener("canplay", tryPlay)

    return () => {
      io.disconnect()
      disarmRetry()
      v.removeEventListener("canplay", tryPlay)
    }
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className={cn("size-full object-cover", className)}
    />
  )
}
