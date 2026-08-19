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
    imageSrc: '/images/capture-edd.png',
    imageAlt: 'Capture du projet Estimated Delivery Date',
    tech: ['Shopify CLI', 'React', 'TypeScript', 'Polaris', 'App Bridge'],
    period: { start: '2026-03' },
    status: 'in-progress',
    category: 'product',
    role: 'Product design, développement full-stack, UX de configuration, logique de calcul.',
    context:
      "Les marchands Shopify utilisent souvent des messages de livraison trop génériques. L'enjeu était de proposer une information plus crédible, tout en gardant une configuration simple côté admin.",
    problem:
      "Comment afficher une date de livraison suffisamment fiable pour rassurer le client, tout en tenant compte des jours ouvrés, des cut-offs, des délais de préparation et des variations d'expédition ?",
    process: [
      "Définition d'une logique de calcul capable de gérer les contraintes métier les plus fréquentes sans rendre l'outil incompréhensible.",
      "Conception d'une interface d'administration claire pour configurer les règles, les templates et les options d'affichage.",
      "Séparation de la logique de calcul, de la configuration marchande et du rendu Theme App Extension pour faire évoluer chaque partie sans couplage inutile.",
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
    highlights: [
      {
        value: '4 paramètres métier',
        label: 'Le calcul combine jours ouvrés, heure limite, préparation et plage d’expédition.',
      },
      {
        value: 'Aperçu instantané',
        label: 'Le marchand visualise le widget pendant le réglage des couleurs, du titre, de l’icône et du mode compact.',
      },
      {
        value: '2 surfaces Shopify',
        label: 'Une application embarquée pilote la configuration et une Theme App Extension affiche le résultat en boutique.',
      },
    ],
    screens: [
      {
        src: '/images/capture-edd.png',
        alt: 'Capture réelle du projet Estimated Delivery Date',
        caption: "Écran de configuration Shopify avec aperçu du widget, couleurs, icône, titre et options de mise en page.",
      },
    ],
    links: [{ label: 'Me contacter à propos de ce projet', url: '/contact', type: 'contact' }],
  },
  {
    slug: 'shopify-functions-workbench',
    title: 'Shopify Functions Workbench',
    tagline:
      'Workbench open source pour exécuter, benchmarker et déboguer des Shopify Functions localement avant déploiement.',
    short:
      'Outil local pour lancer des Shopify Functions `.wasm`, manipuler des inputs JSON, inspecter les erreurs et comparer les timings.',
    description:
      "Outil développeur open source conçu pour raccourcir la boucle de feedback autour des Shopify Functions, avec runner local, scénarios sauvegardés, diagnostics et benchmark.",
    imageSrc: '/images/capture-shopify-functions.png',
    imageAlt: 'Capture du projet Shopify Functions Workbench',
    tech: ['Next.js', 'React', 'NestJS', 'TypeScript', 'Monaco Editor', 'WebAssembly'],
    period: { start: '2026-03' },
    status: 'in-progress',
    category: 'open-source',
    role: 'Conception produit, UX orientée DX, développement full-stack, runner Shopify local et benchmark.',
    context:
      "Tester une Shopify Function reste souvent trop lent et trop dépendant d'un cycle complet de build, déploiement, branchement à une boutique puis vérification du résultat.",
    problem:
      "Comment permettre à un développeur Shopify de charger un `.wasm`, fournir un input JSON réaliste et distinguer rapidement une erreur de payload, de configuration ou d’exécution ?",
    process: [
      "Définition d'un contrat `/run` unique pour envoyer le Wasm, l’input JSON et les métadonnées nécessaires au runner.",
      "Validation du chemin Shopify réel avec trois exemples prêts à lancer : product discount, delivery customization et cart transform.",
      "Organisation de l’interface en trois zones stables — setup, input JSON et résultat — puis ajout des scénarios, diagnostics et benchmarks autour de ce flux principal.",
    ],
    solution: [
      "Web app locale permettant d'uploader un `.wasm`, de choisir un type de function Shopify, d'éditer un input JSON et de lancer un run ou un benchmark.",
      "Éditeur JSON Monaco, scénarios sauvegardés dans le navigateur, import/export, actions sur l'output et drawer de détails pour les timings.",
      "Backend NestJS exposant un endpoint `/run`, avec mode mock, mode Shopify réel via les métadonnées CLI et exemples officiels product discount, delivery customization et cart transform.",
    ],
    deliverables: [
      'Monorepo frontend / backend',
      'Runner local `.wasm`',
      'Éditeur JSON Monaco',
      'Scénarios sauvegardés et import/export',
      'Benchmark et diagnostics structurés',
      'Exemples Shopify prêts à lancer',
    ],
    highlights: [
      {
        value: '3 exemples exécutables',
        label: 'Product discount, delivery customization et cart transform incluent un Wasm et un payload prêts à tester.',
      },
      {
        value: 'Run + benchmark',
        label: 'Le même endpoint renvoie output, erreurs structurées, diagnostics du runner et timings locaux détaillés.',
      },
      {
        value: 'Scénarios portables',
        label: 'Les configurations de test sont sauvegardées dans le navigateur, exportables et réimportables.',
      },
    ],
    screens: [
      {
        src: '/images/capture-shopify-functions.png',
        alt: 'Capture réelle du Shopify Functions Workbench',
        caption: 'Run Shopify local réussi : cible product discount, input JSON, output structuré, zéro erreur et timing de diagnostic.',
      },
    ],
    links: [
      { label: 'Voir le code', url: 'https://github.com/Kelkunx/Shopify-Functions-Workbench', type: 'repo' },
      { label: 'Me contacter à propos de ce projet', url: '/contact', type: 'contact' },
    ],
  },
  {
    slug: 'portfolio',
    title: 'Portfolio personnel',
    tagline:
      'Exemple de portfolio développeur structuré comme une vitrine claire, avec page CV dédiée et fiches projet détaillées.',
    short: 'Portfolio développeur pensé comme vitrine de projets, page CV et point de contact clair.',
    description:
      'Cas de portfolio développeur conçu pour mieux présenter un profil, des projets et des points de contact sans surcharger la lecture.',
    imageSrc: '/images/capture-portfolio.png',
    imageAlt: 'Capture du portfolio personnel',
    tech: ['Next.js', 'React', 'TypeScript', 'MUI'],
    period: { start: '2025-09' },
    status: 'live',
    category: 'personal',
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
    highlights: [
      {
        value: '4 parcours dédiés',
        label: 'Accueil, projets, CV et contact disposent chacun d’une hiérarchie et de métadonnées propres.',
      },
      {
        value: 'Contenu typé FR / EN',
        label: 'Le profil et les projets partagent un modèle TypeScript validé automatiquement entre les deux langues.',
      },
      {
        value: 'SEO vérifiable',
        label: 'Canonical, sitemap, JSON-LD et métadonnées Open Graph sont générés pour les principales routes.',
      },
    ],
    screens: [
      {
        src: '/images/capture-portfolio.png',
        alt: 'Capture réelle du portfolio personnel',
        caption: 'Aperçu de la homepage avec hero, navigation et présentation structurée du profil.',
      },
    ],
    links: [
      { label: 'Voir le site', url: 'https://leo-jego.vercel.app', type: 'demo' },
      { label: 'Voir le code', url: 'https://github.com/Kelkunx/Portfolio', type: 'repo' },
      { label: 'Me contacter', url: '/contact', type: 'contact' },
    ],
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
    period: { start: '2025-08' },
    status: 'live',
    category: 'personal',
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
    highlights: [
      {
        value: '2 filtres combinables',
        label: 'La catégorie et le mot-clé réduisent le flux avant consultation des articles.',
      },
      {
        value: '1 résumé par article',
        label: 'Le résumé généré est affiché avec l’extrait source pour conserver le contexte de lecture.',
      },
      {
        value: '3 couches séparées',
        label: 'React gère la consultation, NestJS l’agrégation et HuggingFace la génération des résumés.',
      },
    ],
    screens: [
      {
        src: '/images/capture-news.png',
        alt: 'Capture réelle du Dashboard News AI',
        caption: 'Flux réel avec filtre par catégorie, recherche par mot-clé, extrait source et résumé IA pour chaque article.',
      },
    ],
    links: [
      { label: 'Voir la démo', url: 'https://dashboard-news-ai.vercel.app', type: 'demo' },
      { label: 'Voir le code', url: 'https://github.com/Kelkunx/dashboard-news-ai', type: 'repo' },
      { label: 'Me contacter', url: '/contact', type: 'contact' },
    ],
  },
  {
    slug: 'bts-baie-securisee',
    title: 'Projet BTS — Baie serveur sécurisée',
    tagline:
      "Projet académique autour de la conception d'une baie serveur sécurisée avec réseau, supervision, contrôle d'accès et capteurs environnementaux.",
    short: "Conception d'une baie serveur sécurisée avec réseau, RADIUS, supervision et capteurs.",
    description:
      "Projet de BTS mêlant infrastructure, réseau, sécurité et intégration matérielle dans un scénario d'entreprise fictive.",
    imageSrc: '/images/capture-baie-serveur.png',
    imageAlt: 'Capture du projet baie serveur sécurisée',
    tech: ['Active Directory', 'Cisco', 'RADIUS', 'Arduino'],
    period: { start: '2024-06' },
    status: 'completed',
    category: 'academic',
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
    highlights: [
      {
        value: 'RADIUS + Cisco',
        label: 'Le contrôle d’accès Wi-Fi s’appuie sur un serveur RADIUS relié à une borne Cisco.',
      },
      {
        value: '3 mesures terrain',
        label: 'Des capteurs Arduino suivent le mouvement, la température et l’humidité autour de la baie.',
      },
      {
        value: '1 schéma de synthèse',
        label: 'Le diagramme relie les services réseau, le stockage, la vidéosurveillance et la supervision.',
      },
    ],
    screens: [
      {
        src: '/images/capture-baie-serveur.png',
        alt: 'Capture réelle du projet baie serveur sécurisée',
        caption: 'Vue du projet de baie serveur sécurisée avec infrastructure réseau, sécurité et intégration matérielle.',
      },
      {
        src: '/images/diagramme-baie-serveur.png',
        alt: 'Diagramme du projet baie serveur sécurisée',
        caption: "Diagramme d'architecture montrant les principaux éléments réseau, sécurité et supervision du projet.",
      },
    ],
    links: [{ label: 'Me contacter à propos de ce projet', url: '/contact', type: 'contact' }],
  },
];
