"use client"

import { Reveal } from "./reveal"

const stats = [
  { value: "10+", label: "Premium Services" },
  { value: "5000+", label: "Vehicles Perfected" },
  { value: "100%", label: "Precision Guaranteed" },
]

export function Welcome() {
  return (
    <section className="relative border-t border-border/60 py-28 lg:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" />
              The Element 22 Ecosystem
            </p>
            <h2 className="text-balance font-serif text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              A luxury automotive destination, reimagined.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.15}>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Element 22 is not a workshop — it is a complete automotive ecosystem. We bring together protection,
              restoration, performance and craftsmanship under one roof, delivered with the precision and discretion
              you would expect from the finest marques in the world.
            </p>
            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              From paint protection film to bare-metal restoration, every vehicle that passes through our doors is
              treated as a singular work of engineering. Our technicians, our products and our processes exist for one
              purpose: perfection.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border/60 pt-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.2 + i * 0.1}>
                <p className="font-serif text-3xl font-light text-foreground sm:text-4xl">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
