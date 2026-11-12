// Todo o conteúdo do site num lugar só: edite aqui primeiro.
// Itens marcados com "// a confirmar" são placeholders e precisam de dado real da clínica.

export const brand = {
  name: "Camarim",
  fullName: "Camarim Estética, Spa e Saúde Integrada",
  tagline: "Estética, spa & saúde integrada",
  bio: "Clínica de estética personalizada",
  motto: "Sinta o poder do autocuidado",
  whatsapp: "5500000000000", // a confirmar: WhatsApp com DDI + DDD + número (só dígitos)
  phone: "", // a confirmar: telefone fixo, se houver
  instagram: "https://www.instagram.com/camarimesteticaspaesaude",
  instagramHandle: "@camarimesteticaspaesaude",
  whatsappMessage: "Olá! Gostaria de agendar uma avaliação na Camarim.",
  url: "https://camarim.com.br", // a confirmar: domínio do site
}

export const owner = {
  name: "Dra. Luisa Vitória Miranda",
  instagram: "https://www.instagram.com/draluisavitoriamiranda",
  instagramHandle: "@draluisavitoriamiranda",
  title: "", // a confirmar: profissão/especialidade (não inventar)
  register: "", // a confirmar: conselho e número de registro (ex.: CRM-UF 00000)
}

/**
 * Responsável técnico exigido pelas normas de publicidade em saúde.
 * Ainda não aparece no site: precisa voltar ao rodapé (nome + registro) quando a clínica informar.
 */
export const technicalLead = {
  name: "", // a confirmar
  register: "", // a confirmar: conselho + UF + número
}

// `city` e `state` entram sozinhos na busca do link e do mapa do Google.
const addressBase = {
  street: "Rua Dom Pedro I, 157",
  district: "", // a confirmar
  city: "Marechal Cândido Rondon",
  state: "PR",
  zip: "", // a confirmar
}

const mapsQuery = encodeURIComponent(
  ["Camarim Estética Spa e Saúde Integrada", addressBase.street, addressBase.city, addressBase.state].filter(Boolean).join(", ")
)

export const address = {
  ...addressBase,
  // a confirmar: link do Google Maps da clínica. Enquanto isso, busca pelo nome + rua.
  maps: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  // a confirmar: mapa incorporado (sem chave de API), com a mesma busca
  mapsEmbed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
}

/** Horários de atendimento. Vazio = o site mostra "consulte no WhatsApp". */
export const hours: { days: string; time: string }[] = [
  // a confirmar, ex.: { days: "Segunda a sexta", time: "09h às 19h" },
]

export const whatsappUrl = (msg: string = brand.whatsappMessage, phone = brand.whatsapp) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`

export const navLinks = [
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#recomecar", label: "Recomeçar" },
  { href: "#clinica", label: "A clínica" },
  { href: "#avaliacao", label: "Avaliação" },
  { href: "#contato", label: "Contato" },
] as const

const LASER_VIDEO_LABEL = "Aplicação de laser na axila, na Camarim"

export type Treatment = {
  id: string
  n: string
  name: string
  short: string
  preview:
    | { kind: "image"; src: string; alt: string }
    | { kind: "video"; src: string; poster: string; label: string }
    | { kind: "type"; word: string; caption: string }
  href: string
  cta: string
  message: string
}

export const treatments: Treatment[] = [
  {
    id: "labial",
    n: "01",
    name: "Preenchimento labial",
    short: "Contorno e volume planejados na avaliação, de acordo com o formato da sua boca.",
    preview: { kind: "image", src: "/media/labial-1-688.webp", alt: "Lábios após preenchimento labial, vistos de perfil" },
    href: "#labial",
    cta: "Ver tratamento",
    message: "Olá! Gostaria de saber mais sobre o preenchimento labial.",
  },
  {
    id: "lavieen",
    n: "02",
    name: "Lavieen",
    short: "Laser para a qualidade da pele: textura, poros, manchas e luminosidade num mesmo protocolo.",
    preview: { kind: "type", word: "Lavieen", caption: "Laser para a qualidade da pele" },
    href: "#lavieen",
    cta: "Ver tratamento",
    message: "Olá! Gostaria de saber mais sobre o Lavieen.",
  },
  {
    id: "laser",
    n: "03",
    name: "Remoção de pelos a laser",
    short: "Sessões de depilação a laser em áreas como axila, virilha completa e meia perna.",
    preview: { kind: "video", src: "/media/laser.mp4", poster: "/media/laser-poster.webp", label: LASER_VIDEO_LABEL },
    href: "#laser",
    cta: "Ver tratamento",
    message: "Olá! Gostaria de saber mais sobre a remoção de pelos a laser.",
  },
  {
    id: "spa",
    n: "04",
    name: "Spa",
    short: "Um tempo para o corpo e para a cabeça. Os rituais disponíveis são apresentados no atendimento.",
    preview: { kind: "type", word: "Spa", caption: "Rituais apresentados no atendimento" },
    href: "#contato",
    cta: "Perguntar no WhatsApp",
    message: "Olá! Gostaria de conhecer os serviços de spa da Camarim.",
  },
]

/** Benefícios do Lavieen exatamente como aparecem na arte da clínica. */
export const lavieen = {
  title: ["Uma pele mais uniforme,", "luminosa e renovada."],
  intro:
    "Tecnologia a laser para quem busca melhorar a qualidade da pele e tratar diferentes queixas em um único protocolo.",
  benefits: [
    "Melhora a textura e o aspecto dos poros",
    "Auxilia no tratamento de manchas",
    "Estimula a renovação da pele",
    "Contribui para uma pele mais uniforme",
    "Suaviza linhas finas",
    "Promove mais viço e luminosidade",
  ],
  personal: "Tecnologia de laser com ajustes personalizados para a sua pele.",
  disclaimer: "Resultados e recuperação variam conforme a pele e o protocolo.",
  message: "Olá! Gostaria de agendar uma avaliação para o Lavieen.",
}

export const labial = {
  credit: "Dra. Luisa Vitória Miranda",
  message: "Olá! Gostaria de agendar uma avaliação para preenchimento labial.",
}

export const laser = {
  areas: ["Axila", "Virilha completa", "Meia perna"],
  message: "Olá! Gostaria de consultar os valores da remoção de pelos a laser.",
  videoLabel: LASER_VIDEO_LABEL,
}

/** Estrutura pronta para preços. NÃO é exibida: a clínica ainda não confirmou valores. */
export type Price = { item: string; value: number | null; installments?: string }
export const prices: Price[] = [
  // a confirmar, ex.: { item: "Axila", value: null },
]

export const recomecar = {
  year: "2026",
  lead: "Protocolo personalizado para emagrecimento, bem-estar e qualidade de vida.",
  team: [
    { name: "Joseni Palinski", role: "Avalia o seu caso e monta o seu protocolo.", title: "" }, // title: a confirmar
    { name: "Dra. Ana Carolina Wagner", role: "Cuida dos seus exames e da sua saúde.", title: "" }, // title: a confirmar
    { name: "Dra. Thalia Müller", role: "Cuida do seu cardápio.", title: "" }, // title: a confirmar
    { name: "Thaís Strey", role: "Cuida da sua saúde mental.", title: "" }, // title: a confirmar
  ],
  closing: "Você com mais saúde, autoestima e autoconfiança.",
  message: "Olá! Quero saber como funciona o Projeto Recomeçar 2026.",
}

// a confirmar com a clínica: passo a passo real da primeira avaliação
export const steps = [
  { n: "01", title: "Conversa", text: "Você chama no WhatsApp, conta o que gostaria de cuidar e combinamos um horário." },
  { n: "02", title: "Avaliação", text: "Na clínica, a profissional conhece a sua pele, o seu histórico e o que você espera." },
  { n: "03", title: "Protocolo", text: "Você recebe a indicação de tratamento, o número de sessões previsto e os valores." },
  { n: "04", title: "Acompanhamento", text: "As sessões são ajustadas à resposta da sua pele, com retornos para acompanhar." },
]

export const images = {
  labial1: "/media/labial-1-688.webp",
  labial1Small: "/media/labial-1-480.webp",
  labial2: "/media/labial-2-688.webp",
  labial2Small: "/media/labial-2-480.webp",
  laserVideo: "/media/laser.mp4",
  laserPoster: "/media/laser-poster.webp",
  ownerPhoto: "", // a confirmar: foto da Dra. Luisa (vazio = moldura com o símbolo)
}

export const marqueeWords = ["estética", "spa", "saúde integrada", "autocuidado", "Lavieen", "Recomeçar"]
