import { ArrowUpRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RollText } from "@/components/roll-text"
import { BrandHeading, Rise } from "@/components/motion-bits"
import { Logo } from "@/components/logo"
import { MapEmbed } from "@/components/map-embed"
import { InstagramIcon, WhatsAppIcon } from "@/components/whatsapp-icon"
import { address, brand, hours, whatsappUrl } from "@/data/site"

const cityLine = [address.district, [address.city, address.state].filter(Boolean).join(" / ")].filter(Boolean).join(" · ")

/** Endereço, horários, contatos e o mapa do Google. Cidade e horários aparecem quando forem preenchidos em site.ts. */
export function Location() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="bg-rose px-gutter py-[clamp(96px,13vw,190px)]">
      <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <BrandHeading id="contato-title" caps={["Onde"]} script="estamos" tone="berry" className="text-wine-deep" />
          <Rise className="mt-10">
            <address data-rise className="text-[clamp(26px,2.8vw,40px)] leading-tight font-bold text-wine-deep not-italic">
              {address.street}
              {cityLine && <span className="mt-1 block text-lg font-semibold text-muted-foreground">{cityLine}</span>}
            </address>

            <dl data-rise className="mt-10 max-w-md border-t border-wine/20">
              <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-wine/20 py-4">
                <dt className="font-bold text-wine-deep">Horários</dt>
                <dd className="text-muted-foreground sm:text-right">
                  {hours.length ? (
                    hours.map((h) => (
                      <span key={h.days} className="block">
                        {h.days}: {h.time}
                      </span>
                    ))
                  ) : (
                    <a href={whatsappUrl("Olá! Quais são os horários de atendimento da Camarim?")} target="_blank" rel="noopener" className="font-semibold text-berry hover:underline">
                      Consulte no WhatsApp
                    </a>
                  )}
                </dd>
              </div>
              <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-wine/20 py-4">
                <dt className="font-bold text-wine-deep">Instagram</dt>
                <dd>
                  <a href={brand.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-semibold break-all text-berry hover:underline">
                    <InstagramIcon className="size-4" />
                    {brand.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>

            <div data-rise className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="pill-lg" variant="berry">
                <a href={whatsappUrl()} target="_blank" rel="noopener">
                  <WhatsAppIcon className="size-5" />
                  <RollText>Chamar no WhatsApp</RollText>
                </a>
              </Button>
              <Button asChild size="pill-lg" variant="ghostDark">
                <a href={address.maps} target="_blank" rel="noopener">
                  <RollText>Abrir no Google Maps</RollText>
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
            </div>
          </Rise>
        </div>

        {/* mapa do Google no lugar do cartão, com o "crachá" das artes pendurado no topo */}
        <div className="lg:col-span-6">
          <div className="relative isolate mx-auto aspect-[5/4] min-h-[320px] max-w-[560px] overflow-hidden rounded-[30px] bg-berry max-sm:aspect-[4/5]">
            <MapEmbed src={address.mapsEmbed} title={`Mapa do Google: ${brand.name}, ${address.street}`} />
            {/* crachá no canto: o pino fica no centro do mapa e o cartão do Google, no canto esquerdo */}
            <div className="pointer-events-none absolute top-0 right-[6%] w-[30%] max-w-[150px] rounded-b-[18px] bg-white px-[4%] pt-[3.5%] pb-[4%] text-wine shadow-[0_20px_40px_-20px_rgb(0_0_0/.5)]">
              <Logo variant="stacked" tagline={false} className="h-auto w-full" />
            </div>
            <Button asChild size="pill" variant="berry" className="absolute bottom-9 left-1/2 -translate-x-1/2 shadow-[0_14px_30px_-12px_rgb(0_0_0/.55)]">
              <a href={address.maps} target="_blank" rel="noopener" aria-label={`Abrir ${address.street} no Google Maps`}>
                <RollText>Abrir no Google Maps</RollText>
                <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
