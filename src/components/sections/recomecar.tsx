"use client"

import { useRef } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { ScriptWord } from "@/components/motion-bits"
import { BrandSymbol } from "@/components/logo"
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion-provider"
import { recomecar, whatsappUrl } from "@/data/site"

/** Projeto Recomeçar 2026: título como na arte e a equipe numa caixa com divisórias. */
export function Recomecar() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from("[data-cap]", {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-rc-title]", start: "top 85%", once: true },
      })
      const rows = gsap.utils.toArray<HTMLElement>("[data-member]")
      rows.forEach((row) => {
        const st = { trigger: row, start: "top 88%", once: true }
        const rule = row.querySelector("[data-rule]")
        if (rule) gsap.from(rule, { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut", scrollTrigger: st })
        gsap.from(row.querySelectorAll("[data-in]"), { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", scrollTrigger: st })
      })
      gsap.to("[data-rc-symbol]", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      })
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      id="recomecar"
      aria-labelledby="recomecar-title"
      className="theme-wine relative isolate overflow-hidden bg-wine px-gutter py-[clamp(96px,13vw,190px)]"
    >
      <BrandSymbol data-rc-symbol className="pointer-events-none absolute top-[6%] -left-[6%] -z-10 h-[90%] w-auto text-wine-deep/60" />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-[6vw]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="recomecar-title" data-rc-title aria-label={`Projeto Recomeçar ${recomecar.year}`} className="relative leading-[.9] font-bold uppercase">
            <span aria-hidden="true" className="block overflow-hidden pb-[.05em]">
              <span data-cap className="block text-[clamp(52px,7.5vw,118px)]">
                Projeto
              </span>
            </span>
            <span aria-hidden="true" className="relative z-10 -mt-[.15em] block pl-[6%] text-[clamp(78px,10vw,160px)] normal-case">
              <ScriptWord className="-rotate-[5deg]">Recomeçar</ScriptWord>
            </span>
            <span aria-hidden="true" className="-mt-[.2em] block overflow-hidden pb-[.05em] text-right">
              <span data-cap className="block text-[clamp(52px,7.5vw,118px)] text-gold-soft">
                {recomecar.year}
              </span>
            </span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-white/90 md:text-xl">{recomecar.lead}</p>
          <div className="mt-8">
            <Button asChild size="pill-lg" variant="gold">
              <a href={whatsappUrl(recomecar.message)} target="_blank" rel="noopener">
                <RollText>Quero saber do projeto</RollText>
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>

        <div>
          <p className="mb-6 text-sm font-bold tracking-[0.22em] text-white/80 uppercase">Uma equipe para o seu protocolo</p>
          <ol className="rounded-[30px] border border-white/55 px-6 md:px-10">
            {recomecar.team.map((m, i) => (
              <li key={m.name} data-member className="relative grid grid-cols-[auto_1fr] gap-x-5 py-7 md:gap-x-8 md:py-9">
                {i < recomecar.team.length - 1 && <span data-rule aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/35" />}
                <span data-in className="pt-1.5 text-sm font-bold text-gold tabular-nums">
                  0{i + 1}
                </span>
                <div>
                  <h3 data-in className="text-[clamp(24px,2.6vw,36px)] leading-tight font-bold">
                    {m.name}
                  </h3>
                  <p data-in className="mt-2 text-[17px] text-white/85 md:text-lg">
                    {m.role}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-[clamp(22px,2.2vw,30px)] leading-snug font-bold">{recomecar.closing}</p>
        </div>
      </div>
    </section>
  )
}
