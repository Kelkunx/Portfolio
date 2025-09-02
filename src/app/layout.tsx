// app/layout.tsx
import './globals.css'
import React from "react";

export const metadata = {
  title: 'Mon Portfolio — Prénom NOM',
  description: 'Portfolio et CV dynamique — développeur web fullstack',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="bg-white border-b">
          <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-lg font-semibold">Prénom NOM</div>
            <nav className="space-x-4">
              <a href="/" className="hover:underline">Accueil</a>
              <a href="/projets" className="hover:underline">Projets</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </nav>
          </div>
        </header>

        <main className="min-h-[70vh] max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t mt-8">
          <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-slate-600">
            © {new Date().getFullYear()} Prénom NOM — Développeur web
          </div>
        </footer>
      </body>
    </html>
  )
}
