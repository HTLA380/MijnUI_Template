import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@mijn-ui/components/toaster"
import QueryProvider from "@/components/providers/query-provider"
import ThemeProvider from "@/components/providers/theme-provider"
import "./globals.css"
import NextTopLoader from "nextjs-toploader"

export const metadata: Metadata = {
  title: "MijnUI Template",
  description: "Template for MijnUI component library",
}

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider>
            <Toaster />
            <NextTopLoader
              color="#f97316"
              shadow="0 0 2px #f97316,0 0 3px #f97316"
              showSpinner={false}
            />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
