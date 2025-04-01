import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { CartProvider } from "@/lib/cart-context"
import { ThemeProvider } from "@/components/theme-provider"

// Optimize font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Update metadata with proper viewport settings
export const metadata: Metadata = {
  title: "ShopGo - E-commerce Store",
  description: "A modern e-commerce website built with Next.js",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} bg-gray-50`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'