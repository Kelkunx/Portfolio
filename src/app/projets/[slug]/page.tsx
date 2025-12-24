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

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '"':
        return '&quot;';
      case "'":
        return '&apos;';
      default:
        return char;
    }
  });
}

function wrapText(value: string, maxChars: number) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';

  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= maxChars) {
      line = next;
      return;
    }
    if (line) lines.push(line);
    line = word;
  });

  if (line) lines.push(line);
  return lines;
}

function truncateLine(value: string, maxChars: number) {
  if (value.length <= maxChars) return value;
  return `${value.slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
}

function placeholderDataUrl(title: string, locale: 'fr' | 'en', w = 1200, h = 675) {
  const rawTitle = title.trim();
  const subtitle = locale === 'fr' ? 'Apercu indisponible' : 'Preview unavailable';
  const maxChars = rawTitle.length > 42 ? 20 : 26;
  const lines = wrapText(rawTitle, maxChars);
  const titleLines = lines.slice(0, 2);
  if (lines.length > 2) {
    titleLines[1] = truncateLine(lines.slice(1).join(' '), maxChars);
  }
  const baseTitleSize = Math.round(Math.max(40, Math.min(72, Math.min(w * 0.06, h * 0.12))));
  const titleSize = titleLines.length > 1 ? Math.round(baseTitleSize * 0.82) : baseTitleSize;
  const lineHeight = Math.round(titleSize * 1.2);
  const titleY = Math.round(h * 0.5);
  const firstDy = titleLines.length > 1 ? -Math.round(lineHeight / 2) : 0;
  const titleTspans = titleLines
    .map((line, index) => `<tspan x='50%' dy='${index === 0 ? firstDy : lineHeight}'>${escapeXml(line)}</tspan>`)
    .join('');
  const subtitleSize = Math.round(Math.max(16, Math.min(30, Math.min(w * 0.03, h * 0.06))));
  const subtitleY = Math.round(titleY + (titleLines.length > 1 ? lineHeight : lineHeight * 0.9));
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#1a1b26'/>
        <stop offset='100%' stop-color='#16161e'/>
      </linearGradient>
      <radialGradient id='glow1' cx='85%' cy='15%' r='60%'>
        <stop offset='0%' stop-color='#7dcfff' stop-opacity='0.25'/>
        <stop offset='100%' stop-color='#7dcfff' stop-opacity='0'/>
      </radialGradient>
      <radialGradient id='glow2' cx='15%' cy='85%' r='55%'>
        <stop offset='0%' stop-color='#bb9af7' stop-opacity='0.2'/>
        <stop offset='100%' stop-color='#bb9af7' stop-opacity='0'/>
      </radialGradient>
      <pattern id='grid' width='64' height='64' patternUnits='userSpaceOnUse'>
        <path d='M 64 0 L 0 0 0 64' fill='none' stroke='#3b4261' stroke-width='1' opacity='0.35'/>
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#bg)'/>
    <rect width='100%' height='100%' fill='url(#grid)'/>
    <rect width='100%' height='100%' fill='url(#glow1)'/>
    <rect width='100%' height='100%' fill='url(#glow2)'/>
    <rect x='72' y='72' width='${w - 144}' height='${h - 144}' rx='28' fill='#24283b' fill-opacity='0.6' stroke='#3b4261'/>
    <text x='50%' y='${titleY}' text-anchor='middle' dominant-baseline='middle' fill='#c0caf5' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${titleSize}' font-weight='600'>${titleTspans}</text>
    <text x='50%' y='${subtitleY}' text-anchor='middle' dominant-baseline='middle' fill='#a9b1d6' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${subtitleSize}'>${subtitle}</text>
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
      : placeholderDataUrl(project.title, locale, 1200, 675);

  const published = formatDate(project.date, locale);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography component="h1" variant="h4" gutterBottom color="primary">
            {project.title}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <ImageLightbox
              src={imageSrc}
              alt={project.imageAlt || project.title}
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
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: 2.5,
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
