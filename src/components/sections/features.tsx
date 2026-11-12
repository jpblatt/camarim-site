"use client"

import { useRef } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { AutoVideo } from "@/components/auto-video"
import { BrandHeading, Rise } from "@/components/motion-bits"
import { OrganicFrame } from "@/components/organic-frame"
import { gsap, prefersReducedMotion, useGSAP } from "@/components/motion-provider"
import { images, labial, laser, owner, whatsappUrl } from "@/data/site"

/** Foto revelada de baixo para cima com um zoom leve, só com transform. */
function useRevealMedia(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.utils.toArray<HTMLElement>("[data-media]").forEach((el) => {
        const inner = el.querySelector("img, video")
        const st = { trigger: el, start: "top 85%", once: true }
        gsap.from(el, { yPercent: 12, autoAlpha: 0, duration: 1.2, ease: "power3.out", scrollTrigger: st })
        if (inner) gsap.from(inner, { scale: 1.18, duration: 1.8, ease: "power3.out", scrollTrigger: st })
      })
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        gsap.to(el, { yPercent: -14, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } })
      })
    },
    { scope }
  )
}

/** Preenchimento labial e remoção de pelos a laser: dois blocos editoriais espelhados. */
export function Features() {
  const root = useRef<HTMLElement>(null)
  useRevealMedia(root)

  return (
    <section ref={root} aria-label="Preenchimento labial e remoção de pelos a laser" className="overflow-hidden bg-white px-gutter py-[clamp(96px,13vw,190px)]">
      {/* 01 · preenchimento labial */}
      <article id="labial" aria-labelledby="labial-title" className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <p className="mb-6 text-sm font-bold tracking-[0.22em] text-muted-foreground uppercase">Tratamento 01</p>
          <BrandHeading id="labial-title" caps={["Preenchimento"]} script="labial" tone="berry" className="text-[clamp(32px,4.4vw,72px)] text-wine-deep" />
          <Rise className="mt-8 max-w-md">
            <p data-rise className="text-[17px] leading-relaxed text-muted-foreground md:text-lg">
              Planejado na avaliação, considerando o formato da boca e a proporção do rosto. As fotos são de procedimentos realizados pela{" "}
              <a href={owner.instagram} target="_blank" rel="noopener" className="font-bold text-berry underline-offset-4 hover:underline">
                {labial.credit}
              </a>
              .
            </p>
            <div data-rise className="mt-8">
              <Button asChild size="pill-lg" variant="berry">
                <a href={whatsappUrl(labial.message)} target="_blank" rel="noopener">
                  <RollText>Agendar avaliação</RollText>
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </Rise>
        </div>

        <div className="relative lg:col-span-6 lg:pl-[4%]">
          <div data-media className="ml-auto w-[78%] max-w-[480px] max-sm:w-[86%]">
            <OrganicFrame>
              <img
                src={images.labial1}
                srcSet={`${images.labial1Small} 480w, ${images.labial1} 688w`}
                sizes="(min-width: 1024px) 34vw, 80vw"
                alt="Lábios após preenchimento labial, vistos de perfil"
                loading="lazy"
                className="size-full object-cover"
              />
            </OrganicFrame>
          </div>
          {/* segunda foto em forma de escudo, o formato da logo */}
          <div data-parallax className="absolute bottom-[-8%] left-0 w-[42%] max-w-[250px] max-sm:w-[46%]">
            <div data-media className="aspect-[4/5] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_82%,50%_100%,0_82%)]">
              <img
                src={images.labial2Small}
                alt="Outro ângulo dos lábios após o preenchimento"
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>
      </article>

      <div className="h-[clamp(120px,16vw,220px)]" aria-hidden="true" />

      {/* 03 · laser */}
      <article id="laser" aria-labelledby="laser-title" className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 lg:order-1 lg:col-span-6">
          <div data-media className="mx-auto w-[82%] max-w-[420px] lg:mr-[12%] lg:ml-auto">
            <OrganicFrame flip line="var(--gold)">
              <AutoVideo src={images.laserVideo} poster={images.laserPoster} label={laser.videoLabel} />
            </OrganicFrame>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6">
          <p className="mb-6 text-sm font-bold tracking-[0.22em] text-muted-foreground uppercase">Tratamento 03</p>
          <BrandHeading id="laser-title" caps={["Remoção", "de pelos"]} script="a laser" tone="berry" className="text-wine-deep" />
          <Rise className="mt-8 max-w-lg">
            <p data-rise className="text-[17px] leading-relaxed text-muted-foreground md:text-lg">
              Depilação a laser feita na própria clínica. Algumas das áreas atendidas:
            </p>
            <ul data-rise className="mt-7 rounded-[24px] border border-wine/25 px-6">
              {laser.areas.map((a) => (
                <li key={a} className="border-b border-wine/15 py-4 text-lg font-bold text-wine-deep last:border-none">
                  {a}
                </li>
              ))}
            </ul>
            <div data-rise className="mt-8">
              <Button asChild size="pill-lg" variant="berry">
                <a href={whatsappUrl(laser.message)} target="_blank" rel="noopener">
                  <RollText>Consultar valores no WhatsApp</RollText>
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </Rise>
        </div>
      </article>
    </section>
  )
}
