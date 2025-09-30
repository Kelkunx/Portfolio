// src/app/projets/[slug]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLocale } from '../../../context/LocaleContext';
import { projects as projectsFR, type Project as ProjectFR } from '../../../../lib/locales/fr/projects';
import { projects as projectsEN, type Project as ProjectEN } from '../../../../lib/locales/en/projects';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ImageLightbox from '../../../components/ImageLightbox';

type Project = ProjectFR | ProjectEN;

function formatDate(date?: string, locale = 'fr') {
  if (!date) return undefined;
  try {
    const d = new Date(date);
    if (!Number.isFinite(d.getTime())) return date;
    return d.toLocaleDateString(locale === 'en' ? 'en-US' : 'fr-FR', { year: 'numeric', month: 'long' });
  } catch {
    return date;
  }
}

function placeholderDataUrl(title = 'Image manquante', w = 1200, h = 630) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
    <rect width='100%' height='100%' fill='#f3f4f6'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-family='Inter,Arial,sans-serif' font-size='28'>${title}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function getTechColor(tech: string) {
  const t = tech.toLowerCase();
  if (t.includes('react') || t.includes('next')) return 'primary';
  if (t.includes('node') || t.includes('nest')) return 'success';
  if (t.includes('ts') || t.includes('typescript')) return 'info';
  if (t.includes('js') || t.includes('javascript')) return 'warning';
  if (t.includes('python')) return 'error';
  return 'secondary';
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const { locale } = useLocale();

  const projects = locale === 'en' ? projectsEN : projectsFR;
  const project: Project | undefined = slug ? projects.find((p) => p.slug === slug) : undefined;

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography component="h1" variant="h5">
          {locale === 'en' ? 'Project not found' : 'Projet introuvable'}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="/projets">{locale === 'en' ? '← Back to project list' : '← Retour à la liste des projets'}</Link>
        </Box>
      </Container>
    );
  }

  const imageSrc =
    project.imageSrc && project.imageSrc.trim() !== ''
      ? project.imageSrc
      : placeholderDataUrl(project.title, 1200, 480);

  const published = formatDate(project.date, locale);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography component="h1" variant="h4" gutterBottom color="primary">
            {project.title}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <ImageLightbox
              src={imageSrc}
              alt={project.imageAlt || project.title}
              thumbHeight={240}
              priority
            />
          </Box>

          <Typography component="section" variant="body1" paragraph>
            {project.description}
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            component="aside"
            aria-labelledby="project-details-heading"
            sx={{
              position: { xs: 'relative', md: 'sticky' },
              top: { md: 92 },
              mb: 4,
            }}
          >
            <Typography id="project-details-heading" variant="h6" component="h2" gutterBottom>
              {locale === 'en' ? 'Details' : 'Détails'}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                {locale === 'en' ? 'Technologies' : 'Technos'}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {project.tech.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    size="small"
                    variant="outlined"
                    color={getTechColor(t)}
                    aria-label={`${locale === 'en' ? 'Technology' : 'Technologie'} ${t}`}
                  />
                ))}
              </Box>
            </Box>

            {published && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {locale === 'en' ? 'Date' : 'Date'}
                </Typography>
                <Typography variant="body2">{published}</Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              {project.demoUrl && (
                <Button
                  variant="contained"
                  color="info"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={locale === 'en' ? 'Open demo' : 'Ouvrir la démo'}
                >
                  {locale === 'en' ? 'Open demo' : 'Ouvrir la démo'}
                </Button>
              )}

              {project.repoUrl && (
                <Button
                  variant="contained"
                  color="secondary"
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={locale === 'en' ? 'View repository' : 'Voir le dépôt'}
                >
                  {locale === 'en' ? 'View repository' : 'Voir le dépôt'}
                </Button>
              )}

              <Button
                variant="contained"
                color="success"
                href="/contact"
                aria-label={locale === 'en' ? 'Contact me about this project' : 'Me contacter au sujet de ce projet'}
              >
                {locale === 'en' ? 'Contact me about this project' : 'Me contacter au sujet de ce projet'}
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
