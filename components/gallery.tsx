"use client"

import { useRef, useState, useCallback } from "react"
import { Reveal } from "./reveal"

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, x)))
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative aspect-[5/4] w-full cursor-ew-resize select-none overflow-hidden"
      onMouseDown={(e) => {
        dragging.current = true
        update(e.clientX)
      }}
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => update(e.touches[0].clientX)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
    >
      <img src={after || "/placeholder.svg"} alt="After restoration" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before || "/placeholder.svg"}
          alt="Before restoration"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: containerRef.current ? containerRef.current.offsetWidth : "100%", maxWidth: "none" }}
        />
        <span className="absolute left-4 top-4 bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur">
          Before
        </span>
      </div>
      <span className="absolute right-4 top-4 bg-foreground/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-background backdrop-blur">
        After
      </span>

      <div className="absolute inset-y-0 w-px bg-foreground" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground bg-background">
          <div className="flex gap-0.5">
            <span className="h-3 w-0.5 bg-foreground" />
            <span className="h-3 w-0.5 bg-foreground" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Gallery() {
  return (
    <section id="gallery" className="relative border-t border-border/60 py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" />
              Transformations
            </p>
            <h2 className="max-w-2xl text-balance font-serif text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              The difference is in the detail.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Drag the slider to reveal the result of our paint correction and restoration craft.
            </p>
          </Reveal>
        </div>

        <Reveal y={40}>
        <div className="mx-auto max-w-3xl overflow-hidden border border-border/60">
            <BeforeAfter before="/before.png" after="/after.png" />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Reveal y={40} delay={0.1}>
            <div className="group relative aspect-[16/10] overflow-hidden border border-border/60">
            <video
  autoPlay
  muted
  loop
  playsInline
  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
>
  <source src="/heritage-restoration.mp4" type="video/mp4" />
</video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-serif text-2xl font-light">Heritage Restoration</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Bare metal · Repaint</p>
              </div>
            </div>
          </Reveal>
          <Reveal y={40} delay={0.2}>
            <div className="group relative aspect-[16/10] overflow-hidden border border-border/60">
              <img
                src="/workshop.png"
                alt="Premium detailing workshop"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="font-serif text-2xl font-light">The Studio</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Where it happens</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
