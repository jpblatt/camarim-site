"use client"

import { useRef } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { ScriptWord } from "@/components/motion-bits"
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion-provider"
import { lavieen, whatsappUrl } from "@/data/site"

/** Lavieen em seção vinho, com a linguagem da arte: caixa alta + cursiva dourada e caixa de borda fina com divisórias. */
export function Lavieen() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from("[data-cap]", {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-lav-title]", start: "top 85%", once: true },
      })
      gsap.from("[data-box]", { y: 40, autoAlpha: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: "[data-box]", start: "top 85%", once: true } })
      gsap.from("[data-benefit]", {
        y: 18,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-box]", start: "top 75%", once: true },
      })
      gsap.from("[data-rule]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        stagger: 0.07,
        ease: "power3.inOut",
        scrollTrigger: { trigger: "[data-box]", start: "top 75%", once: true },
      })
    },
    { scope: root }
  )

  return (
    <section ref={root} id="lavieen" aria-labelledby="lavieen-title" className="theme-wine wine-glow relative overflow-hidden px-gutter py-[clamp(96px,13vw,190px)]">
      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-8 text-sm font-bold tracking-[0.22em] text-white/80 uppercase">Tratamento 02 · laser para a qualidade da pele</p>
        <h2 id="lavieen-title" data-lav-title aria-label={`Lavieen: ${lavieen.title.join(" ")}`} className="relative">
          {lavieen.title.map((line) => (
            <span key={line} aria-hidden="true" className="block overflow-hidden pb-[.06em]">
              <span data-cap className="block text-[clamp(30px,5.2vw,78px)] leading-[1] font-bold tracking-[0.01em] uppercase">
                {line}
              </span>
            </span>
          ))}
          <span aria-hidden="true" className="relative z-10 -mt-[.32em] block text-[clamp(96px,15vw,240px)] max-md:mt-0">
            <ScriptWord className="-rotate-[6deg]">Lavieen</ScriptWord>
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">{lavieen.intro}</p>
      </div>

      <div data-box className="mx-auto mt-14 max-w-5xl rounded-[30px] border border-white/55 px-6 py-4 md:mt-20 md:px-12 md:py-8">
        <ul className="grid md:grid-cols-2 md:gap-x-14">
          {lavieen.benefits.map((b) => (
            <li key={b} data-benefit className="relative py-5 text-[17px] font-semibold md:py-6 md:text-xl">
              <span data-rule aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-white/30" />
              {b}
            </li>
          ))}
        </ul>
        <p className="py-6 text-center text-[17px] text-white/90 md:text-lg">{lavieen.personal}</p>
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center gap-6 text-center">
        <Button asChild size="pill-lg" variant="gold">
          <a href={whatsappUrl(lavieen.message)} target="_blank" rel="noopener">
            <RollText>Agendar avaliação</RollText>
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </Button>
        <p className="text-sm text-white/80">{lavieen.disclaimer}</p>
      </div>
    </section>
  )
}
