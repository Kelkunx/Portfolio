// lib/locales/fr/projects.ts
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
    slug: 'edd-shopify',
    title: 'Estimated Delivery Date',
    short:
      'Application Shopify pour afficher des dates de livraison estimées précises et personnalisables',
    description:
      'Estimated Delivery Date est une application Shopify embarquée conçue pour afficher dynamiquement des dates de livraison estimées sur les pages produits. ' +
      "Elle permet aux marchands d'améliorer la transparence, la confiance et le taux de conversion en communiquant des délais fiables aux clients. " +
      "L'application intègre une logique avancée de calcul prenant en compte les jours ouvrés, les heures limites de commande, les délais de préparation et les plages d'expédition. " +
      "Elle propose également un système de templates avec variables dynamiques, un haut niveau de personnalisation du widget (couleurs, style, mode compact, icône, etc.), ainsi qu'une gestion des fonctionnalités via un système de plans (Free / Pro). " +
      "Développée avec Shopify CLI, React et TypeScript, elle utilise Polaris et App Bridge pour une intégration native dans l'admin Shopify, ainsi qu'une Theme App Extension pour un rendu léger côté storefront. " +
      "Le projet met l'accent sur une UX claire, une configuration simple pour les marchands, une excellente fiabilité des calculs et une architecture maintenable pour un développement en solo.",
    imageSrc: '',
    imageAlt: 'Widget de date de livraison estimée sur une page produit Shopify',
    tech: ['Shopify CLI', 'React', 'TypeScript', 'Polaris', 'Shopify App Bridge'],
    date: '2026-03',
  },
  {
    slug: 'portfolio',
    title: 'Portfolio personnel',
    short: 'CV dynamique et vitrine de mes projets',
    description:
      'Ce site web est mon portfolio personnel. Il présente mes compétences, mes expériences et mes projets. ' +
      'Développé avec Next.js et React, il utilise MUI pour le design et suit une architecture moderne. ' +
      'Il inclut une page contact avec mes coordonnées et un accès direct à mon CV en PDF.',
    imageSrc: '',
    imageAlt: 'Capture du portfolio personnel',
    tech: ['Next.js', 'React', 'TypeScript', 'MUI'],
    demoUrl: 'https://leo-jego.vercel.app',
    repoUrl: 'https://github.com/Kelkunx/Portfolio',
    date: '2025-09',
  },
  {
    slug: 'dashboard-news-ai',
    title: 'Dashboard News (IA)',
    short: "Fil d'actualité intelligent avec IA et filtres personnalisés",
    description:
      "Application web affichant un fil d'actualité filtrable par catégories et mots-clés. " +
      "Chaque article est accompagné d'un résumé court généré automatiquement par un modèle d'IA (HuggingFace). " +
      "Le projet combine un front React avec Tailwind CSS et un back NestJS pour l'agrégation des données.",
    imageSrc: '/images/capture-news.png',
    imageAlt: 'Capture du Dashboard News AI',
    tech: ['React', 'NestJS', 'Tailwind', 'HuggingFace'],
    demoUrl: 'https://dashboard-news-ai.vercel.app',
    repoUrl: 'https://github.com/Kelkunx/dashboard-news-ai',
    date: '2025-08',
  },
  {
    slug: 'bts-baie-securisee',
    title: 'Projet BTS — Baie serveur sécurisée',
    short: "Mise en place d'une baie serveur sécurisée pour une entreprise fictive",
    description:
      "Projet scolaire réalisé en BTS : conception et mise en place d'une baie serveur sécurisée. " +
      'Elle incluait un serveur Active Directory, un réseau ethernet et un réseau wifi, un NAS, un système de caméras avec détection de mouvement, ' +
      "et un monitoring de la température et de l'humidité. " +
      "J'ai personnellement installé un serveur RADIUS relié à une borne wifi Cisco et configuré des capteurs de mouvement, de température et d'humidité avec Arduino.",
    imageSrc: '',
    imageAlt: "Illustration d'une baie serveur sécurisée",
    tech: ['Active Directory', 'Cisco', 'RADIUS', 'Arduino'],
    date: '2024-06',
  },
];
