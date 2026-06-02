"use client"

import { Award, Users, Layers, FlaskConical, Crown, Cpu } from "lucide-react"
import { Reveal } from "./reveal"

const reasons = [
  {
    icon: Award,
    title: "Precision Craftsmanship",
    desc: "Every millimeter measured, every surface perfected. We treat craft as a discipline, not a service.",
  },
  {
    icon: Users,
    title: "Expert Technicians",
    desc: "A team trained on the world's finest marques, obsessed with detail and accountable to perfection.",
  },
  {
    icon: Layers,
    title: "Complete Solutions",
    desc: "From protection to restoration, every automotive need handled under a single, seamless roof.",
  },
  {
    icon: FlaskConical,
    title: "Premium Products",
    desc: "Only globally certified films, coatings and materials — sourced from the industry's leading names.",
  },
  {
    icon: Crown,
    title: "Luxury Experience",
    desc: "A concierge approach to your time, your vehicle and your expectations from the first conversation.",
  },
  {
    icon: Cpu,
    title: "Advanced Equipment",
    desc: "State-of-the-art alignment, paint and measurement technology for results you can verify.",
  },
]

export function WhyChoose() {
  return (
    <section
      id="why"
      className="relative border-t border-border/60 bg-card/40 py-28 lg:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 max-w-2xl">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" />
              Why Element 22
            </p>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              The standard the rest aspire to.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon
            return (
              <Reveal key={r.title} delay={(i % 3) * 0.1} className="bg-background">
                <div className="group flex h-full flex-col gap-6 p-8 transition-colors duration-500 hover:bg-secondary lg:p-10">
                  <Icon className="h-7 w-7 text-accent" strokeWidth={1.25} />
                  <div>
                    <h3 className="font-serif text-2xl font-light tracking-tight">{r.title}</h3>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
