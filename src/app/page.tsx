import { MotionProvider } from "@/components/motion-provider"
import { Preloader } from "@/components/preloader"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { Cursor, WhatsAppFab } from "@/components/floating"
import { Hero } from "@/components/sections/hero"
import { Marquee } from "@/components/sections/marquee"
import { Treatments } from "@/components/sections/treatments"
import { Lavieen } from "@/components/sections/lavieen"
import { Features } from "@/components/sections/features"
import { Recomecar } from "@/components/sections/recomecar"
import { Clinic } from "@/components/sections/clinic"
import { Steps } from "@/components/sections/steps"
import { Location } from "@/components/sections/location"

export default function Home() {
  return (
    <MotionProvider>
      <Preloader />
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Treatments />
        <Lavieen />
        <Features />
        <Recomecar />
        <Clinic />
        <Steps />
        <Location />
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <Cursor />
    </MotionProvider>
  )
}
