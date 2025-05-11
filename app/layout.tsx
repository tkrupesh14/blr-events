import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SupabaseProvider } from "@/components/providers"
import { createServerSupabase } from "@/lib/supabase-server"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bengaluru Tech Events",
  description: "Discover and list tech events happening in Bengaluru",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createServerSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SupabaseProvider initialSession={session}>
            {children}
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
