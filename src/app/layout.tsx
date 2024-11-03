import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "~/components/providers/QueryProvider";
import ThemeProvider from "~/components/providers/ThemeProvider";
import { Toaster } from "~/components/toaster/Toaster";

export const metadata: Metadata = {
  title: "MijnUI Template",
  description: "Template for MijnUI component library",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
  );
}
