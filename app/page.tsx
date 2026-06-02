import { SiteNav } from "@/components/site-nav"
import { Hero } from "@/components/hero"
import { Welcome } from "@/components/welcome"
import { ServiceShowcase } from "@/components/service-showcase"
import { FeaturedServices } from "@/components/featured-services"
import { WhyChoose } from "@/components/why-choose"
import { Gallery } from "@/components/gallery"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="bg-background">
      <SiteNav />
      <Hero />
      <Welcome />
      <ServiceShowcase />
      <FeaturedServices />
      <WhyChoose />
      <Gallery />
      <Testimonials />
      <Contact />
      <SiteFooter />
    </main>
  )
}
