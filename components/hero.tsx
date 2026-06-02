"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
      <video
  autoPlay
  muted
  loop
  playsInline
  className="h-full w-full object-cover"
>
  <source src="/intro.mp4" type="video/mp4" />
</video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pt-32 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
        >
          <span className="h-px w-10 bg-accent" />
          Kerala · South India
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-balance font-serif text-5xl font-light leading-[0.95] tracking-tight text-foreground text-shadow-luxury sm:text-7xl lg:text-8xl"
        >
          Crafting Automotive Perfection
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          South India&apos;s premium destination for automotive protection, restoration and performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-background transition-all hover:bg-accent"
          >
            Make an Appointment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-3 border border-foreground/30 px-8 py-4 text-xs uppercase tracking-[0.2em] text-foreground transition-all hover:border-foreground hover:bg-foreground/5"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
