// src/lib/projects.ts
export type Project = {
  slug: string;
  title: string;
  short: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  tech: string[];
  demoUrl?: string;
  repoUrl?: string;
  date?: string;
};

export const projects: Project[] = [
  {
    slug: 'portfolio',
    title: 'Portfolio personnel',
    short: 'CV dynamique et vitrine de mes projets',
    description:
      "Ce site web est mon portfolio personnel. "
      + "Il présente mes compétences, mes expériences et mes projets. "
      + "Développé avec Next.js et React, il utilise MUI pour le design et suit une architecture moderne. "
      + "Il inclut une page contact avec mes coordonnées et un accès direct à mon CV en PDF.",
    imageSrc: 'https://placehold.co/600x400?text=No+Image', // capture de ton portfolio une fois déployé
    imageAlt: 'Capture du portfolio personnel',
    tech: ['Next.js', 'React', 'TypeScript', 'MUI'],
    demoUrl: 'https://leo-jego.vercel.app', // à mettre une fois déployé
    repoUrl: 'https://github.com/Kelkunx/Portfolio', // si tu veux rendre public
    date: '2025-09',
  },
  {
    slug: 'dashboard-news-ai',
    title: 'My News App',
    short: "Fil d'actualité intelligent avec IA et filtres personnalisés",
    description:
      "Application web affichant un fil d'actualité filtrable par catégories et mots-clés. "
      + "Chaque article est accompagné d'un résumé court généré automatiquement par un modèle d'IA HuggingFace. "
      + "Le projet combine un front React avec Tailwind CSS et un back NestJS pour l'agrégation des données.",
    imageSrc: '/images/capture-news.png', // capture de ton app une fois déployée
    imageAlt: 'Capture du Dashboard News AI',
    tech: ['React', 'NestJS', 'Tailwind', 'HuggingFace'],
    demoUrl: 'https://dashboard-news-ai.vercel.app', // à mettre une fois déployé
    repoUrl: 'https://github.com/Kelkunx/dashboard-news-ai', // à remplacer si tu publies
    date: '2025-08',
  },
  {
    slug: 'bts-baie-securisee',
    title: 'Projet BTS — Baie serveur sécurisée',
    short: "Mise en place d'une baie serveur sécurisée pour une entreprise fictive",
    description:
      "Projet scolaire réalisé en BTS : conception et mise en place d'une baie serveur sécurisée. "
      + "Elle incluait un serveur Active Directory, un réseau ethernet et un réseau wifi, un NAS, un système de caméras avec détection de mouvement, "
      + "et un monitoring de la température et de l'humidité. "
      + "J'ai personnellement installé un serveur RADIUS relié à une borne wifi Cisco et configuré des capteurs de mouvement, de température et d'humidité avec Arduino.",
    imageSrc: 'https://placehold.co/600x400?text=No+Image', // image illustrative
    imageAlt: "Illustration d'une baie serveur sécurisée",
    tech: ['Active Directory', 'Cisco', 'RADIUS', 'Arduino'],
    date: '2024-06',
  },
];
