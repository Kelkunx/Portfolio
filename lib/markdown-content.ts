import type { ContentLocale } from './content';
import { getProfile, getProjects } from './content';
import type { Project } from './content-types';

type MarkdownDocument = {
  body: string;
  status?: number;
};

function list(items: string[]) {
  return items.map((item) => `- ${item}`).join('\n');
}

function section(title: string, body: string | string[]) {
  const content = Array.isArray(body) ? body.filter(Boolean).join('\n\n') : body;
  return [`## ${title}`, content].filter(Boolean).join('\n\n');
}

function link(label: string, url: string, siteUrl: string) {
  const href = url.startsWith('/') ? `${siteUrl}${url}` : url;
  return `[${label}](${href})`;
}

function projectSummary(project: Project, siteUrl: string) {
  const links = [
    link('Fiche projet', `/projets/${project.slug}`, siteUrl),
    ...project.links.map((item) => link(item.label, item.url, siteUrl)),
  ];

  return [
    `### ${project.title}`,
    project.tagline,
    `- Statut: ${project.status}`,
    `- Date: ${project.date ?? 'Non précisée'}`,
    `- Stack: ${project.tech.join(', ')}`,
    `- Liens: ${links.join(' | ')}`,
  ].join('\n\n');
}

function projectDetail(project: Project, siteUrl: string) {
  return [
    `# ${project.title}`,
    project.tagline,
    `- Statut: ${project.status}`,
    `- Date: ${project.date ?? 'Non précisée'}`,
    `- Rôle: ${project.role}`,
    `- Stack: ${project.tech.join(', ')}`,
    section('Description', project.description),
    section('Contexte', project.context),
    section('Problème', project.problem),
    section('Process', list(project.process)),
    section('Solution', list(project.solution)),
    section('Livrables', list(project.deliverables)),
    section(
      'Résultats',
      list(project.results.map((result) => `${result.value}: ${result.label}`)),
    ),
    section(
      'Liens',
      list(project.links.map((item) => link(item.label, item.url, siteUrl))),
    ),
  ].join('\n\n');
}

function buildHomeMarkdown(locale: ContentLocale, siteUrl: string) {
  const profile = getProfile(locale);
  const projects = getProjects(locale);
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

  return [
    `# ${profile.name} - ${profile.title}`,
    profile.summary,
    `- Localisation: ${profile.location}`,
    `- Disponibilité: ${profile.availability}`,
    `- Rôles cibles: ${profile.targetRoles.join(', ')}`,
    `- Stack principale: ${profile.primaryStack.join(', ')}`,
    section(
      'Points forts',
      list(profile.proofPoints.map((item) => `${item.label}: ${item.value}`)),
    ),
    section(
      'Domaines',
      profile.valuePillars.map((pillar) =>
        [
          `### ${pillar.title}`,
          pillar.description,
          `Preuve: ${pillar.proof}`,
          `Outils: ${pillar.tools.join(', ')}`,
        ].join('\n\n'),
      ),
    ),
    section('Projets sélectionnés', featuredProjects.map((project) => projectSummary(project, siteUrl))),
    section(
      'Contact',
      list([
        `Email: ${profile.email}`,
        `LinkedIn: ${profile.linkedin}`,
        `GitHub: ${profile.github}`,
        `CV PDF: ${link('Télécharger le CV', profile.cvPdf, siteUrl)}`,
      ]),
    ),
  ].join('\n\n');
}

function buildProjectsMarkdown(locale: ContentLocale, siteUrl: string) {
  const projects = getProjects(locale);

  return [
    '# Projets',
    'Sélection de projets web, produits et académiques.',
    ...projects.map((project) => projectSummary(project, siteUrl)),
  ].join('\n\n');
}

function buildCvMarkdown(locale: ContentLocale, siteUrl: string) {
  const profile = getProfile(locale);

  return [
    `# CV - ${profile.name}`,
    profile.summary,
    `- Localisation: ${profile.location}`,
    `- Email: ${profile.email}`,
    `- Téléphone: ${profile.phone}`,
    `- LinkedIn: ${profile.linkedin}`,
    `- GitHub: ${profile.github}`,
    `- CV PDF: ${link('Télécharger le CV', profile.cvPdf, siteUrl)}`,
    section(
      'Compétences',
      profile.skills.map((group) => `### ${group.category}\n\n${list(group.items)}`),
    ),
    section(
      'Expériences',
      profile.experiences.map((experience) =>
        [
          `### ${experience.role} - ${experience.company}`,
          `${experience.start}${experience.end ? ` - ${experience.end}` : ''} | ${experience.location}`,
          experience.summary,
          experience.bullets.length ? list(experience.bullets) : '',
        ]
          .filter(Boolean)
          .join('\n\n'),
      ),
    ),
    section(
      'Formation',
      profile.education.map((item) =>
        [
          `### ${item.degree}`,
          `${item.school} | ${item.start}${item.end ? ` - ${item.end}` : ''}`,
          item.notes?.length ? list(item.notes) : '',
        ]
          .filter(Boolean)
          .join('\n\n'),
      ),
    ),
    section(
      'Certifications',
      list(
        profile.certifications.map((item) =>
          [item.name, item.issuer, item.date, item.score, item.url].filter(Boolean).join(' - '),
        ),
      ),
    ),
    section(
      'Langues',
      list(profile.languages.map((item) => `${item.name}: ${item.level}`)),
    ),
  ].join('\n\n');
}

function buildContactMarkdown(locale: ContentLocale, siteUrl: string) {
  const profile = getProfile(locale);

  return [
    '# Contact',
    profile.contactPitch,
    list([
      `Email: ${profile.email}`,
      `Téléphone: ${profile.phone}`,
      `LinkedIn: ${profile.linkedin}`,
      `GitHub: ${profile.github}`,
      `CV PDF: ${link('Télécharger le CV', profile.cvPdf, siteUrl)}`,
      `Page projets: ${link('Voir les projets', '/projets', siteUrl)}`,
    ]),
  ].join('\n\n');
}

export function buildMarkdownForPath(
  pathname: string,
  locale: ContentLocale,
  siteUrl: string,
): MarkdownDocument | null {
  const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  const projects = getProjects(locale);

  if (path === '/') {
    return { body: buildHomeMarkdown(locale, siteUrl) };
  }

  if (path === '/projets') {
    return { body: buildProjectsMarkdown(locale, siteUrl) };
  }

  if (path === '/cv') {
    return { body: buildCvMarkdown(locale, siteUrl) };
  }

  if (path === '/contact') {
    return { body: buildContactMarkdown(locale, siteUrl) };
  }

  const projectSlug = path.match(/^\/projets\/([^/]+)$/)?.[1];
  const project = projects.find((item) => item.slug === projectSlug);

  if (project) {
    return { body: projectDetail(project, siteUrl) };
  }

  return null;
}

export function estimateMarkdownTokens(markdown: string) {
  return Math.ceil(markdown.trim().split(/\s+/).filter(Boolean).length * 1.35);
}
