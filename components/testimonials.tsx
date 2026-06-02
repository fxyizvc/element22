"use client"

import { Reveal } from "./reveal"

const reviews = [
  {
    quote:
      "They treated my car like a piece of art. The PPF and ceramic work is flawless — three years on, it still looks like the day I collected it.",
    name: "Arjun Menon",
    role: "Owner · Porsche 911",
  },
  {
    quote:
      "The only place in Kerala I trust with my collection. The restoration on my classic was museum-grade. Uncompromising attention to detail.",
    name: "Rahul Nair",
    role: "Collector · Classic Mercedes",
  },
  {
    quote:
      "From the consultation to the handover, the experience felt genuinely luxury. Transparent, precise and absolutely worth it.",
    name: "Sneha Pillai",
    role: "Owner · Range Rover",
  },
]

export function Testimonials() {
  return (
    <section className="relative border-t border-border/60 bg-card/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" />
            Client Word
          </p>
          <h2 className="max-w-2xl text-balance font-serif text-4xl font-light leading-tight tracking-tight sm:text-5xl">
            Trusted by those who demand the very best.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.12}>
              <figure className="flex h-full flex-col justify-between border border-border/60 bg-background p-8 lg:p-10">
                <blockquote className="text-pretty font-serif text-xl font-light leading-relaxed text-foreground">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-10 border-t border-border/60 pt-6">
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{r.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
