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
