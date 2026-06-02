import { Instagram, MessageCircle, MapPin } from "lucide-react"

const cols = [
  {
    title: "Services",
    links: [
      "Paint Protection Film",
      "Premium Car Wash",
      "Automotive Painting",
      "Mechanical Works",
      "Body Works",
    ],
  },
  {
    title: "Element 22",
    links: [
      "About",
      "Gallery",
      "Studio",
      "Contact",
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <img
              src="/e22.png"
              alt="Element 22"
              className="h-12 w-auto object-contain"
            />

            <p className="mt-6 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Premium automotive care, protection and restoration crafted with precision in Kerala.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://www.instagram.com/element22.in"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center border border-border/60 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>

              <a
                href="https://wa.me/919995952978"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center border border-border/60 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Footer Columns */}
          {cols.map((c) => (
            <div key={c.title} className="lg:col-span-3">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                {c.title}
              </p>

              <ul className="mt-6 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <span className="text-sm text-foreground/80">
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1" />
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
          <a
            href="https://maps.app.goo.gl/2TkQEQXFtY83Ycem6"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <MapPin className="h-3.5 w-3.5" />
            Kozhikode, Kerala · India
          </a>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Element 22. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}