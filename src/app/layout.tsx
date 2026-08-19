// app/layout.tsx
import './globals.css';
import React from 'react';
import Providers from './providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import { LocaleProvider } from '../context/LocaleContext';
import { Analytics } from '@vercel/analytics/next';
import { buildPageMetadata, SITE_URL } from '../../lib/site-metadata';

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
const defaultTitle = 'Léo JEGO — Développeur full-stack';
const defaultDescription =
  'Portfolio de Léo JEGO. Interfaces web claires, outils métier, React, Next.js, NestJS, CV dynamique et case studies.';
const rootMetadata = buildPageMetadata({
  title: defaultTitle,
  description: defaultDescription,
  path: '/',
  socialTitle: defaultTitle,
  socialSubtitle: 'Portfolio — projets, CV et contact',
});

export const metadata: Metadata = {
  ...rootMetadata,
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: '%s | Léo JEGO',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  verification: {
    google: 'CH9of0A9cGpKrZE3ytv4A6zQrkZEvofWFVkUSWyxjHc',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${spaceGrotesk.variable} ${ibmPlexSans.variable}`}>
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
