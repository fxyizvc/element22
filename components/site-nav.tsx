"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Services", href: "#services" },
  { label: "Featured", href: "#featured" },
  { label: "Why Element 22", href: "#why" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
  className={`fixed inset-x-0 top-0 z-50 ${
    open
      ? "bg-black border-b border-white/10"
      : scrolled
      ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
      : "bg-transparent"
  }`}
>
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
      <a href="#top" className="flex items-center" aria-label="Element 22 home">
  <img
    src="/e22.png"
    alt="Element 22"
    className="h-12 w-auto object-contain"
  />
</a>

        <div className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden items-center gap-2 border border-foreground/30 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-foreground transition-all hover:bg-foreground hover:text-background lg:inline-flex"
        >
          Make an Appointment
        </a>

        <button
          onClick={() => setOpen(true)}
          className="text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          
<motion.div
  initial={false}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 z-[999] flex flex-col bg-black lg:hidden">
  {/* Top Bar */}
  <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
    <img
      src="/e22.png"
      alt="Element 22"
      className="h-10 w-auto object-contain"
    />

    <button
      onClick={() => setOpen(false)}
      aria-label="Close menu"
      className="text-white"
    >
      <X className="h-6 w-6" />
    </button>
  </div>

  {/* Menu */}
  <div className="flex flex-1 flex-col justify-center gap-6 px-8 pb-16">
    {links.map((l, i) => (
      <motion.a
        key={l.href}
        href={l.href}
        onClick={() => setOpen(false)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 + i * 0.06 }}
        className="font-serif text-3xl font-light tracking-tight text-white"
      >
        {l.label}
      </motion.a>
    ))}

    <a
      href="#contact"
      onClick={() => setOpen(false)}
      className="mt-8 inline-flex w-fit border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
    >
      Make an Appointment
    </a>
  </div>
</motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
