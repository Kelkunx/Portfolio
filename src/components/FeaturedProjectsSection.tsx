'use client';

import { ArrowOutward, GitHub } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import {
  formatProjectPeriod,
  getFeaturedProjects,
  getProjectCategoryLabel,
  getProjectStatusLabel,
  type ContentLocale,
} from '../../lib/content';
import type { Project } from '../../lib/content-types';
import { projectPlaceholderDataUrl } from '../../lib/project-placeholder';
import { useLocale } from '../context/LocaleContext';
import SiteContainer from './SiteContainer';
import TechStackChips from './TechStackChips';

type ProjectMetadataProps = {
  project: Project;
  locale: ContentLocale;
  tone: string;
};

type ProjectMediaProps = {
  project: Project;
  locale: ContentLocale;
  sizes: string;
};

const secondaryTones = [
  { color: 'var(--green)', border: 'rgba(158, 206, 106, 0.4)' },
  { color: 'var(--purple)', border: 'rgba(187, 154, 247, 0.4)' },
];

function ProjectMetadata({ project, locale, tone }: ProjectMetadataProps) {
  return (
    <Stack direction="row" spacing={0.8} useFlexGap flexWrap="wrap" alignItems="center">
      <Typography variant="body2" sx={{ color: 'var(--text-2)' }}>
        {getProjectCategoryLabel(project.category, locale)}
      </Typography>
      <Typography aria-hidden="true" variant="body2" sx={{ color: 'var(--muted)' }}>
        ·
      </Typography>
      <Typography variant="body2" sx={{ color: tone, fontWeight: 600 }}>
        {getProjectStatusLabel(project.status, locale)}
      </Typography>
      <Typography aria-hidden="true" variant="body2" sx={{ color: 'var(--muted)' }}>
        ·
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--text-2)' }}>
        {formatProjectPeriod(project.period, locale)}
      </Typography>
    </Stack>
  );
}

function ProjectMedia({ project, locale, sizes }: ProjectMediaProps) {
  const imageSrc = project.imageSrc?.trim() || projectPlaceholderDataUrl(project.title, locale);
  const skipOptimization = imageSrc.startsWith('data:') || imageSrc.startsWith('blob:');

  return (
    <Image
      className="home-project-image"
      src={imageSrc}
      alt={project.imageAlt || project.title}
      fill
      sizes={sizes}
      unoptimized={skipOptimization}
      style={{ objectFit: 'cover', objectPosition: 'top left' }}
    />
  );
}

function SpotlightProject({ project, locale }: { project: Project; locale: ContentLocale }) {
  const repository = project.links.find((link) => link.type === 'repo');

  return (
    <Box
      component="article"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.75fr) minmax(320px, 1fr)' },
        overflow: 'hidden',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--surface)',
        transition: 'border-color 160ms ease',
        '&:hover, &:focus-within': { borderColor: 'rgba(125, 207, 255, 0.46)' },
        '&:hover .home-project-image, &:focus-within .home-project-image': { transform: 'scale(1.008)' },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          aspectRatio: { xs: '2453 / 1448', lg: 'auto' },
          minHeight: { lg: 380 },
          overflow: 'hidden',
          borderBottom: { xs: '1px solid var(--border)', lg: 0 },
          borderRight: { lg: '1px solid var(--border)' },
          backgroundColor: 'var(--surface-3)',
          '& .home-project-image': {
            transition: 'transform 220ms cubic-bezier(.2,.8,.2,1)',
          },
        }}
      >
        <ProjectMedia
          project={project}
          locale={locale}
          sizes="(max-width: 1199px) calc(100vw - 64px), 900px"
        />
      </Box>

      <Stack spacing={2} justifyContent="center" sx={{ p: { xs: 2.5, md: 3, lg: 4 }, minWidth: 0 }}>
        <ProjectMetadata project={project} locale={locale} tone="var(--cyan)" />

        <Box>
          <Typography
            component="h3"
            sx={{
              color: 'var(--text)',
              mb: 1.25,
              fontFamily: 'var(--font-display)',
              fontSize: { xs: '1.75rem', lg: '2rem' },
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: '-0.035em',
            }}
          >
            {project.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.65 }}>
            {project.short}
          </Typography>
        </Box>

        <Stack component="ul" spacing={1} sx={{ p: 0, m: 0, listStyle: 'none' }}>
          {project.highlights.slice(0, 2).map((highlight) => (
            <Box key={`${highlight.value}-${highlight.label}`} component="li" sx={{ borderLeft: '2px solid var(--cyan)', pl: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'var(--text)', fontWeight: 600, mb: 0.25 }}>
                {highlight.value}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.45 }}>
                {highlight.label}
              </Typography>
            </Box>
          ))}
        </Stack>

        <TechStackChips items={project.tech} limit={6} />

        <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
          <Button
            component={Link}
            href={`/projets/${project.slug}`}
            variant="text"
            endIcon={<ArrowOutward className="home-link-arrow" />}
            sx={{ px: 0, '&:hover': { backgroundColor: 'transparent' } }}
          >
            {locale === 'fr' ? 'Voir le projet' : 'View project'}
          </Button>
          {repository && (
            <Button
              component="a"
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="text"
              startIcon={<GitHub />}
              endIcon={<ArrowOutward className="home-link-arrow" />}
              sx={{ px: 0, '&:hover': { backgroundColor: 'transparent' } }}
            >
              {locale === 'fr' ? 'Voir le code' : 'View code'}
            </Button>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

function SecondaryProject({
  project,
  locale,
  index,
}: {
  project: Project;
  locale: ContentLocale;
  index: number;
}) {
  const tone = secondaryTones[index % secondaryTones.length];

  return (
    <Box
      component="article"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1.12fr) minmax(220px, 0.88fr)' },
        minHeight: { sm: 260 },
        overflow: 'hidden',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--surface-3)',
        transition: 'transform 220ms cubic-bezier(.2,.8,.2,1), border-color 160ms ease',
        '&:hover, &:focus-within': { borderColor: tone.border },
        '&:hover .home-project-image, &:focus-within .home-project-image': { transform: 'scale(1.015)' },
        '@media (prefers-reduced-motion: no-preference)': {
          '&:hover, &:focus-within': { transform: 'translateY(-3px)' },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          aspectRatio: { xs: '2453 / 1448', sm: 'auto' },
          minHeight: { sm: 240 },
          overflow: 'hidden',
          borderBottom: { xs: '1px solid var(--border)', sm: 0 },
          borderRight: { sm: '1px solid var(--border)' },
          backgroundColor: 'var(--surface-2)',
          '& .home-project-image': {
            transition: 'transform 220ms cubic-bezier(.2,.8,.2,1)',
          },
        }}
      >
        <ProjectMedia
          project={project}
          locale={locale}
          sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 1199px) 55vw, 420px"
        />
      </Box>

      <Stack spacing={1.5} justifyContent="center" sx={{ p: 2.5, minWidth: 0 }}>
        <ProjectMetadata project={project} locale={locale} tone={tone.color} />
        <Box>
          <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 0.75 }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.6 }}>
            {project.short}
          </Typography>
        </Box>
        <TechStackChips items={project.tech} limit={4} />
        <Button
          component={Link}
          href={`/projets/${project.slug}`}
          variant="text"
          endIcon={<ArrowOutward className="home-link-arrow" />}
          sx={{ alignSelf: 'flex-start', px: 0, '&:hover': { backgroundColor: 'transparent' } }}
        >
          {locale === 'fr' ? 'Voir le projet' : 'View project'}
        </Button>
      </Stack>
    </Box>
  );
}

export default function FeaturedProjectsSection() {
  const { locale } = useLocale();
  const [spotlightProject, ...secondaryProjects] = getFeaturedProjects(locale, 3);

  return (
    <Box component="section" id="home-sections-start" sx={{ py: { xs: 8, md: 9 }, scrollMarginTop: '96px' }}>
      <SiteContainer>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Typography component="h2" variant="h3" sx={{ color: 'var(--text)' }}>
            {locale === 'fr' ? 'Projets sélectionnés' : 'Selected projects'}
          </Typography>
          <Button
            component={Link}
            href="/projets"
            variant="text"
            endIcon={<ArrowOutward className="home-link-arrow" />}
            sx={{ px: 0, '&:hover': { backgroundColor: 'transparent' } }}
          >
            {locale === 'fr' ? 'Voir tous les projets' : 'View all projects'}
          </Button>
        </Stack>

        <Stack spacing={2.5}>
          {spotlightProject && <SpotlightProject project={spotlightProject} locale={locale} />}

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.12fr) minmax(0, 0.88fr)' },
              gap: 2.5,
              alignItems: 'start',
            }}
          >
            {secondaryProjects.map((project, index) => (
              <Box key={project.slug} sx={{ mt: { lg: index === 1 ? 3 : 0 } }}>
                <SecondaryProject project={project} locale={locale} index={index} />
              </Box>
            ))}
          </Box>
        </Stack>
      </SiteContainer>
    </Box>
  );
}
