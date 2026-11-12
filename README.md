# Camarim Estética, Spa e Saúde Integrada: site (demonstração)

Landing page de **demonstração** para apresentar à clínica. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui + GSAP (ScrollTrigger e SplitText) + Lenis. Site 100% estático, sem backend e sem `.env`.

## Como rodar

Requer Node.js 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção |
| `npm run start` | serve o build |
| `npm run lint` | ESLint |
| `npm run typecheck` | checagem de tipos (`tsc --noEmit`) |
| `npm run format` | Prettier |

Para testar no celular na mesma rede: `npm run dev -- -H <IP do computador>` e abra `http://<IP>:3000`.

## Onde editar

1. **`src/data/site.ts`**: todo o conteúdo: WhatsApp, endereço, horários, tratamentos, benefícios do Lavieen, equipe do Projeto Recomeçar, passos da avaliação e responsável técnico. Tudo que está marcado com `// a confirmar` é placeholder.
2. `src/components/sections/*`: uma seção por arquivo (hero, marquee, treatments, lavieen, features, recomecar, clinic, steps, location).
3. `src/components/logo.tsx`: logo em SVG (símbolo, escudo, letreiro e subtítulo).
4. `src/index.css`: cores (tokens), fontes e utilitários.
5. `public/media/`: fotos e vídeo tratados.

Quando a clínica mandar os dados, basta preencher `site.ts`: os horários substituem o "Consulte no WhatsApp", a foto da Dra. Luisa entra no escudo (`images.ownerPhoto`) e a cidade e o estado (já preenchidos) entram sozinhos na busca do mapa (`address.maps` e `address.mapsEmbed`). O responsável técnico (`technicalLead`) fica guardado em `site.ts`, mas **não é exibido**: veja as pendências.

## Direção visual

**Tom:** noturno e acolhedor, como um camarim. Seções em vinho profundo para impacto, alternando com seções claras (blush, branco e rosa) para leitura.

- **Paleta (amostrada nas artes):** vinho profundo `#4d071d`, vinho `#6e0c2b`, framboesa `#a01038`, dourado `#c89856` (só na cursiva e em fios finos), blush `#fbf3f2` e rosa `#f2d9df`.
- **Tipografia (Fontsource, self-hosted):** **Quicksand**, a geométrica arredondada mais próxima das artes, em caixa alta pesada nos títulos e mais leve no texto. **Allura** é a assinatura cursiva, usada em uma ou duas palavras por seção, como "Recomeçar" e "Lavieen" nos posts.
- **Motivo visual:** a **linha do perfil** da logo, que se desenha no preloader, no hero (símbolo gigante com a linha dourada deslocada) e no retrato da Dra. Luisa; o **crachá branco** preso no topo (nav e mapa do endereço), igual ao das artes; e as **caixas de borda fina com divisórias** dos posts (Lavieen, Recomeçar e áreas do laser).
- **Dourado:** chapado com um degradê muito sutil e só na cursiva. Nunca como texto sobre fundo claro.

### Referências usadas
- **Qissa** (restaurante-cafe): base escura com um único metal nos destaques (vinho + dourado), a faixa de palavras em cursiva separadas pelo símbolo (marquee que reage à rolagem) e o **nome gigante no rodapé** (aqui, o letreiro da logo em dourado, que se desenha com a rolagem).
- **Rafaela Salvato** (saude-clinica): a estrutura de clínica de estética, o **menu de tratamentos com prévia** (lista à esquerda e moldura com foto, vídeo ou cursiva à direita), as **molduras orgânicas com linha deslocada que se desenha** e o texto que acende palavra por palavra.
- **Hardt Training:** só a qualidade técnica: roll text nos botões, pílula deslizante na nav com scroll-spy, preloader, cursor e botão flutuante do WhatsApp.

### Animações
Preloader de cerca de 1,4 s (perfil se desenhando no escudo, depois a cortina sobe), o "CAMARIM" do hero se desenhando letra por letra (as mesmas letras em traço da logo, componente `Wordmark`), cursiva revelada da esquerda para a direita (só com `transform`), títulos por linha, fotos com máscara e zoom leve, parallax suave, marquee reativo e o vídeo em loop, que pausa fora da tela. Com **"reduzir movimento"** ativo, o GSAP e o Lenis são desligados, todo o conteúdo aparece e o vídeo mostra só o poster. No Windows, se "Efeitos de animação" estiver desligado, o site não anima no PC (mas anima no celular). Isso é esperado.

## Material usado e tratamento
- **Logo:** `LOGO.jpg` tem só 150 px. O símbolo foi **redesenhado à mão em SVG** sobre a máscara da imagem ampliada e comparado por screenshot com as artes. O letreiro "CAMARIM" foi desenhado em traço fino, com a perna longa do R. O mesmo letreiro (`Wordmark` em `logo.tsx`, traço de 4,5 para letras de 100 de altura) é o nome gigante do hero, em branco, e do rodapé, em dourado. Versões: escudo framboesa (nav), escudo branco (rodapé), empilhada (crachá) e favicon (`src/app/icon.svg`). **É provisória: pedir o arquivo original.**
- **Fotos do preenchimento labial:** recortadas sem a marca d'água (logo e assinatura). O crédito aparece em texto: "Dra. Luisa Vitória Miranda".
- **Vídeo do laser:** trecho de 7,53 s a 12,23 s de `REMOCAO-PELO-LASER.mp4`, que mostra **a aplicação na axila** (mão de luva rosa e aparelho) e termina no flash do laser, recortado em 4:5. Ficaram de fora o painel do aparelho e os trechos com rosto, cabelo ou óculos da paciente (o quadro seguinte ao corte, em 12,27 s, já mostra cabelo e óculos: não estique o trecho). Sem áudio, H.264 com `+faststart`, 4,7 s, 576×720, 312 KB, com poster em WebP. Toca em loop na prévia do menu de tratamentos e na seção do laser. **O vídeo mostra uma paciente: só publique com a autorização de uso de imagem.**
- **Não entraram no site:** `PREENCHIMENTOLABIAL-ANTES-E-DEPOIS.jpg` (antes e depois tem regras próprias em cada conselho), as artes `REF*.jpg` (só referência de cor e linguagem) e `EXEMPLO-DE-PRECO.jpg` (promoção vencida; **nenhum preço no site**).

## Pendências: o que pedir à clínica se fechar

**Dados a confirmar** (todos em `src/data/site.ts`)
- [ ] WhatsApp (hoje `5500000000000`) e telefone
- [ ] Bairro e CEP (cidade e estado já preenchidos: Marechal Cândido Rondon / PR). O **mapa do Google incorporado** em "Onde estamos" busca por nome + rua + cidade; a ficha do Google mostra Centro, CEP 85960-000, **a confirmar com a clínica**. Se a clínica tiver o link oficial do Maps, troque `address.maps`
- [ ] Horários de atendimento
- [ ] Profissão, especialidade e **registro profissional** (CRM, CRO, CRBM, CRN, CRP…) da Dra. Luisa e das 4 pessoas do Projeto Recomeçar
- [ ] **Responsável técnico** (nome + registro). A linha foi tirada do rodapé enquanto não há o dado. Quando a clínica informar, preencha `technicalLead` em `site.ts` e **volte a exibir no rodapé**: as regras de publicidade em saúde exigem o nome e o registro do responsável técnico
- [ ] Lista completa de tratamentos e serviços de spa
- [ ] Passo a passo real da primeira avaliação (a seção "Como funciona" é um rascunho genérico)
- [ ] Preços, se quiserem divulgar (estrutura `prices` pronta, não exibida). Hoje o CTA é "Consultar valores no WhatsApp"
- [ ] Domínio (`brand.url`)

**Material a pedir**
- [ ] Logo original (AI, PDF, SVG ou PNG grande)
- [ ] Fotos do espaço e da equipe (principalmente da Dra. Luisa, para o escudo da seção "A clínica")

**Autorizações e normas**
- [ ] Autorização de uso de imagem das pacientes nas **fotos do preenchimento** e no **vídeo do laser**
- [ ] Confirmar as regras de publicidade do **conselho de cada profissional** (fotos de procedimento, antes e depois, divulgação de preços, uso de "Dra.")

## Deploy (Vercel)
Importe o repositório na Vercel: o preset Next.js é detectado sozinho. Não precisa de variáveis de ambiente. O plano Hobby (grátis) é para uso **não comercial**: para o site de um cliente, use o plano Pro ou uma alternativa que permita uso comercial no plano grátis (Netlify, Cloudflare Pages). Confira as condições atuais.
