import React from 'react'
import { Metadata } from 'next';

import Header from "../src/components/Header";
import "../src/app/globals.css"
import { SEO } from '../src/constants';

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
    <html className="min-h-screen flex" lang="en">
      <body className="flex-1 flex">
        <div className="flex flex-col flex-1">
          <Header />
          <main className="bg-gray-200 flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
