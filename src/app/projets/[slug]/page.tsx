// src/app/projets/[slug]/page.tsx
import React from 'react';
import { projects, type Project } from '../../../../lib/projects';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid'; // nouvelle API : use Grid with container + size prop
import Divider from '@mui/material/Divider';
import { Metadata } from 'next';
import ImageLightbox from '../../../components/ImageLightbox';

type Params = { params: { slug: string } };

function formatDate(date?: string) {
  if (!date) return undefined;
  try {
    const d = new Date(date);
    if (!Number.isFinite(d.getTime())) return date;
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return { title: 'Projet — Introuvable' };
  }
  return {
    title: `${project.title} — Léo JEGO`,
    description: project.short ?? project.description,
    openGraph: {
      title: `${project.title} — Léo JEGO`,
      description: project.short ?? project.description,
      url: `https://leo-jego.vercel.app/projets/${project.slug}`,
      images: [
        {
          url: project.imageSrc ? `https://leo-jego.vercel.app${project.imageSrc}` : placeholderDataUrl(project.title),
          width: 1200,
          height: 630,
          alt: project.imageAlt || project.title,
        },
      ],
    },
  };
}

export default function ProjectDetail({ params }: Params) {
  const project: Project | undefined = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography component="h1" variant="h5">
          Projet introuvable
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Link href="/projets">← Retour à la liste des projets</Link>
        </Box>
      </Container>
    );
  }

  const imageSrc = project.imageSrc && project.imageSrc.trim() !== ''
    ? project.imageSrc
    : placeholderDataUrl(project.title, 1200, 480);

  const published = formatDate(project.date);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>

      {/* Utilisation de la nouvelle API Grid : parent container, enfants avec `size` */}
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography component="h1" variant="h4" gutterBottom>
            {project.title}
          </Typography>

          <Box sx={{ mb: 3 }}>
            <ImageLightbox src={imageSrc} alt={project.imageAlt || project.title} thumbHeight={project.imageSrc ? ( { xs: 200, md: 380 } as any ) : 240} priority />
          </Box>

          <Typography component="section" variant="body1" paragraph>
            {project.description}
          </Typography>

        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box component="aside" aria-labelledby="project-details-heading" sx={{ position: 'sticky', top: 92 }}>
            <Typography id="project-details-heading" variant="h6" component="h2" gutterBottom>
              Détails
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Technos</Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                {project.tech.map((t) => (
                  <Chip key={t} label={t} size="small" variant="outlined" aria-label={`Technologie ${t}`} />
                ))}
              </Box>
            </Box>

            {/* Date */}
            {published && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Date</Typography>
                <Typography variant="body2">{published}</Typography>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Stack spacing={1}>
              {project.demoUrl && (
                <Button variant="outlined" href={project.demoUrl} target="_blank" rel="noopener noreferrer" startIcon={<span aria-hidden>🔗</span>}>
                  Ouvrir la démo
                </Button>
              )}
              {project.repoUrl && (
                <Button variant="outlined" href={project.repoUrl} target="_blank" rel="noopener noreferrer" startIcon={<span aria-hidden>💻</span>}>
                  Voir le dépôt
                </Button>
              )}
              <Button variant="outlined" href="/contact">
                Me contacter au sujet de ce projet
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
