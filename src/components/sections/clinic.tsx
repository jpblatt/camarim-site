"use client"

import { useRef } from "react"
import { BrandHeading } from "@/components/motion-bits"
import { InstagramIcon } from "@/components/whatsapp-icon"
import { SHIELD_D, SYMBOL_D } from "@/components/logo"
import { SplitText, gsap, prefersReducedMotion, useGSAP } from "@/components/motion-provider"
import { brand, images, owner } from "@/data/site"

const MANIFESTO =
  "A Camarim é uma clínica de estética personalizada, com spa e saúde integrada no mesmo endereço. Aqui, cada tratamento começa por uma conversa sobre a sua pele, a sua rotina e o que você espera, e é a partir dela que o protocolo é montado."

export function Clinic() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      // texto que acende palavra por palavra conforme a rolagem (referência: Rafaela Salvato)
      let split: SplitText | null = null
      let cancelled = false
      document.fonts.ready.then(() => {
        if (cancelled) return
        split = SplitText.create("[data-manifesto]", {
          type: "words",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.22 },
              {
                opacity: 1,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: { trigger: "[data-manifesto]", start: "top 80%", end: "bottom 45%", scrub: 0.6 },
              }
            )
          },
        })
      })
      // escudo com o perfil: a linha se desenha e a moldura sobe
      const line = root.current!.querySelector<SVGPathElement>("[data-portrait-line]")!
      const len = line.getTotalLength()
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len })
      const st = { trigger: "[data-portrait]", start: "top 80%", once: true }
      gsap.from("[data-portrait]", { y: 60, autoAlpha: 0, duration: 1.2, ease: "power3.out", scrollTrigger: st })
      gsap.to(line, { strokeDashoffset: 0, duration: 2.4, delay: 0.3, ease: "power2.inOut", scrollTrigger: st })
      return () => {
        cancelled = true
        split?.revert()
      }
    },
    { scope: root }
  )

  return (
    <section ref={root} id="clinica" aria-labelledby="clinica-title" className="bg-blush px-gutter py-[clamp(96px,13vw,190px)]">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        {/* retrato no formato do escudo da logo. Sem foto ainda: o perfil em linha ocupa o lugar */}
        <div className="lg:col-span-5">
          <figure data-portrait className="relative mx-auto w-[78%] max-w-[420px]">
            <svg viewBox="58 27 480 557" className="w-full" role="img" aria-label={`Espaço para a foto da ${owner.name}`}>
              <defs>
                <clipPath id="shield-clip">
                  <path d={SHIELD_D} />
                </clipPath>
              </defs>
              {images.ownerPhoto ? (
                <image href={images.ownerPhoto} x="58" y="27" width="480" height="557" preserveAspectRatio="xMidYMid slice" clipPath="url(#shield-clip)" />
              ) : (
                <>
                  <path d={SHIELD_D} fill="var(--berry)" />
                  <path d={SYMBOL_D} fill="var(--wine)" opacity={0.55} />
                  <path data-portrait-line d={SYMBOL_D} fill="none" stroke="#fff" strokeWidth={2.2} strokeLinejoin="round" />
                </>
              )}
            </svg>
            <figcaption className="mt-6 text-center">
              <span className="block text-sm font-bold tracking-[0.2em] text-wine-deep uppercase">{owner.name}</span>
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7">
          <BrandHeading id="clinica-title" caps={["A clínica e a"]} script="Dra. Luisa" tone="berry" className="text-wine-deep" />
          <p data-manifesto className="mt-10 text-[clamp(22px,2.3vw,34px)] leading-[1.35] font-semibold text-wine-deep">
            {MANIFESTO}
          </p>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-muted-foreground md:text-lg">
            A Camarim é assinada pela {owner.name}. Acompanhe a clínica e a Dra. Luisa no Instagram.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-bold">
            <a href={brand.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-berry underline-offset-4 hover:underline">
              <InstagramIcon className="size-4" /> {brand.instagramHandle}
            </a>
            <a href={owner.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-berry underline-offset-4 hover:underline">
              <InstagramIcon className="size-4" /> {owner.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
