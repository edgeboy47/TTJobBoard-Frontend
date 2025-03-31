import React from 'react'
import Header from "../src/components/Header";
import '../styles/globals.css'

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="min-h-screen" lang="en">
      <body>
        <div className="flex flex-col min-h-full">
          <Header />
          <main className="bg-gray-200">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
