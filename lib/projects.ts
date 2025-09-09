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
    slug: 'app-commandes',
    title: 'App Commandes',
    short: "Import & gestion — front React + API NestJS",
    description:
      "Application interne de gestion des commandes. Front React (hooks, context), back NestJS (REST), import de fichiers CSV et tests E2E.",
    imageSrc: '/images/app-commandes.png',
    imageAlt: 'Capture App Commandes',
    tech: ['React', 'NestJS', 'TypeScript'],
    demoUrl: 'https://demo.example.com/app-commandes',
    repoUrl: 'https://gitlab.com/ton-namespace/app-commandes',
    date: '2025-06',
  },
  {
    slug: 'blog-next',
    title: 'Blog statique',
    short: 'Blog statique performant avec Next.js & MDX',
    description: 'Blog optimisé SEO, génération SSG, composants MDX réutilisables.',
    imageSrc: '/images/blog-next.png',
    imageAlt: 'Capture Blog Next',
    tech: ['Next.js', 'Vercel'],
    repoUrl: 'https://github.com/ton-namespace/blog-next',
    date: '2024-11',
  },
  // autres projets...
];
