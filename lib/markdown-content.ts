import type { ContentLocale } from './content';
import {
  formatProjectPeriod,
  getFeaturedProjects,
  getProfile,
  getProjectCategoryLabel,
  getProjects,
  getProjectStatusLabel,
} from './content';
import type { Project } from './content-types';

type MarkdownDocument = {
  body: string;
  status?: number;
};

type MarkdownLabels = {
  projectPage: string;
  type: string;
  status: string;
  period: string;
  role: string;
  stack: string;
  problem: string;
  highlights: string;
  links: string;
  description: string;
  context: string;
  process: string;
  solution: string;
  deliverables: string;
  location: string;
  availability: string;
  targetRoles: string;
  primaryStack: string;
  strengths: string;
  areas: string;
  evidence: string;
  tools: string;
  selectedProjects: string;
  contact: string;
  email: string;
  phone: string;
  cvPdf: string;
  downloadCv: string;
  projectsTitle: string;
  projectsIntro: string;
  cvTitle: string;
  skills: string;
  experience: string;
  education: string;
  certifications: string;
  languages: string;
  contactTitle: string;
  projectsPage: string;
  viewProjects: string;
};

const labelsByLocale: Record<ContentLocale, MarkdownLabels> = {
  fr: {
    projectPage: 'Fiche projet',
    type: 'Type',
    status: 'Statut',
    period: 'Période',
    role: 'Rôle',
    stack: 'Stack',
    problem: 'Problème traité',
    highlights: 'Points clés',
    links: 'Liens',
    description: 'Description',
    context: 'Contexte',
    process: 'Process',
    solution: 'Solution',
    deliverables: 'Livrables',
    location: 'Localisation',
    availability: 'Disponibilité',
    targetRoles: 'Rôles cibles',
    primaryStack: 'Stack principale',
    strengths: 'Points forts',
    areas: 'Domaines',
    evidence: 'Preuve',
    tools: 'Outils',
    selectedProjects: 'Projets sélectionnés',
    contact: 'Contact',
    email: 'Email',
    phone: 'Téléphone',
    cvPdf: 'CV PDF',
    downloadCv: 'Télécharger le CV',
    projectsTitle: 'Projets',
    projectsIntro: 'Sélection de projets web, produits et académiques.',
    cvTitle: 'CV',
    skills: 'Compétences',
    experience: 'Expériences',
    education: 'Formation',
    certifications: 'Certifications',
    languages: 'Langues',
    contactTitle: 'Contact',
    projectsPage: 'Page projets',
    viewProjects: 'Voir les projets',
  },
  en: {
    projectPage: 'Project page',
    type: 'Type',
    status: 'Status',
    period: 'Period',
    role: 'Role',
    stack: 'Stack',
    problem: 'Problem addressed',
    highlights: 'Highlights',
    links: 'Links',
    description: 'Description',
    context: 'Context',
    process: 'Process',
    solution: 'Solution',
    deliverables: 'Deliverables',
    location: 'Location',
    availability: 'Availability',
    targetRoles: 'Target roles',
    primaryStack: 'Primary stack',
    strengths: 'Key strengths',
    areas: 'Areas of expertise',
    evidence: 'Evidence',
    tools: 'Tools',
    selectedProjects: 'Selected projects',
    contact: 'Contact',
    email: 'Email',
    phone: 'Phone',
    cvPdf: 'PDF resume',
    downloadCv: 'Download resume',
    projectsTitle: 'Projects',
    projectsIntro: 'Selected web, product and academic projects.',
    cvTitle: 'Resume',
    skills: 'Skills',
    experience: 'Experience',
    education: 'Education',
    certifications: 'Certifications',
    languages: 'Languages',
    contactTitle: 'Contact',
    projectsPage: 'Projects page',
    viewProjects: 'View projects',
  },
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

function projectSummary(project: Project, siteUrl: string, locale: ContentLocale) {
  const labels = labelsByLocale[locale];
  const links = [
    link(labels.projectPage, `/projets/${project.slug}`, siteUrl),
    ...project.links.map((item) => link(item.label, item.url, siteUrl)),
  ];

  return [
    `### ${project.title}`,
    project.tagline,
    project.description,
    list([
      `${labels.type}: ${getProjectCategoryLabel(project.category, locale)}`,
      `${labels.status}: ${getProjectStatusLabel(project.status, locale)}`,
      `${labels.period}: ${formatProjectPeriod(project.period, locale, 'long')}`,
      `${labels.role}: ${project.role}`,
      `${labels.stack}: ${project.tech.join(', ')}`,
      `${labels.problem}: ${project.problem}`,
      `${labels.highlights}: ${project.highlights.map((item) => `${item.value}: ${item.label}`).join(' | ')}`,
      `${labels.links}: ${links.join(' | ')}`,
    ]),
  ].join('\n\n');
}

function projectDetail(project: Project, siteUrl: string, locale: ContentLocale) {
  const labels = labelsByLocale[locale];

  return [
    `# ${project.title}`,
    project.tagline,
    list([
      `${labels.type}: ${getProjectCategoryLabel(project.category, locale)}`,
      `${labels.status}: ${getProjectStatusLabel(project.status, locale)}`,
      `${labels.period}: ${formatProjectPeriod(project.period, locale, 'long')}`,
      `${labels.role}: ${project.role}`,
      `${labels.stack}: ${project.tech.join(', ')}`,
    ]),
    section(labels.description, project.description),
    section(labels.context, project.context),
    section(labels.problem, project.problem),
    section(labels.process, list(project.process)),
    section(labels.solution, list(project.solution)),
    section(labels.deliverables, list(project.deliverables)),
    section(labels.highlights, list(project.highlights.map((item) => `${item.value}: ${item.label}`))),
    section(labels.links, list(project.links.map((item) => link(item.label, item.url, siteUrl)))),
  ].join('\n\n');
}

function buildHomeMarkdown(locale: ContentLocale, siteUrl: string) {
  const profile = getProfile(locale);
  const labels = labelsByLocale[locale];
  const featuredProjects = getFeaturedProjects(locale, 3);

  return [
    `# ${profile.name} - ${profile.title}`,
    profile.summary,
    list([
      `${labels.location}: ${profile.location}`,
      `${labels.availability}: ${profile.availability}`,
      `${labels.targetRoles}: ${profile.targetRoles.join(', ')}`,
      `${labels.primaryStack}: ${profile.primaryStack.join(', ')}`,
    ]),
    section(labels.strengths, list(profile.proofPoints.map((item) => `${item.label}: ${item.value}`))),
    section(
      labels.areas,
      profile.valuePillars.map((pillar) =>
        [
          `### ${pillar.title}`,
          pillar.description,
          `${labels.evidence}: ${pillar.proof}`,
          `${labels.tools}: ${pillar.tools.join(', ')}`,
        ].join('\n\n'),
      ),
    ),
    section(
      labels.selectedProjects,
      featuredProjects.map((project) => projectSummary(project, siteUrl, locale)),
    ),
    section(
      labels.contact,
      list([
        `${labels.email}: ${profile.email}`,
        `LinkedIn: ${profile.linkedin}`,
        `GitHub: ${profile.github}`,
        `${labels.cvPdf}: ${link(labels.downloadCv, profile.cvPdf, siteUrl)}`,
      ]),
    ),
  ].join('\n\n');
}

function buildProjectsMarkdown(locale: ContentLocale, siteUrl: string) {
  const labels = labelsByLocale[locale];

  return [
    `# ${labels.projectsTitle}`,
    labels.projectsIntro,
    ...getProjects(locale).map((project) => projectSummary(project, siteUrl, locale)),
  ].join('\n\n');
}

function buildCvMarkdown(locale: ContentLocale, siteUrl: string) {
  const profile = getProfile(locale);
  const labels = labelsByLocale[locale];

  return [
    `# ${labels.cvTitle} - ${profile.name}`,
    profile.summary,
    list([
      `${labels.location}: ${profile.location}`,
      `${labels.email}: ${profile.email}`,
      `${labels.phone}: ${profile.phone}`,
      `LinkedIn: ${profile.linkedin}`,
      `GitHub: ${profile.github}`,
      `${labels.cvPdf}: ${link(labels.downloadCv, profile.cvPdf, siteUrl)}`,
    ]),
    section(labels.skills, profile.skills.map((group) => `### ${group.category}\n\n${list(group.items)}`)),
    section(
      labels.experience,
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
      labels.education,
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
      labels.certifications,
      list(
        profile.certifications.map((item) =>
          [item.name, item.issuer, item.date, item.score, item.url].filter(Boolean).join(' - '),
        ),
      ),
    ),
    section(labels.languages, list(profile.languages.map((item) => `${item.name}: ${item.level}`))),
  ].join('\n\n');
}

function buildContactMarkdown(locale: ContentLocale, siteUrl: string) {
  const profile = getProfile(locale);
  const labels = labelsByLocale[locale];

  return [
    `# ${labels.contactTitle}`,
    profile.contactPitch,
    list([
      `${labels.email}: ${profile.email}`,
      `${labels.phone}: ${profile.phone}`,
      `LinkedIn: ${profile.linkedin}`,
      `GitHub: ${profile.github}`,
      `${labels.cvPdf}: ${link(labels.downloadCv, profile.cvPdf, siteUrl)}`,
      `${labels.projectsPage}: ${link(labels.viewProjects, '/projets', siteUrl)}`,
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

  if (path === '/') return { body: buildHomeMarkdown(locale, siteUrl) };
  if (path === '/projets') return { body: buildProjectsMarkdown(locale, siteUrl) };
  if (path === '/cv') return { body: buildCvMarkdown(locale, siteUrl) };
  if (path === '/contact') return { body: buildContactMarkdown(locale, siteUrl) };

  const projectSlug = path.match(/^\/projets\/([^/]+)$/)?.[1];
  const project = projects.find((item) => item.slug === projectSlug);

  return project ? { body: projectDetail(project, siteUrl, locale) } : null;
}

export function estimateMarkdownTokens(markdown: string) {
  return Math.ceil(markdown.trim().split(/\s+/).filter(Boolean).length * 1.35);
}
