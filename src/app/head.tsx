// app/head.tsx
export default function Head() {
  return (
    <>
      {/* Métadonnées de base (charset + viewport sont gérées automatiquement par Next mais on peut les expliciter) */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      {/* Title / description — si tu exports `metadata` dans layout, Next gère le <title> automatiquement.
          Ici on peut ajouter des meta complémentaires (open graph, twitter, canonical, favicon, preload...) */}
      <meta name="description" content="Portfolio de Léo JEGO — Développeur Fullstack (React, Next.js, NestJS). CV dynamique et projets." />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Léo JEGO — Portfolio" />
      <meta property="og:title" content="Léo JEGO — Développeur Fullstack" />
      <meta property="og:description" content="Portfolio — Projets, expériences et contact" />
      <meta property="og:url" content="https://ton-domaine.com" />
      <meta property="og:image" content="https://ton-domaine.com/og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Léo JEGO — Développeur Fullstack" />
      <meta name="twitter:description" content="Portfolio — Projets, expériences et contact" />
      <meta name="twitter:image" content="https://ton-domaine.com/og-image.png" />

      {/* Canonical */}
      <link rel="canonical" href="https://ton-domaine.com" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />

      {/* Préconnect / Preload (fonts & images critiques) */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preload" as="image" href="/images/hero.jpg" />

      {/* Exemple : charger un script analytics asynchrone (placer ici si tu veux qu'il soit global) */}
      {/* <script async defer data-domain="ton-domaine.com" src="https://plausible.io/js/plausible.js"></script> */}

      {/* Robots (optionnel) */}
      <meta name="robots" content="index, follow" />
    </>
  );
}
