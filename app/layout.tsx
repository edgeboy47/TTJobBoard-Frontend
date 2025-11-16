import React from 'react'
import { Metadata } from 'next';
import { Inter } from 'next/font/google'

import Header from "../src/components/Header";
import "../src/app/globals.css"
import { SEO } from '../src/constants';

const inter = Inter({
  preload: false
})

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`min-h-screen flex ${inter.className}`} lang="en">
      <body className="flex-1 flex">
        <main className="flex flex-col flex-1 bg-gray-200 ">
          <Header />
          <section className="flex-1">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
