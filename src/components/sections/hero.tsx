"use client"

import { useRef } from "react"
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { ScriptWord, useDraw } from "@/components/motion-bits"
import { SYMBOL_D, Wordmark } from "@/components/logo"
import { gsap, prefersReducedMotion, useGSAP, useMotion } from "@/components/motion-provider"
import { address, brand, whatsappUrl } from "@/data/site"

export function Hero() {
  const { ready } = useMotion()
  const root = useRef<HTMLElement>(null)
  const art = useRef<HTMLDivElement>(null)
  useDraw(art, { trigger: "ready", duration: 2.2, delay: 0.1 })

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // o letreiro da logo se desenha letra por letra; a perna do R entra por último
      const letters = gsap.utils.toArray<SVGPathElement>("[data-hero-name] [data-letter]")
      letters.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })
      gsap.set("[data-hero-name] [data-tail]", { autoAlpha: 0, x: -24 })
      gsap.set("[data-hero-copy]", { y: 26, autoAlpha: 0 })
      gsap.set("[data-hero-fill]", { autoAlpha: 0, scale: 1.06 })
      if (!ready) return

      gsap
        .timeline()
        .to(letters, { strokeDashoffset: 0, duration: 1.25, stagger: 0.09, ease: "power2.inOut" })
        .to("[data-hero-name] [data-tail]", { autoAlpha: 1, x: 0, duration: 0.9, ease: "power3.out" }, 0.95)
        .to("[data-hero-fill]", { autoAlpha: 1, scale: 1, duration: 2, ease: "power2.out" }, 0)
        .to("[data-hero-copy]", { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" }, 0.7)

      // parallax ao rolar
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true }
      gsap.to("[data-hero-art]", { yPercent: 18, ease: "none", scrollTrigger: st })
      gsap.to("[data-hero-title]", { yPercent: -18, ease: "none", scrollTrigger: st })
    },
    { scope: root, dependencies: [ready] }
  )

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      className="theme-wine wine-glow relative isolate flex min-h-[640px] flex-col justify-end overflow-hidden px-gutter pt-36 pb-10 md:h-svh md:min-h-[720px] md:pb-14"
    >
      {/* símbolo gigante: preenchimento vinho + linha dourada deslocada que se desenha */}
      <div
        ref={art}
        data-hero-art
        aria-hidden="true"
        className="pointer-events-none absolute top-[-4%] right-[-30%] -z-10 h-[92%] sm:right-[-8%] md:top-[-8%] md:right-[2%] md:h-[112%]"
      >
        <svg viewBox="184 72 236 484" className="h-full w-auto overflow-visible">
          <path data-hero-fill d={SYMBOL_D} fill="var(--wine)" opacity={0.85} />
          <path
            data-draw
            d={SYMBOL_D}
            transform="translate(9 7)"
            fill="none"
            stroke="var(--gold)"
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
            opacity={0.9}
          />
        </svg>
      </div>

      <div className="relative">
        <p data-hero-copy className="mb-5 text-sm font-bold tracking-[0.22em] text-white/85 uppercase md:mb-7">
          {brand.bio}
          <span className="max-md:hidden"> · {brand.tagline}</span>
        </p>

        <h1 id="hero-title" data-hero-title aria-label={`${brand.name}: ${brand.motto.toLowerCase()}`} className="relative">
          {/* as mesmas letras em traço da logo, na mesma proporção de espessura */}
          <Wordmark data-hero-name role="img" aria-label="Camarim" className="block h-auto w-full max-w-[1240px] text-white" />
          <span
            aria-hidden="true"
            className="relative -mt-[.7em] ml-[10%] flex items-baseline gap-[.25em] text-[clamp(64px,11.5vw,190px)] max-md:-mt-[.34em] max-md:ml-[4%]"
          >
            <span data-hero-copy className="text-[clamp(13px,1.15vw,18px)] font-bold tracking-[0.2em] text-white uppercase max-sm:hidden">
              sinta o poder do
            </span>
            <ScriptWord onReady delay={0.55} className="-rotate-[5deg]">
              autocuidado
            </ScriptWord>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[minmax(0,34rem)_1fr] md:items-end">
          <div>
            <p data-hero-copy className="max-w-[28rem] text-[17px] leading-relaxed text-white/90 md:text-lg">
              Estética, spa e uma equipe de saúde integrada. Cada tratamento começa por uma avaliação feita para a sua pele e a
              sua rotina.
            </p>
            <div data-hero-copy className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="pill-lg" variant="gold">
                <a href={whatsappUrl()} target="_blank" rel="noopener">
                  <RollText>Agendar avaliação</RollText>
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
              <Button asChild size="pill-lg" variant="ghostLight">
                <a href="#tratamentos">
                  <RollText>Ver tratamentos</RollText>
                </a>
              </Button>
            </div>
          </div>

          <div data-hero-copy className="flex items-end justify-between gap-6 text-sm text-white/80 md:justify-end md:gap-10 md:pr-20">
            <a href="#contato" className="transition-colors hover:text-gold">
              {address.street}
            </a>
            <a href="#tratamentos" aria-label="Rolar para os tratamentos" className="hidden items-center gap-2 transition-colors hover:text-gold md:flex">
              Role <ArrowDownIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
