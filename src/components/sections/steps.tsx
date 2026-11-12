"use client"

import { useRef } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { BrandHeading } from "@/components/motion-bits"
import { BrandSymbol } from "@/components/logo"
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion-provider"
import { steps, whatsappUrl } from "@/data/site"

/** Passo a passo da avaliação. Um fio framboesa acompanha a rolagem e acende cada etapa. */
export function Steps() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const mm = gsap.matchMedia()
      mm.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)" }, (ctx) => {
        const desktop = ctx.conditions?.desktop
        gsap.fromTo(
          "[data-progress]",
          desktop ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(desktop ? { scaleX: 1 } : { scaleY: 1 }),
            ease: "none",
            scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 60%", scrub: 0.6 },
          }
        )
      })
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-in]"), {
          y: 26,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        })
        gsap.fromTo(
          el.querySelector("[data-dot]"),
          { scale: 0.4, backgroundColor: "#ffffff" },
          { scale: 1, backgroundColor: "#a01038", duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: el, start: "top 65%", once: true } }
        )
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section ref={root} id="avaliacao" aria-labelledby="avaliacao-title" className="bg-white px-gutter py-[clamp(96px,13vw,190px)]">
      <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
        <BrandHeading id="avaliacao-title" caps={["Como funciona a"]} script="avaliação" tone="berry" className="text-wine-deep" />
        <p className="max-w-sm text-[17px] leading-relaxed text-muted-foreground">
          A primeira visita é para conhecer você. O tratamento é decidido depois, com calma e com as informações na mesa.
        </p>
      </div>

      <div data-steps className="relative">
        {/* trilho e progresso: horizontal no desktop, vertical no celular */}
        <span aria-hidden="true" className="absolute top-[11px] bottom-0 left-[11px] w-px bg-wine/15 lg:top-[11px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
        <span
          data-progress
          aria-hidden="true"
          className="absolute top-[11px] bottom-0 left-[11px] w-px origin-top bg-berry lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:origin-left"
        />
        <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-10">
          {steps.map((s) => (
            <li key={s.n} data-step className="relative pl-12 lg:pt-14 lg:pl-0">
              <span
                data-dot
                aria-hidden="true"
                className="absolute top-0 left-0 grid size-[23px] place-items-center rounded-full border border-berry bg-berry"
              >
                <BrandSymbol className="h-3 w-auto text-white" />
              </span>
              <span data-in className="block text-sm font-bold text-berry tabular-nums">
                {s.n}
              </span>
              <h3 data-in className="mt-2 text-[clamp(26px,2.4vw,34px)] font-bold text-wine-deep">
                {s.title}
              </h3>
              <p data-in className="mt-3 max-w-xs text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 md:mt-20">
        <Button asChild size="pill-lg" variant="berry">
          <a href={whatsappUrl()} target="_blank" rel="noopener">
            <RollText>Marcar minha avaliação</RollText>
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </Button>
      </div>
    </section>
  )
}
