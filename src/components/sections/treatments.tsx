"use client"

import { useState } from "react"
import { ArrowUpRightIcon } from "lucide-react"
import { AutoVideo } from "@/components/auto-video"
import { BrandSymbol } from "@/components/logo"
import { BrandHeading, Rise } from "@/components/motion-bits"
import { OrganicFrame } from "@/components/organic-frame"
import { treatments, whatsappUrl, type Treatment } from "@/data/site"
import { cn } from "@/lib/utils"

function PreviewMedia({ t, sizes = "(min-width: 1024px) 40vw, 90vw" }: { t: Treatment; sizes?: string }) {
  const p = t.preview
  if (p.kind === "image") {
    return (
      <img
        src={p.src}
        srcSet={`${p.src.replace("-688", "-480")} 480w, ${p.src} 688w`}
        sizes={sizes}
        alt={p.alt}
        loading="lazy"
        className="size-full object-cover"
      />
    )
  }
  if (p.kind === "video") return <AutoVideo src={p.src} poster={p.poster} label={p.label} />
  return (
    <div className={cn("relative grid size-full place-items-center", t.id === "spa" ? "bg-berry" : "bg-wine-deep")}>
      <BrandSymbol className="absolute top-[8%] right-[10%] h-[70%] w-auto text-white/[.07]" />
      <div className="relative text-center">
        <span className={cn("block font-script text-[clamp(72px,8vw,130px)] leading-none", t.id === "spa" ? "text-white" : "text-gold")}>
          {p.word}
        </span>
        <span className="mt-3 block text-xs font-bold tracking-[0.2em] text-white/85 uppercase">{p.caption}</span>
      </div>
    </div>
  )
}

/**
 * Menu de tratamentos com prévia (referência: Rafaela Salvato).
 * Desktop: lista à esquerda e uma moldura fixa à direita que troca no hover/foco.
 * Celular: cada item mostra a própria imagem.
 */
export function Treatments() {
  const [active, setActive] = useState(0)

  return (
    <section id="tratamentos" aria-labelledby="tratamentos-title" className="relative bg-blush px-gutter py-[clamp(88px,13vw,180px)]">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-20">
        <BrandHeading id="tratamentos-title" caps={["Tratamentos"]} script="sob medida" tone="berry" className="text-wine-deep" />
        <p className="max-w-sm text-[17px] leading-relaxed text-muted-foreground">
          Cada protocolo é montado depois da avaliação, de acordo com a sua pele e com o que você quer cuidar.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-[6vw]">
        <Rise className="border-t border-wine/20">
          <ul>
            {treatments.map((t, i) => {
              const isOn = active === i
              const external = t.href === "#contato"
              return (
                <li key={t.id} data-rise className="border-b border-wine/20">
                  <a
                    href={external ? whatsappUrl(t.message) : t.href}
                    {...(external ? { target: "_blank", rel: "noopener" } : {})}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group/row grid grid-cols-[auto_1fr_auto] items-baseline gap-x-5 py-6 md:gap-x-8 md:py-8"
                  >
                    <span className={cn("text-sm font-bold tabular-nums transition-colors duration-300", isOn ? "text-berry" : "text-muted-foreground")}>
                      {t.n}
                    </span>
                    <span>
                      <span
                        className={cn(
                          "block text-[clamp(26px,3.4vw,50px)] leading-[1.05] font-bold transition-[color,translate] duration-500 ease-(--ease-silk)",
                          isOn ? "text-berry lg:translate-x-3" : "text-wine-deep"
                        )}
                      >
                        {t.name}
                      </span>
                      <span className="mt-2 block max-w-md text-[15px] leading-relaxed text-muted-foreground md:text-base">{t.short}</span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-berry">
                        {t.cta}
                        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover/row:rotate-45" />
                      </span>
                      {/* celular: a imagem aparece no próprio item */}
                      <span className="mt-6 block lg:hidden">
                        <span className="block aspect-[5/4] overflow-hidden rounded-[22px] rounded-tr-[90px]">
                          <PreviewMedia t={t} sizes="90vw" />
                        </span>
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "hidden size-11 place-items-center rounded-full border transition-[background-color,border-color,color] duration-300 md:grid",
                        isOn ? "border-berry bg-berry text-white" : "border-wine/25 text-wine"
                      )}
                    >
                      <ArrowUpRightIcon className="size-4" />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </Rise>

        {/* prévia fixa (desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-28">
            <OrganicFrame className="mx-auto w-full max-w-[460px]">
              {treatments.map((t, i) => (
                <div
                  key={t.id}
                  aria-hidden={active !== i}
                  className={cn(
                    "absolute inset-0 transition-[opacity,scale] duration-700 ease-(--ease-silk)",
                    active === i ? "scale-100 opacity-100" : "pointer-events-none scale-[1.06] opacity-0"
                  )}
                >
                  <PreviewMedia t={t} />
                </div>
              ))}
            </OrganicFrame>
            <p className="mx-auto mt-8 max-w-[460px] text-sm text-muted-foreground">
              <span className="font-bold text-wine-deep">{treatments[active].name}</span>
              {treatments[active].id === "labial" && " · foto: Dra. Luisa Vitória Miranda"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
