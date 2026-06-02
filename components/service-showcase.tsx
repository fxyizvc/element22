"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  Sparkles,
  Droplets,
  Wrench,
  Hammer,
  RotateCcw,
  PaintBucket,
  Cog,
  Gauge,
  CarFront,
  ArrowUpRight,
} from "lucide-react"
import { Reveal } from "./reveal"

const services = [
  { name: "Paint Protection Film", short: "PPF", icon: Shield, desc: "Invisible armor against the road." },
  { name: "Ceramic Coating", short: "Ceramic", icon: Droplets, desc: "Liquid glass, lasting gloss." },
  { name: "Premium Detailing", short: "Detailing", icon: Sparkles, desc: "Showroom finish, every time." },
  { name: "Mechanical Works", short: "Mechanical", icon: Cog, desc: "Engineering you can trust." },
  { name: "Body Works", short: "Body", icon: Hammer, desc: "Flawless panels, perfect lines." },
  { name: "Restoration", short: "Restore", icon: RotateCcw, desc: "Bringing icons back to life." },
  { name: "Painting", short: "Paint", icon: PaintBucket, desc: "Color matched to perfection." },
  { name: "Accessories", short: "Custom", icon: CarFront, desc: "Tailored customization." },
  { name: "Wheel Alignment", short: "Alignment", icon: Gauge, desc: "Precision on every axis." },
  { name: "Wash & Care", short: "Care", icon: Wrench, desc: "Luxury maintenance care." },
]

export function ServiceShowcase() {
  const [active, setActive] = useState(0)

  return (
    <section id="services" className="relative border-t border-border/60 bg-card/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" />
              Capabilities
            </p>
            <h2 className="max-w-2xl text-balance font-serif text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              Every discipline of automotive excellence.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Select a discipline to explore. Ten specialised services, one uncompromising standard of craft.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden border border-border/60 bg-border/60 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((s, i) => {
            const Icon = s.icon
            const isActive = active === i
            return (
              <motion.button
                key={s.name}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative flex aspect-square flex-col justify-between p-5 text-left transition-colors duration-500 ${
                  isActive ? "bg-foreground text-background" : "bg-card text-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6" strokeWidth={1.25} />
                  <span
                    className={`font-mono text-[10px] ${isActive ? "text-background/50" : "text-muted-foreground/50"}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-serif text-lg leading-tight">{s.name}</p>
                    <ArrowUpRight
                      className={`h-4 w-4 shrink-0 transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`}
                    />
                  </div>
                  <p
                    className={`mt-1 text-xs leading-snug ${isActive ? "text-background/70" : "text-muted-foreground"}`}
                  >
                    {s.desc}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
