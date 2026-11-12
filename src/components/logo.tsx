import { cn } from "@/lib/utils"

/**
 * Logo da Camarim redesenhada à mão em vetor a partir das artes do Instagram (provisória:
 * pedir o arquivo original). Coordenadas do símbolo numa grade de 600 × 600.
 */

/** Perfil feminino que termina numa lua crescente (contorno fechado: serve para preencher e para "desenhar"). */
export const SYMBOL_D =
  "M328 80C346 104 360 140 368 172C372 184 378 192 386 200C393 207 400 213 402 218C403 222 398 229 391 233C387 236 386 241 387 245C389 251 396 257 396 263C396 268 391 271 388 273C392 276 394 280 393 285C392 291 386 293 386 299C386 306 389 312 388 320C388 328 383 333 374 334C350 335 310 334 292 341C262 352 240 375 232 405C224 440 232 480 256 512C268 524 284 532 302 538C270 534 238 518 218 495C196 468 188 430 192 395C197 350 230 310 268 282C300 258 318 228 326 190C330 160 331 110 328 80Z"

/** Só a linha do rosto (testa → nariz → boca → queixo → curva da lua), aberta, para o motivo de traço. */
export const PROFILE_D =
  "M328 80C346 104 360 140 368 172C372 184 378 192 386 200C393 207 400 213 402 218C403 222 398 229 391 233C387 236 386 241 387 245C389 251 396 257 396 263C396 268 391 271 388 273C392 276 394 280 393 285C392 291 386 293 386 299C386 306 389 312 388 320C388 328 383 333 374 334C350 335 310 334 292 341C262 352 240 375 232 405C224 440 232 480 256 512C268 524 284 532 302 538"

export const SYMBOL_VIEWBOX = "184 72 226 474"

/** Escudo: quadrado com cantos de cima levemente arredondados e base em ponta. */
export const SHIELD_D = "M72 27H524Q538 27 538 41V482L298 584L58 482V41Q58 27 72 27Z"
export const SHIELD_VIEWBOX = "58 27 480 557"

type Tone = "berry" | "white" | "gold"

const shieldColors: Record<Tone, { shield: string; face: string }> = {
  berry: { shield: "var(--berry)", face: "#fff" },
  white: { shield: "#fff", face: "var(--wine)" },
  gold: { shield: "var(--gold)", face: "var(--wine-deep)" },
}

export function BrandSymbol({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox={SYMBOL_VIEWBOX} aria-hidden="true" className={className} {...props}>
      <path d={SYMBOL_D} fill="currentColor" />
    </svg>
  )
}

export function Shield({ tone = "berry", className, ...props }: React.ComponentProps<"svg"> & { tone?: Tone }) {
  const c = shieldColors[tone]
  return (
    <svg viewBox={SHIELD_VIEWBOX} aria-hidden="true" className={className} {...props}>
      <path d={SHIELD_D} fill={c.shield} />
      <path d={SYMBOL_D} fill={c.face} />
    </svg>
  )
}

/** Letras de "CAMARIM" em traço fino (altura das maiúsculas = 100), com a perna longa do R. */
export function WordmarkPaths({ stroke = 5 }: { stroke?: number }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="miter" strokeMiterlimit={6}>
      <path data-letter d="M86 17A48 48 0 1 0 86 83" />
      <path data-letter d="M104 100L150 1L196 100M120.7 64H179.3" />
      <path data-letter d="M216 100L226 1L264 92L302 1L312 100" />
      <path data-letter d="M332 100L378 1L424 100M348.7 64H407.3" />
      <path data-letter d="M446 100V3.5H474A24.25 24.25 0 0 1 474 52H446" />
      <path data-letter d="M518 1V100" />
      <path data-letter d="M538 100L548 1L586 92L624 1L634 100" />
      {/* perna do R que se estende por baixo do "IM" */}
      <path
        data-tail
        d="M462.5 50.5L469.5 50.5C481 71 491 93 503 106C519 122 545 127 576 123C547 132 516 129 498 113C485 99 474 74 462.5 50.5Z"
        fill="currentColor"
        stroke="none"
      />
    </g>
  )
}

/** Traço do letreiro para letras de 100 de altura: a mesma proporção em qualquer tamanho. */
export const WORDMARK_STROKE = 4.5
export const WORDMARK_VIEWBOX = "-4 -4 642 136"

/**
 * Só o letreiro "CAMARIM" (nome gigante do hero e do rodapé). Cada letra é um `<path data-letter>`
 * e a perna do R é `[data-tail]`, para animar. Decorativo por padrão: passe `role="img"` e `aria-label`
 * quando ele for o próprio texto.
 */
export function Wordmark({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox={WORDMARK_VIEWBOX} aria-hidden={props["aria-label"] ? undefined : true} className={cn("overflow-visible", className)} {...props}>
      <WordmarkPaths stroke={WORDMARK_STROKE} />
    </svg>
  )
}

function Tagline({ y, size = 33 }: { y: number; size?: number }) {
  return (
    <text
      x="0"
      y={y}
      fontSize={size}
      fontWeight={500}
      letterSpacing={2.6}
      fill="currentColor"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      ESTÉTICA, SPA &amp; SAÚDE INTEGRADA
    </text>
  )
}

type LogoProps = React.ComponentProps<"svg"> & {
  variant?: "horizontal" | "stacked" | "wordmark"
  /** cor do escudo; o texto usa `currentColor` */
  tone?: Tone
  tagline?: boolean
}

/** Logo completa. O texto herda a cor (`currentColor`): `text-wine` no claro e `text-white` no vinho. */
export function Logo({ variant = "horizontal", tone = "berry", tagline = true, className, ...props }: LogoProps) {
  const c = shieldColors[tone]
  const shield = (
    <>
      <path d={SHIELD_D} fill={c.shield} />
      <path d={SYMBOL_D} fill={c.face} />
    </>
  )

  if (variant === "wordmark") {
    return <Wordmark className={className} {...props} />
  }

  if (variant === "stacked") {
    // escudo centralizado em cima, como no "crachá" das artes
    return (
      <svg viewBox="-4 -2 642 520" role="img" aria-label="Camarim Estética, Spa & Saúde Integrada" className={className} {...props}>
        <g transform="translate(187 0) scale(0.5386) translate(-58 -27)">{shield}</g>
        <g transform="translate(0 342)">
          <WordmarkPaths />
          {tagline && <Tagline y={166} />}
        </g>
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 1020 352" role="img" aria-label="Camarim Estética, Spa & Saúde Integrada" className={className} {...props}>
      <g transform="scale(0.6284) translate(-58 -27)">{shield}</g>
      <g transform="translate(378 78)">
        <WordmarkPaths />
        {tagline && <Tagline y={184} />}
      </g>
    </svg>
  )
}
