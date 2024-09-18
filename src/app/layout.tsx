import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Layout from "@/components/layout/Layout";

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
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
