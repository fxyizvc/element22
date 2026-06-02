import type { Metadata } from "next"
import { Inter, Cormorant_Garamond, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-custom",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif-custom",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-custom",
})

export const metadata: Metadata = {
  title: "Element 22 — Premium Automotive Destination | Kerala",
  description:
    "South India's premium destination for automotive protection, restoration and performance. Paint Protection Film, Ceramic Coating, Detailing, Restoration and more.",
  icons: {
    icon: "/e22_favicon.png",
  },
}

export const viewport = {
  themeColor: "#1a1a1a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${geistMono.variable}`}>
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
