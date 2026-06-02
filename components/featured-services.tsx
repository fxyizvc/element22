"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Reveal } from "./reveal"

const featured = [
  {
    index: "01",
    title: "Paint Protection Film",
    image: "/paint_protection.mp4",
    desc: "A self-healing, optically clear armor engineered to absorb stone chips, scratches and the relentless wear of the road — preserving your paint as the day it left the factory.",
    points: ["Self-healing top coat", "10-year warranty", "Invisible finish"],
  },
  {
    index: "02",
    title: "Premium Car Wash",
    image: "/carwash.mp4",
    desc: "An elevated wash and care experience using pH-balanced treatments, safe-contact techniques and precision finishing — maintaining a flawless appearance without compromising your paintwork.",
    points: ["Safe-contact wash", "Premium finishing", "Paint-safe process"],
  },
  {
    index: "03",
    title: "Automotive Painting",
    image: "/painting.mp4",
    desc: "Precision paint refinement and professional refinishing engineered for depth, consistency and factory-grade visual perfection across every contour and panel.",
    points: ["Factory-grade finish", "Precision color matching", "Mirror-depth gloss"],
  },
]

export function FeaturedServices() {
  return (
    <section id="featured" className="relative border-t border-border/60 py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <Reveal>
          <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
            <span className="h-px w-10 bg-accent" />
            Signature Services
          </p>
          <h2 className="max-w-3xl text-balance font-serif text-4xl font-light leading-tight tracking-tight sm:text-5xl">
            Protection and finishing, perfected to an art.
          </h2>
        </Reveal>

        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          {featured.map((f, i) => (
            <div
              key={f.title}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <Reveal y={40} className="relative">
                <div className="group relative aspect-[4/3] overflow-hidden">
                {f.image.endsWith(".mp4") ? (
  <video
    autoPlay
    muted
    loop
    playsInline
    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
  >
    <source src={f.image} type="video/mp4" />
  </video>
) : (
  <img
    src={f.image || "/placeholder.svg"}
    alt={f.title}
    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
  />
)}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                  <span className="absolute left-6 top-6 font-mono text-xs tracking-widest text-foreground/70">
                    {f.index} / 03
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div>
                  <h3 className="font-serif text-3xl font-light tracking-tight sm:text-4xl">{f.title}</h3>
                  <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted-foreground">{f.desc}</p>

                  <ul className="mt-8 space-y-3">
                    {f.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-sm text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#contact"
                    whileHover={{ x: 4 }}
                    className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-foreground"
                  >
                    Enquire
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
