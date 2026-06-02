import { Instagram, MessageCircle, MapPin } from "lucide-react"

const cols = [
  {
    title: "Services",
    links: ["Paint Protection Film", "Ceramic Coating", "Detailing", "Restoration", "Wheel Alignment"],
  },
  {
    title: "Destination",
    links: ["About Element 22", "The Studio", "Gallery", "Careers", "Contact"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center border border-foreground/30 font-mono text-sm tracking-tighter">
                22
              </span>
              <span className="text-sm font-medium uppercase tracking-[0.35em]">Element</span>
            </div>
            <p className="mt-6 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              South India&apos;s premium destination for automotive protection, restoration and performance.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-border/60 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/919000000000"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center border border-border/60 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-3">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{c.title}</p>
              <ul className="mt-6 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1" />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            Kochi, Kerala · India
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Element 22. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
