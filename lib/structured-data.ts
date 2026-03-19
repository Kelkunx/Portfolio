import type { Project, Profile } from './content-types';

function toAbsoluteUrl(path: string, baseUrl: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

function normalizeSiteUrl(url: string) {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

function formatProjectDate(date?: string) {
  if (!date) return undefined;

  if (/^\d{4}-\d{2}$/.test(date)) return `${date}-01`;
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  return undefined;
}

export function getSiteUrl() {
  return normalizeSiteUrl(process.env.SITE_URL ?? 'https://leo-jego.vercel.app');
}

export function buildHomeStructuredData(profile: Profile, featuredProjects: Project[]) {
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const profilePageId = `${siteUrl}/#profile-page`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${siteUrl}/`,
      name: 'Portfolio Léo JEGO',
      description: profile.summary,
      inLanguage: 'fr-FR',
      publisher: { '@id': personId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': profilePageId,
      url: `${siteUrl}/`,
      name: 'Léo JEGO — Développeur full-stack',
      description: profile.summary,
      inLanguage: 'fr-FR',
      isPartOf: { '@id': websiteId },
      mainEntity: {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        url: `${siteUrl}/`,
        image: toAbsoluteUrl(profile.avatar, siteUrl),
        jobTitle: profile.title,
        description: profile.shortBio,
        sameAs: [profile.github, profile.linkedin],
        knowsAbout: Array.from(
          new Set([
            ...profile.primaryStack,
            ...profile.valuePillars.flatMap((pillar) => pillar.tools),
            'Développement full-stack',
            'UX',
            'API',
            'Automatisation',
          ])
        ),
        homeLocation: {
          '@type': 'Place',
          name: profile.location,
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${siteUrl}/#featured-projects`,
      name: 'Projets phares de Léo JEGO',
      itemListElement: featuredProjects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/projets/${project.slug}`,
        name: project.title,
        description: project.short,
      })),
    },
  ];
}

export function buildProjectsStructuredData(projects: Project[]) {
  const siteUrl = getSiteUrl();
  const listId = `${siteUrl}/projets#project-list`;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${siteUrl}/projets#collection`,
      url: `${siteUrl}/projets`,
      name: 'Projets — Léo JEGO',
      description:
        'Sélection de projets web présentés avec contexte, rôle, process, solution et résultats.',
      inLanguage: 'fr-FR',
      mainEntity: { '@id': listId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': listId,
      name: 'Projets de Léo JEGO',
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/projets/${project.slug}`,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.short,
          url: `${siteUrl}/projets/${project.slug}`,
        },
      })),
    },
  ];
}

export function buildProjectStructuredData(project: Project, profile: Profile) {
  const siteUrl = getSiteUrl();
  const absoluteUrl = `${siteUrl}/projets/${project.slug}`;
  const publishedDate = formatProjectDate(project.date);
  const imageUrl = project.imageSrc ? toAbsoluteUrl(project.imageSrc, siteUrl) : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${absoluteUrl}#project`,
    url: absoluteUrl,
    mainEntityOfPage: absoluteUrl,
    name: project.title,
    headline: project.tagline,
    description: project.description,
    inLanguage: 'fr-FR',
    genre: project.status,
    keywords: project.tech,
    author: {
      '@type': 'Person',
      name: profile.name,
      url: `${siteUrl}/`,
    },
    creator: {
      '@type': 'Person',
      name: profile.name,
      url: `${siteUrl}/`,
    },
    ...(publishedDate ? { datePublished: publishedDate } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
  };
}
