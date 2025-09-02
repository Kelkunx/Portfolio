// app/layout.tsx
import './globals.css';
import React from 'react';
import Providers from './providers';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Mon Portfolio — Léo JEGO',
  description: 'Portfolio — Développeur web fullstack',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <Header />
          <main style={{ minHeight: '70vh' }}>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
