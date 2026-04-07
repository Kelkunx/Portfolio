import type { Project } from '../../content-types';

export const projects: Project[] = [
  {
    slug: 'edd-shopify',
    title: 'Estimated Delivery Date',
    tagline:
      'Application Shopify conçue pour afficher des dates de livraison estimées fiables, lisibles et réellement configurables par les marchands.',
    short: 'Application Shopify de date de livraison estimée avec logique métier et configuration marchande.',
    description:
      "Produit Shopify pensé pour améliorer la transparence côté boutique et donner aux marchands un contrôle fin sur l'affichage des délais.",
    imageSrc: '',
    imageAlt: 'Capture à venir du projet Estimated Delivery Date',
    tech: ['Shopify CLI', 'React', 'TypeScript', 'Polaris', 'App Bridge'],
    date: '2026-03',
    featured: true,
    status: 'Projet produit',
    role: 'Product design, développement full-stack, UX de configuration, logique de calcul.',
    context:
      "Les marchands Shopify utilisent souvent des messages de livraison trop génériques. L'enjeu était de proposer une information plus crédible, tout en gardant une configuration simple côté admin.",
    problem:
      "Comment afficher une date de livraison suffisamment fiable pour rassurer le client, tout en tenant compte des jours ouvrés, des cut-offs, des délais de préparation et des variations d'expédition ?",
    process: [
      "Définition d'une logique de calcul capable de gérer les contraintes métier les plus fréquentes sans rendre l'outil incompréhensible.",
      "Conception d'une interface d'administration claire pour configurer les règles, les templates et les options d'affichage.",
      'Travail sur une architecture maintenable pour permettre des évolutions futures et un développement solo propre.',
    ],
    solution: [
      'Application embarquée dans Shopify Admin avec configuration des règles de livraison et personnalisation du widget.',
      'Theme App Extension légère côté storefront pour afficher la date estimée sur les fiches produit.',
      'Gestion de templates dynamiques, styles, mode compact et logique de plans Free / Pro.',
    ],
    deliverables: [
      'Application Shopify embarquée',
      'Widget storefront',
      'Système de templates',
      'Gestion des plans et options',
    ],
    results: [
      {
        value: 'Calcul métier',
        label: 'Date estimée calculée selon jours ouvrés, heure limite et délais de préparation.',
      },
      {
        value: 'Configuration claire',
        label: 'Personnalisation du rendu et des messages sans complexifier la prise en main.',
      },
      {
        value: 'Architecture maintenable',
        label: 'Produit structuré pour itérer proprement en solo.',
      },
    ],
    screens: [],
    links: [
      { label: 'Voir le code', url: 'https://github.com/Kelkunx/Shopify-Functions-Workbench', type: 'repo' },
      { label: 'Me contacter à propos de ce projet', url: '/contact', type: 'contact' },
    ],
    repoUrl: 'https://github.com/Kelkunx/Shopify-Functions-Workbench',
  },
  {
    slug: 'shopify-functions-workbench',
    title: 'Shopify Functions Workbench',
    tagline:
      'Outil open source de test local pour Shopify Functions, pensé pour exécuter un `.wasm` et inspecter rapidement le résultat sans passer par un cycle complet de déploiement.',
    short:
      'Workbench local pour tester des Shopify Functions `.wasm`, manipuler des inputs JSON et lire le résultat immédiatement.',
    description:
      "Outil développeur open source conçu pour raccourcir la boucle de feedback autour des Shopify Functions et rendre leur test local beaucoup plus confortable.",
    imageSrc: '/images/capture-shopify-functions.png',
    imageAlt: 'Capture du projet Shopify Functions Workbench',
    tech: ['Next.js', 'React', 'NestJS', 'TypeScript', 'Monaco Editor', 'WebAssembly'],
    date: '2026-03',
    featured: true,
    status: 'En cours',
    role: 'Conception produit, UX orientée DX, développement full-stack, exécution locale WebAssembly.',
    context:
      "Tester une Shopify Function reste souvent trop lent et trop dépendant d'un cycle complet de build, déploiement, branchement à une boutique puis vérification du résultat.",
    problem:
      "Comment permettre à un développeur Shopify de charger un `.wasm`, fournir un input JSON réaliste et comprendre immédiatement ce que la fonction renvoie, sans friction inutile ni setup lourd ?",
    process: [
      "Définition d'un MVP centré sur la réduction de la boucle de feedback et la démonstration rapide de la valeur du produit.",
      "Conception d'une interface de type mini-IDE pour séparer clairement le chargement du `.wasm`, l'édition du JSON, le choix du type de function et la lecture du résultat.",
      "Mise en place d'une architecture monorepo simple avec frontend Next.js, backend NestJS et prise en charge d'un mode mock puis d'un chemin d'exécution Shopify réel.",
    ],
    solution: [
      "Web app locale permettant d'uploader un `.wasm`, de choisir un type de function Shopify, d'éditer ou d'importer un input JSON, puis d'exécuter localement.",
      "Éditeur JSON Monaco, templates / fixtures réutilisables, import-export des cas de test et affichage clair des outputs, erreurs et timings.",
      "Backend NestJS exposant un endpoint `/run`, capable de gérer un mode mock rapide et un mode réel basé sur les métadonnées Shopify CLI et `function-runner`.",
    ],
    deliverables: [
      'Monorepo frontend / backend',
      'Runner local `.wasm`',
      'Éditeur JSON Monaco',
      'Fixtures sauvegardées et import/export',
      'Panneaux output / erreurs / timings',
    ],
    results: [
      {
        value: 'Boucle de feedback réduite',
        label: "Le test local devient beaucoup plus rapide à lancer qu'un cycle complet de déploiement Shopify.",
      },
      {
        value: 'DX plus claire',
        label: "L'outil aide à distinguer plus facilement les problèmes de structure JSON, d'exécution et de contrat d'entrée/sortie.",
      },
      {
        value: 'Base open source démontrable',
        label: 'Le MVP est déjà suffisamment concret pour être montré, documenté et enrichi progressivement.',
      },
    ],
    screens: [
      {
        src: '/images/capture-shopify-functions.png',
        alt: 'Capture réelle du Shopify Functions Workbench',
        caption: "Interface locale de test avec upload du `.wasm`, édition JSON, mode d'exécution et panneaux de résultat.",
      },
    ],
    links: [{ label: 'Me contacter à propos de ce projet', url: '/contact', type: 'contact' }],
  },
  {
    slug: 'portfolio',
    title: 'Portfolio personnel',
    tagline:
      'Exemple de portfolio développeur structuré comme une vitrine claire, avec page CV dédiée et fiches projet détaillées.',
    short: 'Portfolio développeur pensé comme vitrine de projets, page CV et point de contact clair.',
    description:
      'Cas de portfolio développeur conçu pour mieux présenter un profil, des projets et des points de contact sans surcharger la lecture.',
    imageSrc: '',
    imageAlt: 'Capture à venir du portfolio personnel',
    tech: ['Next.js', 'React', 'TypeScript', 'MUI'],
    date: '2026-03',
    featured: false,
    status: 'Live',
    role: 'Direction artistique, UI, intégration front, structuration de contenu.',
    context:
      "Beaucoup de portfolios personnels ressemblent soit à un CV en colonnes, soit à une démonstration visuelle trop chargée. L'objectif ici est de proposer une base plus claire et plus réutilisable.",
    problem:
    "Comment structurer un portfolio public de façon crédible, lisible et facilement adaptable, sans dépendre d'un storytelling trop personnel ni d'une DA trop démonstrative ?",
    process: [
      "Travail sur une architecture simple avec une homepage courte, une page CV dédiée et des pages projet plus complètes.",
      'Simplification progressive de la hiérarchie visuelle pour mettre en avant le contenu utile avant les effets de style.',
      "Structuration du contenu pour qu'un autre profil puisse reprendre la base sans avoir à réécrire toute la logique éditoriale.",
    ],
    solution: [
      'Homepage recentrée sur le profil, quelques preuves utiles, les projets phares et le contact.',
      'Page CV dédiée pour sortir les détails de parcours de la homepage.',
      'Structure de case study réutilisable avec contexte, problème, rôle, process, solution et résultats.',
    ],
    deliverables: [
      'Homepage structurée',
      'Page CV dédiée',
      'Fiches projet détaillées',
      'Page contact simple',
    ],
    results: [
      {
        value: 'Structure réutilisable',
        label: "La base peut être adaptée à un autre portfolio sans dépendre d'un contexte trop personnel.",
      },
      {
        value: 'Lecture plus claire',
        label: 'Les informations de profil, de projets et de parcours sont séparées plus proprement.',
      },
      {
        value: 'Base extensible',
        label: 'Le système de sections et de fiches projet peut évoluer sans refaire toute la structure.',
      },
    ],
    screens: [],
    links: [
      { label: 'Voir le site', url: 'https://leo-jego.vercel.app', type: 'demo' },
      { label: 'Voir le code', url: 'https://github.com/Kelkunx/Portfolio', type: 'repo' },
      { label: 'Me contacter', url: '/contact', type: 'contact' },
    ],
    demoUrl: 'https://leo-jego.vercel.app',
    repoUrl: 'https://github.com/Kelkunx/Portfolio',
  },
  {
    slug: 'dashboard-news-ai',
    title: 'Dashboard News AI',
    tagline:
      "Application web qui agrège l'actualité, la filtre par catégories et mots-clés, puis génère un résumé court pour chaque article via IA.",
    short: "Fil d'actualité intelligent avec filtres personnalisés et résumés générés par IA.",
    description:
      "Projet personnel mêlant agrégation de contenus, UI de consultation et génération de résumés pour accélérer la lecture de l'information.",
    imageSrc: '/images/capture-news.png',
    imageAlt: 'Capture du Dashboard News AI',
    tech: ['React', 'NestJS', 'Tailwind', 'HuggingFace'],
    date: '2025-08',
    featured: true,
    status: 'Live',
    role: 'Conception du produit, développement frontend/backend et intégration IA.',
    context:
      "L'idée était de proposer une lecture plus rapide de l'actualité en combinant filtres personnalisés et synthèse automatique des articles.",
    problem:
      'Comment aider un utilisateur à parcourir beaucoup de contenus sans multiplier les clics ni imposer une lecture complète de chaque article ?',
    process: [
      'Conception du parcours de consultation et des filtres pour réduire le bruit côté utilisateur.',
      "Mise en place d'une architecture séparant l'agrégation backend, la logique de résumé et l'affichage côté frontend.",
      "Travail sur l'équilibre entre richesse de l'information, rapidité de lecture et simplicité visuelle.",
    ],
    solution: [
      'Frontend React pour parcourir rapidement les articles avec filtres et recherche.',
      'Backend NestJS pour agréger les données et orchestrer les résumés générés par modèle IA.',
      "Présentation compacte de l'information avec résumé court, métadonnées et catégorisation.",
    ],
    deliverables: ['Interface React', 'API NestJS', 'Filtres personnalisés', 'Résumés IA'],
    results: [
      {
        value: 'Lecture accélérée',
        label: "Chaque article est résumé en quelques lignes pour aller à l'essentiel.",
      },
      {
        value: 'Filtres utiles',
        label: 'Navigation par catégories et mots-clés pour cibler rapidement les sujets pertinents.',
      },
      {
        value: 'Architecture claire',
        label: "Séparation front / back facilitant l'évolution du produit.",
      },
    ],
    screens: [
      {
        src: '/images/capture-news.png',
        alt: 'Capture réelle du Dashboard News AI',
        caption: 'Capture du dashboard avec cartes articles, filtres et aperçu des résumés.',
      },
    ],
    links: [
      { label: 'Voir la démo', url: 'https://dashboard-news-ai.vercel.app', type: 'demo' },
      { label: 'Voir le code', url: 'https://github.com/Kelkunx/dashboard-news-ai', type: 'repo' },
      { label: 'Me contacter', url: '/contact', type: 'contact' },
    ],
    demoUrl: 'https://dashboard-news-ai.vercel.app',
    repoUrl: 'https://github.com/Kelkunx/dashboard-news-ai',
  },
  {
    slug: 'bts-baie-securisee',
    title: 'Projet BTS — Baie serveur sécurisée',
    tagline:
      "Projet académique autour de la conception d'une baie serveur sécurisée avec réseau, supervision, contrôle d'accès et capteurs environnementaux.",
    short: "Conception d'une baie serveur sécurisée avec réseau, RADIUS, supervision et capteurs.",
    description:
      "Projet de BTS mêlant infrastructure, réseau, sécurité et intégration matérielle dans un scénario d'entreprise fictive.",
    imageSrc: '',
    imageAlt: 'Capture à venir du projet baie serveur sécurisée',
    tech: ['Active Directory', 'Cisco', 'RADIUS', 'Arduino'],
    date: '2024-06',
    featured: false,
    status: 'Projet académique',
    role: 'Configuration réseau, serveur RADIUS, intégration capteurs et documentation.',
    context:
      "Le projet simulait la mise en place d'une infrastructure sécurisée pour une entreprise fictive avec services réseau, NAS, vidéosurveillance et supervision.",
    problem:
      'Comment proposer une architecture cohérente intégrant authentification, segmentation, surveillance physique et collecte environnementale dans un cadre pédagogique ?',
    process: [
      "Définition de l'architecture technique et répartition des composants au sein de la baie.",
      'Configuration réseau, déploiement des services et branchement des équipements de supervision.',
      'Documentation des choix techniques et des étapes de mise en place.',
    ],
    solution: [
      "Mise en place d'un serveur RADIUS relié à une borne Wi-Fi Cisco.",
      'Ajout de capteurs de mouvement, température et humidité avec Arduino.',
      'Intégration dans une architecture incluant Active Directory, NAS et vidéosurveillance.',
    ],
    deliverables: ['Serveur RADIUS', 'Capteurs Arduino', 'Architecture réseau', 'Documentation'],
    results: [
      {
        value: 'Architecture complète',
        label: 'Projet couvrant réseau, authentification, stockage, supervision et environnement.',
      },
      {
        value: 'Vision transverse',
        label: 'Mise en relation de problématiques infrastructure, sécurité et matériel.',
      },
      {
        value: 'Projet documenté',
        label: 'Choix et configuration suffisamment explicités pour être repris et présentés.',
      },
    ],
    screens: [],
    links: [{ label: 'Me contacter à propos de ce projet', url: '/contact', type: 'contact' }],
  },
];
