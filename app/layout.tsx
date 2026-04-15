import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import type React from "react";

import Header from "../src/components/Header";
import "../src/app/globals.css";
import type { Metadata } from "next";
import { SEO } from "../src/constants";

const inter = Inter({
  preload: false,
});

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  openGraph: {
    title: SEO.title,
    description: SEO.description,
    url: SEO.url,
    type: SEO.type,
  },
  twitter: {
    title: SEO.title,
    description: SEO.description,
  },
  robots: SEO.robots,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`min-h-screen flex overflow-y-scroll ${inter.className}`}
      suppressHydrationWarning
    >
      <body className="flex-1 flex">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex flex-col flex-1 bg-slate-100 dark:bg-slate-900">
            <Header />
            <section className="flex-1">{children}</section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
