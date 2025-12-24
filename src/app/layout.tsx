// app/layout.tsx
import './globals.css';
import React from 'react';
import Providers from './providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Space_Grotesk, IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import { LocaleProvider } from '../context/LocaleContext';
import { Analytics } from '@vercel/analytics/next';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '600'],
});

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Léo JEGO — Développeur Fullstack';
  const description = 'Portfolio de Léo JEGO — React, Next.js, NestJS. CV dynamique et projets.';
  const base = process.env.SITE_URL ?? 'https://leo-jego.vercel.app';

  const v = process.env.NEXT_PUBLIC_OG_VERSION ?? String(Date.now());

  const ogUrl = `${base}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Portfolio — Projets & CV')}&mode=dark&v=${v}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: base,
      siteName: 'Léo JEGO — Portfolio',
      type: 'website',
      images: [{ url: ogUrl, width: 1200, height: 630, alt: 'Léo JEGO — Portfolio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogUrl],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable}`}>
        <Providers>
          <LocaleProvider>
            <a href="#main-content" className="skip-link">Aller au contenu</a>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </LocaleProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
