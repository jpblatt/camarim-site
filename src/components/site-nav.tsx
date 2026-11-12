"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { ArrowUpRightIcon, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { RollText } from "@/components/roll-text"
import { ScrollTrigger, gsap, prefersReducedMotion, useGSAP, useMotion } from "@/components/motion-provider"
import { brand, navLinks, whatsappUrl } from "@/data/site"
import { cn } from "@/lib/utils"

/** Cápsula vinho com uma pílula dourada que desliza até o link sob o mouse (ou a seção visível). */
function DesktopNav() {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [hovered, setHovered] = useState<number | null>(null)
  const [active, setActive] = useState<number | null>(null)
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null)
  const target = hovered ?? active

  useGSAP(() => {
    const triggers = navLinks.map((l, i) => {
      const el = document.querySelector(l.href)
      if (!el) return null
      return ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (s) => setActive((cur) => (s.isActive ? i : cur === i ? null : cur)),
      })
    })
    return () => triggers.forEach((t) => t?.kill())
  }, [])

  useLayoutEffect(() => {
    const measure = () => {
      const el = target === null ? null : linkRefs.current[target]
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null)
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [target])

  return (
    <nav
      aria-label="Seções"
      onPointerLeave={() => setHovered(null)}
      className="relative isolate hidden gap-0.5 rounded-full border border-white/15 bg-wine-deep/80 p-1.5 shadow-[0_10px_40px_-12px_rgb(77_7_29/.6)] backdrop-blur-xl lg:flex"
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1.5 bottom-1.5 -z-10 rounded-full bg-gold transition-[left,width,opacity,scale] duration-500 ease-[cubic-bezier(.2,.9,.2,1)]",
          pill ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
        style={pill ?? undefined}
      />
      {navLinks.map((l, i) => (
        <Button
          key={l.href}
          asChild
          variant="ghost"
          className={cn(
            "h-9 rounded-full px-4 text-[15px] font-semibold transition-colors duration-300 hover:bg-transparent",
            target === i ? "text-wine-deep hover:text-wine-deep" : "text-white/85 hover:text-white"
          )}
        >
          <a
            ref={(el) => {
              linkRefs.current[i] = el
            }}
            href={l.href}
            aria-current={active === i ? "location" : undefined}
            onPointerEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
          >
            <RollText>{l.label}</RollText>
          </a>
        </Button>
      ))}
    </nav>
  )
}

export function SiteNav() {
  const { ready } = useMotion()
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useGSAP(
    () => {
      if (!ready) return
      if (prefersReducedMotion()) {
        gsap.set("[data-badge]", { autoAlpha: 1 })
        gsap.set("[data-nav-rest]", { autoAlpha: 1 })
        return
      }
      gsap.fromTo("[data-badge]", { yPercent: -110, autoAlpha: 1 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, delay: 0.35, ease: "power4.out" })
      gsap.fromTo("[data-nav-rest]", { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.55, ease: "power3.out" })
    },
    { scope: root, dependencies: [ready] }
  )

  return (
    <header ref={root} className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-3 px-gutter">
      {/* "crachá" branco preso no topo, como nas artes da clínica */}
      <a
        data-badge
        href="#top"
        aria-label="Camarim: voltar ao início"
        className="pointer-events-auto rounded-b-[22px] opacity-0 bg-white px-4 pt-3.5 pb-3 text-wine shadow-[0_14px_40px_-14px_rgb(77_7_29/.55)] md:px-5 md:pt-4 md:pb-3.5"
      >
        <Logo className="h-auto w-[150px] md:w-[188px]" />
      </a>

      <div data-nav-rest className="pointer-events-auto mt-4 opacity-0">
        <DesktopNav />
      </div>

      <div data-nav-rest className="pointer-events-auto mt-4 flex items-center gap-2 opacity-0">
        <Button asChild size="pill" variant="gold" className="hidden shadow-[0_10px_30px_-10px_rgb(77_7_29/.6)] md:inline-flex">
          <a href={whatsappUrl()} target="_blank" rel="noopener">
            <RollText>Agendar avaliação</RollText>
            <ArrowUpRightIcon data-icon="inline-end" />
          </a>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              size="icon-lg"
              className="size-12 rounded-full border border-white/20 bg-wine-deep/85 text-white backdrop-blur-xl hover:bg-wine lg:hidden"
              aria-label="Abrir menu"
            >
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="theme-wine rounded-b-[28px] border-none">
            <SheetHeader>
              <SheetTitle className="text-sm font-bold tracking-[0.2em] text-white uppercase">{brand.name}</SheetTitle>
              <SheetDescription className="text-white/75">{brand.tagline}</SheetDescription>
            </SheetHeader>
            <nav aria-label="Seções" className="flex flex-col px-4 pb-7">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/15 py-3.5 text-2xl font-bold text-white transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              ))}
              <Button asChild size="pill-lg" variant="gold" className="mt-6" onClick={() => setOpen(false)}>
                <a href={whatsappUrl()} target="_blank" rel="noopener">
                  Agendar avaliação
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
