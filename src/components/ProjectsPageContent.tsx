'use client';

import ArrowOutward from '@mui/icons-material/ArrowOutward';
import GitHub from '@mui/icons-material/GitHub';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import {
  formatProjectPeriod,
  getArchiveProjects,
  getFeaturedProjects,
  getProjectCategoryLabel,
  getProjectStatusLabel,
} from '../../lib/content';
import type { Project } from '../../lib/content-types';
import { useLocale } from '../context/LocaleContext';
import ProjectThumbnail from './ProjectThumbnail';
import SiteContainer from './SiteContainer';
import TechStackChips from './TechStackChips';

function ProjectMetadata({ project }: { project: Project }) {
  const { locale } = useLocale();
  const metadata = [
    getProjectCategoryLabel(project.category, locale),
    getProjectStatusLabel(project.status, locale),
    formatProjectPeriod(project.period, locale),
  ];

  return (
    <Typography variant="body2" sx={{ color: 'var(--text-2)', fontWeight: 600 }}>
      {metadata.join(' • ')}
    </Typography>
  );
}

function ProjectActions({ project, compact = false }: { project: Project; compact?: boolean }) {
  const { locale } = useLocale();
  const externalLinks = project.links.filter((link) => link.type === 'demo' || link.type === 'repo');

  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
      <Button
        component={Link}
        href={`/projets/${project.slug}`}
        size="small"
        endIcon={<ArrowOutward fontSize="small" />}
      >
        {locale === 'fr' ? 'Voir le détail' : 'View details'}
      </Button>
      {!compact &&
        externalLinks.slice(0, 2).map((link) => (
          <Button
            key={link.url}
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            startIcon={link.type === 'repo' ? <GitHub fontSize="small" /> : undefined}
          >
            {link.label}
          </Button>
        ))}
    </Stack>
  );
}

function SpotlightProject({ project }: { project: Project }) {
  const { locale } = useLocale();

  return (
    <Box component="article" className="projects-spotlight">
      <Box
        component={Link}
        href={`/projets/${project.slug}`}
        aria-label={`${locale === 'fr' ? 'Voir le projet' : 'View project'} ${project.title}`}
        className="project-thumbnail-link"
      >
        <ProjectThumbnail
          src={project.imageSrc}
          alt={project.imageAlt}
          title={project.title}
          locale={locale}
          priority
          sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 899px) calc(100vw - 64px), (max-width: 1536px) 60vw, 860px"
          aspectRatio="16 / 10"
        />
      </Box>

      <Stack spacing={2.5} sx={{ p: { xs: 2.5, md: 4 }, minWidth: 0, justifyContent: 'center' }}>
        <ProjectMetadata project={project} />
        <Box>
          <Typography component="h3" variant="h3" sx={{ color: 'var(--text)', mb: 1.25 }}>
            {project.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
            {project.short}
          </Typography>
        </Box>

        <Box className="projects-highlight-list">
          {project.highlights.slice(0, 2).map((highlight, index) => (
            <Box key={`${highlight.value}-${highlight.label}`} sx={{ borderColor: index === 0 ? 'var(--cyan)' : 'var(--green)' }}>
              <Typography variant="body2" sx={{ color: 'var(--text)', fontWeight: 700 }}>
                {highlight.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
                {highlight.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <TechStackChips items={project.tech} limit={6} />
        <ProjectActions project={project} />
      </Stack>
    </Box>
  );
}

function SecondaryProject({ project, tone }: { project: Project; tone: 'green' | 'cyan' }) {
  const { locale } = useLocale();

  return (
    <Box component="article" className={`projects-secondary projects-secondary--${tone}`}>
      <Box
        component={Link}
        href={`/projets/${project.slug}`}
        aria-label={`${locale === 'fr' ? 'Voir le projet' : 'View project'} ${project.title}`}
        className="project-thumbnail-link"
      >
        <ProjectThumbnail
          src={project.imageSrc}
          alt={project.imageAlt}
          title={project.title}
          locale={locale}
          sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 899px) calc(100vw - 64px), 48vw"
          aspectRatio="2 / 1"
        />
      </Box>
      <Stack spacing={2} sx={{ p: { xs: 2.5, md: 3 }, flexGrow: 1 }}>
        <ProjectMetadata project={project} />
        <Box>
          <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 0.75 }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
            {project.short}
          </Typography>
        </Box>
        <TechStackChips items={project.tech} limit={5} />
        <Box sx={{ mt: 'auto' }}>
          <ProjectActions project={project} />
        </Box>
      </Stack>
    </Box>
  );
}

function ArchiveProject({ project }: { project: Project }) {
  const { locale } = useLocale();

  return (
    <Box component="article" className="projects-archive-row">
      <Box
        component={Link}
        href={`/projets/${project.slug}`}
        aria-label={`${locale === 'fr' ? 'Voir le projet' : 'View project'} ${project.title}`}
        className="project-thumbnail-link"
      >
        <ProjectThumbnail
          src={project.imageSrc}
          alt={project.imageAlt}
          title={project.title}
          locale={locale}
          sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 899px) 200px, 240px"
        />
      </Box>

      <Stack spacing={1.5} sx={{ minWidth: 0 }}>
        <ProjectMetadata project={project} />
        <Box>
          <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 0.5 }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.65 }}>
            {project.short}
          </Typography>
        </Box>
        <TechStackChips items={project.tech} limit={4} />
      </Stack>

      <Box sx={{ alignSelf: { xs: 'start', md: 'center' } }}>
        <ProjectActions project={project} compact />
      </Box>
    </Box>
  );
}

export default function ProjectsPageContent() {
  const { locale } = useLocale();
  const featuredProjects = getFeaturedProjects(locale);
  const archiveProjects = getArchiveProjects(locale);
  const [spotlightProject, ...secondaryProjects] = featuredProjects;

  return (
    <SiteContainer sx={{ py: { xs: 6, md: 9 } }}>
      <Box component="header" sx={{ maxWidth: 760, mb: { xs: 6, md: 8 } }}>
        <Typography component="h1" variant="h2" sx={{ color: 'var(--text)', mb: 1.5 }}>
          {locale === 'fr' ? 'Projets' : 'Projects'}
        </Typography>
        <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
          {locale === 'fr'
            ? 'Une sélection de projets présentés avec assez de contexte pour comprendre le problème, les choix faits et le résultat.'
            : 'A selection of projects presented with enough context to understand the problem, the choices made and the result.'}
        </Typography>
      </Box>

      <Box component="section" aria-labelledby="featured-projects-title" sx={{ mb: { xs: 8, md: 12 } }}>
        <Box sx={{ mb: 3 }}>
          <Typography id="featured-projects-title" component="h2" variant="h4" sx={{ color: 'var(--text)', mb: 0.75 }}>
            {locale === 'fr' ? 'Projets phares' : 'Featured work'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-2)' }}>
            {locale === 'fr'
              ? 'Les projets qui représentent le mieux ma manière de concevoir, structurer et livrer.'
              : 'The projects that best represent how I think, structure and deliver.'}
          </Typography>
        </Box>

        <Stack spacing={{ xs: 3, md: 4 }}>
          {spotlightProject && <SpotlightProject project={spotlightProject} />}
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="stretch">
            {secondaryProjects.map((project, index) => (
              <Grid key={project.slug} size={{ xs: 12, md: 6 }}>
                <SecondaryProject project={project} tone={index === 0 ? 'green' : 'cyan'} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      {archiveProjects.length > 0 && (
        <Box component="section" aria-labelledby="archive-projects-title">
          <Box sx={{ mb: 2.5 }}>
            <Typography id="archive-projects-title" component="h2" variant="h4" sx={{ color: 'var(--text)', mb: 0.75 }}>
              {locale === 'fr' ? 'Autres projets' : 'Other projects'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-2)' }}>
              {locale === 'fr'
                ? 'Projets secondaires ou académiques, conservés pour compléter le parcours.'
                : 'Secondary or academic projects kept to complete the profile.'}
            </Typography>
          </Box>
          <Box sx={{ borderBottom: '1px solid var(--border)' }}>
            {archiveProjects.map((project) => (
              <ArchiveProject key={project.slug} project={project} />
            ))}
          </Box>
        </Box>
      )}
    </SiteContainer>
  );
}
