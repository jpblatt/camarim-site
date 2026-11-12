"use client"

import { useRef } from "react"
import { ScrollTrigger, SplitText, gsap, prefersReducedMotion, useGSAP, useMotion } from "@/components/motion-provider"
import { cn } from "@/lib/utils"

/**
 * Título com reveal por linhas (SplitText com máscara), dividido só depois que as fontes carregam.
 * `onReady`: em vez de esperar a rolagem, anima quando o preloader termina (para o hero).
 */
export function SplitLines({
  as: Tag = "h2",
  children,
  className,
  onReady = false,
  id,
}: {
  as?: "h1" | "h2" | "h3" | "p"
  children: React.ReactNode
  className?: string
  onReady?: boolean
  id?: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const { ready } = useMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion() || (onReady && !ready)) return
      const el = ref.current
      if (!el) return
      let split: SplitText | null = null
      let cancelled = false
      document.fonts.ready.then(() => {
        if (cancelled) return
        split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.1,
              stagger: 0.09,
              ease: "power4.out",
              ...(onReady ? { delay: 0.15 } : { scrollTrigger: { trigger: el, start: "top 88%", once: true } }),
            })
          },
        })
      })
      return () => {
        cancelled = true
        split?.revert()
      }
    },
    { dependencies: [ready] }
  )

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  )
}

/**
 * Palavra em cursiva que se revela da esquerda para a direita.
 * Só transform: a moldura anda para a direita e o texto, em sentido contrário, fica parado.
 */
export function ScriptWord({
  children,
  className,
  tone = "gold",
  onReady = false,
  delay = 0,
}: {
  children: string
  className?: string
  tone?: "gold" | "berry" | "white"
  onReady?: boolean
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const { ready } = useMotion()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.set("[data-wipe-a]", { xPercent: -101 })
      gsap.set("[data-wipe-b]", { xPercent: 101 })
      if (onReady && !ready) return
      const vars = { xPercent: 0, duration: 1.5, ease: "power2.inOut", delay }
      const st = onReady ? {} : { scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } }
      gsap.to("[data-wipe-a]", { ...vars, ...st })
      gsap.to("[data-wipe-b]", { ...vars, ...st })
    },
    { scope: ref, dependencies: [ready] }
  )

  return (
    <span
      ref={ref}
      className={cn(
        // folga em volta: as laçadas da cursiva passam da caixa da letra
        "-mx-[.35em] -my-[.3em] inline-block overflow-hidden px-[.35em] py-[.3em] align-baseline font-script leading-none",
        tone === "berry" && "text-berry",
        tone === "white" && "text-white",
        className
      )}
    >
      <span data-wipe-a className="inline-block will-change-transform">
        <span data-wipe-b className={cn("inline-block pr-[.1em] will-change-transform", tone === "gold" && "text-gold")}>
          {children}
        </span>
      </span>
    </span>
  )
}

/**
 * Título no estilo das artes: caixa alta pesada + uma palavra em cursiva cruzando a última linha.
 * As linhas sobem por trás de uma máscara; a cursiva se revela da esquerda para a direita.
 */
export function BrandHeading({
  id,
  caps,
  script,
  tone = "gold",
  className,
  scriptClassName,
  align = "left",
}: {
  id?: string
  caps: string[]
  script: string
  tone?: "gold" | "berry" | "white"
  className?: string
  scriptClassName?: string
  align?: "left" | "center"
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from("[data-cap]", {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      })
    },
    { scope: ref }
  )
  return (
    <h2
      ref={ref}
      id={id}
      aria-label={`${caps.join(" ")} ${script}`}
      className={cn(
        "text-[clamp(40px,6.4vw,104px)] leading-[.92] font-bold tracking-[0.01em] uppercase",
        align === "center" && "text-center",
        className
      )}
    >
      {caps.map((c) => (
        <span key={c} aria-hidden="true" className="block overflow-hidden pb-[.05em]">
          <span data-cap className="block will-change-transform">
            {c}
          </span>
        </span>
      ))}
      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 -mt-[.3em] block text-[1.35em] normal-case",
          align === "center" ? "text-center" : "pl-[12%]",
          scriptClassName
        )}
      >
        <ScriptWord tone={tone} className="-rotate-[4deg]">
          {script}
        </ScriptWord>
      </span>
    </h2>
  )
}

/** Entrada suave (y + opacidade) de filhos marcados com [data-rise], em lote. */
export function Rise({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const items = gsap.utils.toArray<HTMLElement>("[data-rise]")
      gsap.set(items, { y: 28, autoAlpha: 0 })
      // um único observador para a lista inteira
      ScrollTrigger.batch(items, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", overwrite: true }),
      })
    },
    { scope: ref }
  )
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/**
 * Traço SVG que se desenha (strokeDashoffset a partir do comprimento real do path).
 * Marque os paths com [data-draw] dentro do escopo.
 */
export function useDraw(
  scope: React.RefObject<HTMLElement | SVGSVGElement | null>,
  opts: { trigger?: "scroll" | "ready"; duration?: number; delay?: number; scrub?: boolean; start?: string } = {}
) {
  const { ready } = useMotion()
  const { trigger = "scroll", duration = 1.8, delay = 0, scrub = false, start = "top 80%" } = opts
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const paths = gsap.utils.toArray<SVGGeometryElement>("[data-draw]", scope.current)
      paths.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })
      if (trigger === "ready" && !ready) return
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration,
        delay,
        ease: scrub ? "none" : "power2.inOut",
        ...(trigger === "scroll"
          ? { scrollTrigger: scrub ? { trigger: scope.current, start, end: "bottom 60%", scrub: 1 } : { trigger: scope.current, start, once: true } }
          : {}),
      })
    },
    { scope, dependencies: [ready] }
  )
}
