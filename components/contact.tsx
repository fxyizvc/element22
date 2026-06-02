"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Instagram, MapPin, Phone, ArrowRight, Check } from "lucide-react"
import { Reveal } from "./reveal"

const services = [
  "Paint Protection Film",
  "Ceramic Coating",
  "Premium Detailing",
  "Mechanical Works",
  "Body Works",
  "Restoration",
  "Other",
]

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border/60">
      <div className="absolute inset-0">
        <img src="/workshop.png" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1400px] gap-16 px-6 py-28 lg:grid-cols-2 lg:px-10 lg:py-40">
        {/* Left: copy + contact methods */}
        <div>
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
              <span className="h-px w-10 bg-accent" />
              Make an Appointment
            </p>
            <h2 className="max-w-md text-balance font-serif text-4xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s craft perfection together.
            </h2>
            <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
              Reserve a private consultation at our Kerala destination. Tell us about your vehicle and our specialists
              will be in touch.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-4">
            <Reveal delay={0.1}>
              <a
                href="https://wa.me/919995952978"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-border/60 bg-card/60 p-5 backdrop-blur transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-4">
                  <MessageCircle className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">Chat on WhatsApp</span>
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
            <Reveal delay={0.18}>
              <a
                href="https://www.instagram.com/element22.in"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-border/60 bg-card/60 p-5 backdrop-blur transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-4">
                  <Instagram className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">@element22.in</span>
                </span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-4 border border-border/60 bg-card/60 p-5 backdrop-blur">
                  <Phone className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <span className="text-sm tracking-wide">+91 99959 52978</span>
                </div>
                <a
                  href="https://maps.app.goo.gl/2TkQEQXFtY83Ycem6"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 border border-border/60 bg-card/60 p-5 backdrop-blur transition-colors hover:bg-secondary"
                  >
                <MapPin className="h-5 w-5 text-accent" strokeWidth={1.5} />
  <span className="text-sm tracking-wide">Kozhikode, Kerala</span>
  </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right: form */}
        <Reveal delay={0.2}>
          <div className="border border-border/60 bg-card/70 p-8 backdrop-blur-xl lg:p-10">
            {submitted ? (
              <div className="flex h-full min-h-80 flex-col items-center justify-center text-center">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-serif text-2xl font-light">Request received</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Thank you. Our concierge team will reach out shortly to confirm your appointment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      className="w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      required
                      type="tel"
                      placeholder="+91"
                      className="w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                    />
                  </Field>
                </div>

                <Field label="Vehicle">
                  <input
                    type="text"
                    placeholder="Make & model"
                    className="w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                  />
                </Field>

                <Field label="Service of interest">
                  <select
                    required
                    defaultValue=""
                    className="w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors focus:border-accent"
                  >
                    <option value="" disabled className="bg-card">
                      Select a service
                    </option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-card">
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Message">
                  <textarea
                    rows={3}
                    placeholder="Tell us about your requirements"
                    className="w-full resize-none border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                  />
                </Field>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="group mt-4 inline-flex items-center justify-center gap-3 bg-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-accent"
                >
                  Request Appointment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}
