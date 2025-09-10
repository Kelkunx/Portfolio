// app/layout.tsx
import './globals.css';
import React from 'react';
import Providers from './providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata = {
  title: 'Léo JEGO — Développeur Fullstack',
  description: 'Portfolio de Léo JEGO — React, Next.js, NestJS. CV dynamique et projets.',
  openGraph: {
    title: 'Léo JEGO — Développeur Fullstack',
    description: 'Portfolio — Projets, expériences et contact',
    url: 'https://ton-domaine.com',
    siteName: 'Léo JEGO — Portfolio',
    images: [
      {
        url: 'https://ton-domaine.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Léo Jego — Portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Léo JEGO — Développeur Fullstack',
    description: 'Portfolio — Projets, expériences et contact',
    images: ['https://ton-domaine.com/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.variable}>
        <Providers>
          <a href="#main-content" className="skip-link">Aller au contenu</a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
