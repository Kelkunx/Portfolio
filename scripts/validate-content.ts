import { existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';

import { getFeaturedProjects, getProjects } from '../lib/content';
import type { Profile, Project } from '../lib/content-types';
import { profile as profileEN } from '../lib/locales/en/profile';
import { projects as projectsEN } from '../lib/locales/en/projects';
import { profile as profileFR } from '../lib/locales/fr/profile';
import { projects as projectsFR } from '../lib/locales/fr/projects';

type Locale = 'fr' | 'en';

const errors: string[] = [];
const publicDirectory = resolve(process.cwd(), 'public');
const expectedFeaturedSlugs = [
  'shopify-functions-workbench',
  'edd-shopify',
  'dashboard-news-ai',
];

function check(condition: boolean, message: string) {
  if (!condition) errors.push(message);
}

function isNonEmptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function checkNonEmptyList(items: unknown[], label: string) {
  check(items.length > 0, `${label} ne doit pas être vide.`);
}

function checkLocalAsset(assetPath: string, label: string) {
  check(assetPath.startsWith('/'), `${label} doit utiliser un chemin public absolu.`);
  if (!assetPath.startsWith('/')) return;

  const resolvedAsset = resolve(publicDirectory, assetPath.slice(1));
  const staysInPublic = resolvedAsset.startsWith(`${publicDirectory}${sep}`);
  check(staysInPublic, `${label} sort du dossier public.`);
  if (staysInPublic) check(existsSync(resolvedAsset), `${label} est introuvable : ${assetPath}`);
}

function checkUrl(url: string, label: string) {
  if (url.startsWith('/')) return;

  try {
    const parsedUrl = new URL(url);
    check(parsedUrl.protocol === 'https:', `${label} doit utiliser HTTPS : ${url}`);
  } catch {
    check(false, `${label} est invalide : ${url}`);
  }
}

function checkProject(project: Project, locale: Locale) {
  const projectLabel = `[${locale}] Projet ${project.slug}`;
  const requiredText = {
    slug: project.slug,
    title: project.title,
    tagline: project.tagline,
    short: project.short,
    description: project.description,
    role: project.role,
    context: project.context,
    problem: project.problem,
  };

  Object.entries(requiredText).forEach(([field, value]) => {
    check(isNonEmptyText(value), `${projectLabel} : le champ ${field} est vide.`);
  });

  check(/^\d{4}-(0[1-9]|1[0-2])$/.test(project.period.start), `${projectLabel} : date de début invalide.`);
  if (project.period.end) {
    check(/^\d{4}-(0[1-9]|1[0-2])$/.test(project.period.end), `${projectLabel} : date de fin invalide.`);
    check(project.period.end >= project.period.start, `${projectLabel} : la période se termine avant son début.`);
  }

  checkNonEmptyList(project.tech, `${projectLabel} : la stack`);
  checkNonEmptyList(project.process, `${projectLabel} : le process`);
  checkNonEmptyList(project.solution, `${projectLabel} : les solutions`);
  checkNonEmptyList(project.deliverables, `${projectLabel} : les livrables`);
  checkNonEmptyList(project.highlights, `${projectLabel} : les points clés`);
  checkNonEmptyList(project.screens, `${projectLabel} : les captures`);
  checkNonEmptyList(project.links, `${projectLabel} : les liens`);

  project.tech.forEach((technology, index) => {
    check(isNonEmptyText(technology), `${projectLabel} : technologie vide à l'index ${index}.`);
  });
  [...project.process, ...project.solution, ...project.deliverables].forEach((text, index) => {
    check(isNonEmptyText(text), `${projectLabel} : élément éditorial vide à l'index ${index}.`);
  });
  project.highlights.forEach((highlight, index) => {
    check(isNonEmptyText(highlight.value), `${projectLabel} : valeur du point clé ${index} vide.`);
    check(isNonEmptyText(highlight.label), `${projectLabel} : description du point clé ${index} vide.`);
  });

  if (project.imageSrc) {
    checkLocalAsset(project.imageSrc, `${projectLabel} : image principale`);
    check(isNonEmptyText(project.imageAlt), `${projectLabel} : texte alternatif de l'image principale vide.`);
    check(project.screens[0]?.src === project.imageSrc, `${projectLabel} : la première capture doit être l'image principale.`);
  } else {
    check(false, `${projectLabel} : image principale manquante.`);
  }

  const screenSources = new Set<string>();
  project.screens.forEach((screen, index) => {
    checkLocalAsset(screen.src, `${projectLabel} : capture ${index + 1}`);
    check(isNonEmptyText(screen.alt), `${projectLabel} : texte alternatif de la capture ${index + 1} vide.`);
    check(isNonEmptyText(screen.caption), `${projectLabel} : légende de la capture ${index + 1} vide.`);
    check(!screenSources.has(screen.src), `${projectLabel} : capture dupliquée ${screen.src}.`);
    screenSources.add(screen.src);
  });

  const linkKeys = new Set<string>();
  project.links.forEach((link, index) => {
    check(isNonEmptyText(link.label), `${projectLabel} : libellé du lien ${index + 1} vide.`);
    checkUrl(link.url, `${projectLabel} : lien ${index + 1}`);
    const linkKey = `${link.type}:${link.url}`;
    check(!linkKeys.has(linkKey), `${projectLabel} : lien dupliqué ${link.url}.`);
    linkKeys.add(linkKey);
  });
}

function checkUniqueSlugs(projects: Project[], locale: Locale) {
  const slugs = new Set<string>();
  projects.forEach((project) => {
    check(!slugs.has(project.slug), `[${locale}] Slug de projet dupliqué : ${project.slug}.`);
    slugs.add(project.slug);
  });
}

function checkProjectParity() {
  const frBySlug = new Map(projectsFR.map((project) => [project.slug, project]));
  const enBySlug = new Map(projectsEN.map((project) => [project.slug, project]));
  const frSlugs = [...frBySlug.keys()].sort();
  const enSlugs = [...enBySlug.keys()].sort();

  check(JSON.stringify(frSlugs) === JSON.stringify(enSlugs), 'Les locales FR et EN doivent exposer les mêmes slugs.');

  frSlugs.forEach((slug) => {
    const projectFR = frBySlug.get(slug);
    const projectEN = enBySlug.get(slug);
    if (!projectFR || !projectEN) return;

    const sharedFieldsFR = {
      tech: projectFR.tech,
      period: projectFR.period,
      status: projectFR.status,
      category: projectFR.category,
      imageSrc: projectFR.imageSrc,
      contentShape: {
        process: projectFR.process.length,
        solution: projectFR.solution.length,
        deliverables: projectFR.deliverables.length,
        highlights: projectFR.highlights.length,
      },
      screens: projectFR.screens.map(({ src }) => src),
      links: projectFR.links.map(({ type, url }) => ({ type, url })),
    };
    const sharedFieldsEN = {
      tech: projectEN.tech,
      period: projectEN.period,
      status: projectEN.status,
      category: projectEN.category,
      imageSrc: projectEN.imageSrc,
      contentShape: {
        process: projectEN.process.length,
        solution: projectEN.solution.length,
        deliverables: projectEN.deliverables.length,
        highlights: projectEN.highlights.length,
      },
      screens: projectEN.screens.map(({ src }) => src),
      links: projectEN.links.map(({ type, url }) => ({ type, url })),
    };

    check(
      JSON.stringify(sharedFieldsFR) === JSON.stringify(sharedFieldsEN),
      `Projet ${slug} : les données techniques diffèrent entre FR et EN.`,
    );
  });

  const orderedFR = getProjects('fr').map(({ slug }) => slug);
  const orderedEN = getProjects('en').map(({ slug }) => slug);
  check(orderedFR.length === projectsFR.length, "L'ordre éditorial FR n'inclut pas tous les projets.");
  check(orderedEN.length === projectsEN.length, "L'ordre éditorial EN n'inclut pas tous les projets.");
  check(JSON.stringify(orderedFR) === JSON.stringify(orderedEN), "L'ordre éditorial diffère entre FR et EN.");

  // La sélection phare dépend désormais de l'ordre canonique, pas d'un booléen dans chaque locale.
  const featuredFR = getFeaturedProjects('fr').map(({ slug }) => slug);
  const featuredEN = getFeaturedProjects('en').map(({ slug }) => slug);
  check(JSON.stringify(featuredFR) === JSON.stringify(expectedFeaturedSlugs), 'La sélection des projets phares FR a changé.');
  check(JSON.stringify(featuredEN) === JSON.stringify(expectedFeaturedSlugs), 'La sélection des projets phares EN a changé.');
}

function checkProfile(profile: Profile, locale: Locale) {
  const profileLabel = `[${locale}] Profil`;
  const requiredText = {
    name: profile.name,
    location: profile.location,
    phone: profile.phone,
    email: profile.email,
    title: profile.title,
    focus: profile.focus,
    summary: profile.summary,
    shortBio: profile.shortBio,
    contactPitch: profile.contactPitch,
    availability: profile.availability,
  };

  Object.entries(requiredText).forEach(([field, value]) => {
    check(isNonEmptyText(value), `${profileLabel} : le champ ${field} est vide.`);
  });

  check(/^\S+@\S+\.\S+$/.test(profile.email), `${profileLabel} : adresse email invalide.`);
  checkUrl(profile.linkedin, `${profileLabel} : LinkedIn`);
  checkUrl(profile.github, `${profileLabel} : GitHub`);
  checkLocalAsset(profile.avatar, `${profileLabel} : avatar`);
  checkLocalAsset(profile.cvPdf, `${profileLabel} : CV PDF`);

  const collections = {
    targetRoles: profile.targetRoles,
    proofPoints: profile.proofPoints,
    valuePillars: profile.valuePillars,
    primaryStack: profile.primaryStack,
    skills: profile.skills,
    languages: profile.languages,
    certifications: profile.certifications,
    experiences: profile.experiences,
    education: profile.education,
    interests: profile.interests,
  };
  Object.entries(collections).forEach(([field, items]) => {
    checkNonEmptyList(items, `${profileLabel} : ${field}`);
  });
}

function checkProfileParity() {
  const sharedIdentityFields = ['name', 'age', 'email', 'linkedin', 'github', 'avatar', 'cvPdf'] as const;
  sharedIdentityFields.forEach((field) => {
    check(profileFR[field] === profileEN[field], `Profil : le champ partagé ${field} diffère entre FR et EN.`);
  });

  check(
    JSON.stringify(profileFR.primaryStack) === JSON.stringify(profileEN.primaryStack),
    'Profil : la stack principale diffère entre FR et EN.',
  );

  const pairedCollections = [
    'targetRoles',
    'proofPoints',
    'valuePillars',
    'skills',
    'languages',
    'certifications',
    'experiences',
    'education',
    'interests',
  ] as const;
  pairedCollections.forEach((field) => {
    check(
      profileFR[field].length === profileEN[field].length,
      `Profil : le nombre d'entrées ${field} diffère entre FR et EN.`,
    );
  });

  check(
    JSON.stringify(profileFR.experiences.map(({ company }) => company)) ===
      JSON.stringify(profileEN.experiences.map(({ company }) => company)),
    'Profil : les expériences ne correspondent pas entre FR et EN.',
  );
  check(
    JSON.stringify(profileFR.education.map(({ school }) => school)) ===
      JSON.stringify(profileEN.education.map(({ school }) => school)),
    'Profil : les formations ne correspondent pas entre FR et EN.',
  );
  check(
    JSON.stringify(profileFR.certifications.map(({ name, url }) => ({ name, url }))) ===
      JSON.stringify(profileEN.certifications.map(({ name, url }) => ({ name, url }))),
    'Profil : les certifications ne correspondent pas entre FR et EN.',
  );
}

checkUniqueSlugs(projectsFR, 'fr');
checkUniqueSlugs(projectsEN, 'en');
projectsFR.forEach((project) => checkProject(project, 'fr'));
projectsEN.forEach((project) => checkProject(project, 'en'));
checkProjectParity();
checkProfile(profileFR, 'fr');
checkProfile(profileEN, 'en');
checkProfileParity();

if (errors.length > 0) {
  console.error(`Validation du contenu échouée (${errors.length} erreur${errors.length > 1 ? 's' : ''}) :`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`Contenu validé : ${projectsFR.length} projets synchronisés en français et en anglais.`);
}
