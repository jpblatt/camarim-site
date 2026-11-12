import type { Metadata, Viewport } from "next"
import { address, brand, owner } from "@/data/site"

import "../index.css"

const description =
  "Camarim Estética, Spa e Saúde Integrada: clínica de estética personalizada na Rua Dom Pedro I, 157. Preenchimento labial, Lavieen, remoção de pelos a laser, spa e o Projeto Recomeçar. Agende sua avaliação."

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: "Camarim | Estética, Spa e Saúde Integrada",
  description,
  openGraph: {
    title: "Camarim | Estética, Spa e Saúde Integrada",
    description,
    type: "website",
    locale: "pt_BR",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4d071d",
}

// JSON-LD: completar endereço, telefone e horários quando a clínica confirmar (src/data/site.ts)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "BeautySalon"],
  name: brand.fullName,
  description,
  url: brand.url,
  image: `${brand.url}/logo-simbolo.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: address.street,
    ...(address.city && { addressLocality: address.city }),
    ...(address.state && { addressRegion: address.state }),
    ...(address.zip && { postalCode: address.zip }),
    addressCountry: "BR",
  },
  sameAs: [brand.instagram, owner.instagram],
  founder: { "@type": "Person", name: owner.name },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  )
}
