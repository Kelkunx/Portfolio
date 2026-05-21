import { profile as profileEN } from './locales/en/profile';
import { projects as projectsEN } from './locales/en/projects';
import { profile as profileFR } from './locales/fr/profile';
import { projects as projectsFR } from './locales/fr/projects';

export type ContentLocale = 'fr' | 'en';

export function getProfile(locale: ContentLocale) {
  return locale === 'fr' ? profileFR : profileEN;
}

export function getProjects(locale: ContentLocale) {
  return locale === 'fr' ? projectsFR : projectsEN;
}

const featuredProjectOrder = [
  'shopify-functions-workbench',
  'dashboard-news-ai',
  'edd-shopify',
];

export function getFeaturedProjects(locale: ContentLocale, limit?: number) {
  const projectsBySlug = new Map(getProjects(locale).map((project) => [project.slug, project]));
  const rankedProjects = featuredProjectOrder
    .map((slug) => projectsBySlug.get(slug))
    .filter((project) => project !== undefined);

  return typeof limit === 'number' ? rankedProjects.slice(0, limit) : rankedProjects;
}

export function getArchiveProjects(locale: ContentLocale) {
  const featuredSlugs = new Set(featuredProjectOrder);
  return getProjects(locale).filter((project) => !featuredSlugs.has(project.slug));
}
