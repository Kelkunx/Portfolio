'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useLocale } from '../../context/LocaleContext';
import { getProjects } from '../../../lib/content';
import ProjectCard from '../../components/ProjectCard';

export default function ProjectsPage() {
  const { locale } = useLocale();
  const projects = getProjects(locale);
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = projects.filter((project) => !project.featured);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Stack spacing={1.25} sx={{ mb: 5, maxWidth: 760 }}>
        <Typography variant="h2" component="h1" sx={{ color: 'var(--text)' }}>
          {locale === 'fr' ? 'Projets' : 'Projects'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {locale === 'fr'
            ? 'Une sélection de projets présentés avec assez de contexte pour comprendre le problème, les choix faits et le résultat.'
            : 'A selection of projects presented with enough context to understand the problem, the choices made and the result.'}
        </Typography>
      </Stack>

      <Box component="section" sx={{ mb: 7 }}>
        <Typography variant="h4" component="h2" sx={{ color: 'var(--text)', mb: 1.5 }}>
          {locale === 'fr' ? 'Projets phares' : 'Featured work'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {locale === 'fr'
            ? 'Les projets qui représentent le mieux ma manière de concevoir, structurer et livrer.'
            : 'The projects that best represent how I think, structure and deliver.'}
        </Typography>

        <Grid container spacing={3}>
          {featuredProjects.map((project, index) => (
            <Grid key={project.slug} size={{ xs: 12, md: 4 }}>
              <ProjectCard {...project} revealDelay={index * 0.05} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {archiveProjects.length > 0 && (
        <Box component="section">
          <Typography variant="h4" component="h2" sx={{ color: 'var(--text)', mb: 1.5 }}>
            {locale === 'fr' ? 'Autres projets' : 'Other projects'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {locale === 'fr'
              ? 'Projets secondaires ou académiques, conservés pour compléter le parcours.'
              : 'Secondary or academic projects kept to complete the profile.'}
          </Typography>

          <Grid container spacing={3}>
            {archiveProjects.map((project, index) => (
              <Grid key={project.slug} size={{ xs: 12, md: 6 }}>
                <ProjectCard {...project} compact revealDelay={index * 0.05} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
