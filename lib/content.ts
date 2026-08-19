import { profile as profileEN } from './locales/en/profile';
import { projects as projectsEN } from './locales/en/projects';
import { profile as profileFR } from './locales/fr/profile';
import { projects as projectsFR } from './locales/fr/projects';
import type { ProjectCategory, ProjectPeriod, ProjectStatus } from './content-types';

export type ContentLocale = 'fr' | 'en';

export function getProfile(locale: ContentLocale) {
  return locale === 'fr' ? profileFR : profileEN;
}

// Editorial ranking stays independent from the order of localized content files.
const projectDisplayOrder = [
  'shopify-functions-workbench',
  'edd-shopify',
  'dashboard-news-ai',
  'portfolio',
  'bts-baie-securisee',
];

const featuredProjectCount = 3;

const statusLabels: Record<ContentLocale, Record<ProjectStatus, string>> = {
  fr: {
    'in-progress': 'En cours',
    live: 'En ligne',
    completed: 'Terminé',
  },
  en: {
    'in-progress': 'In progress',
    live: 'Live',
    completed: 'Completed',
  },
};

const categoryLabels: Record<ContentLocale, Record<ProjectCategory, string>> = {
  fr: {
    'open-source': 'Open source',
    product: 'Produit',
    personal: 'Personnel',
    academic: 'Académique',
  },
  en: {
    'open-source': 'Open source',
    product: 'Product',
    personal: 'Personal',
    academic: 'Academic',
  },
};

export function getProjects(locale: ContentLocale) {
  const localizedProjects = locale === 'fr' ? projectsFR : projectsEN;
  const projectsBySlug = new Map(localizedProjects.map((project) => [project.slug, project]));

  return projectDisplayOrder
    .map((slug) => projectsBySlug.get(slug))
    .filter((project) => project !== undefined);
}

export function getFeaturedProjects(locale: ContentLocale, limit?: number) {
  const featuredProjects = getProjects(locale).slice(0, featuredProjectCount);

  return typeof limit === 'number' ? featuredProjects.slice(0, limit) : featuredProjects;
}

export function getArchiveProjects(locale: ContentLocale) {
  return getProjects(locale).slice(featuredProjectCount);
}

export function getProjectStatusLabel(status: ProjectStatus, locale: ContentLocale) {
  return statusLabels[locale][status];
}

export function getProjectCategoryLabel(category: ProjectCategory, locale: ContentLocale) {
  return categoryLabels[locale][category];
}

export function formatProjectPeriod(
  period: ProjectPeriod,
  locale: ContentLocale,
  month: 'short' | 'long' = 'short',
) {
  const formatter = new Intl.DateTimeFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month,
    timeZone: 'UTC',
  });
  const formatMonth = (value: string) => {
    const match = /^(\d{4})-(\d{2})$/.exec(value);
    if (!match) return value;

    return formatter.format(new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1)));
  };
  const start = formatMonth(period.start);

  if (!period.end || period.end === period.start) return start;
  return `${start} — ${formatMonth(period.end)}`;
}
