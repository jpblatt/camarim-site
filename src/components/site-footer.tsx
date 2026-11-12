"use client"

import { useRef } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { ScriptWord } from "@/components/motion-bits"
import { Logo } from "@/components/logo"
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion-provider"
import { address, brand, navLinks, owner, whatsappUrl } from "@/data/site"

/** Chamada final + rodapé com o nome gigante (o letreiro da logo, em dourado, que se desenha). */
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from("[data-cap]", {
        yPercent: 115,
        duration: 1.1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-cta]", start: "top 80%", once: true },
      })
      const letters = gsap.utils.toArray<SVGPathElement>("[data-big] [data-letter]")
      letters.forEach((p) => {
        const len = p.getTotalLength()
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
      })
      const st = { trigger: "[data-big]", start: "top 95%", end: "bottom bottom", scrub: 0.8 }
      gsap.to(letters, { strokeDashoffset: 0, stagger: 0.12, ease: "none", scrollTrigger: st })
      gsap.from("[data-big] [data-tail]", { autoAlpha: 0, x: -30, ease: "none", scrollTrigger: st })
    },
    { scope: ref }
  )

  return (
    <footer ref={ref} className="theme-wine wine-glow overflow-hidden px-gutter pt-[clamp(96px,13vw,180px)] pb-8">
      {/* chamada final */}
      <div data-cta className="mx-auto max-w-5xl text-center">
        <h2 aria-label="Agende sua avaliação na Camarim" className="leading-[.92] font-bold uppercase">
          <span aria-hidden="true" className="block overflow-hidden pb-[.05em]">
            <span data-cap className="block text-[clamp(44px,7.4vw,118px)]">
              Agende sua
            </span>
          </span>
          <span aria-hidden="true" className="block overflow-hidden pb-[.05em]">
            <span data-cap className="block text-[clamp(44px,7.4vw,118px)]">
              avaliação
            </span>
          </span>
          <span aria-hidden="true" className="relative z-10 -mt-[.25em] block text-[clamp(70px,10vw,160px)] normal-case">
            <ScriptWord className="-rotate-[4deg]">na Camarim</ScriptWord>
          </span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-lg text-white/90">
          Conte pelo WhatsApp o que você gostaria de cuidar.
        </p>
        <Button asChild size="pill-lg" variant="gold" className="mt-9">
          <a href={whatsappUrl()} target="_blank" rel="noopener">
            <RollText>Chamar no WhatsApp</RollText>
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </Button>
      </div>

      {/* rodapé */}
      <div className="mt-[clamp(96px,12vw,160px)] grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/20 pt-14 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div className="col-span-full lg:col-span-1">
          <Logo tone="white" className="h-auto w-[230px] text-white" />
          <p className="mt-6 max-w-xs text-[15px] text-white/80">
            {brand.bio}. {brand.motto}.
          </p>
        </div>
        <nav aria-label="Rodapé">
          <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-white/70 uppercase">Navegar</h3>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-white/70 uppercase">Contato</h3>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener" className="transition-colors hover:text-gold">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={brand.instagram} target="_blank" rel="noopener" className="transition-colors hover:text-gold">
                Instagram da clínica
              </a>
            </li>
            <li>
              <a href={owner.instagram} target="_blank" rel="noopener" className="transition-colors hover:text-gold">
                Instagram da Dra. Luisa
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-full sm:col-span-1">
          <h3 className="mb-4 text-xs font-bold tracking-[0.2em] text-white/70 uppercase">Endereço</h3>
          <a href={address.maps} target="_blank" rel="noopener" className="transition-colors hover:text-gold">
            {address.street}
          </a>
        </div>
      </div>

      {/* nome gigante: o letreiro da logo, com a perna longa do R */}
      <div data-big aria-hidden="true" className="mt-12 text-gold">
        <Logo variant="wordmark" className="h-auto w-full" />
      </div>

      <div className="mt-8 flex flex-wrap justify-between gap-3 pr-16 text-[13px] text-white/70 md:pr-20">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {brand.fullName}
        </span>
        <a href="#top" className="hover:text-gold">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}
