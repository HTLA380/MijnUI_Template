import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <QueryProvider>
          <ThemeProvider>
            <Toaster />
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
