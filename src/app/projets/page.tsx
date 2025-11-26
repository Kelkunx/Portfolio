// app/projets/page.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProjectCard from '../../components/ProjectCard';
import { useLocale } from '../../context/LocaleContext';
import { projects as projectsFR } from '../../../lib/locales/fr/projects';
import { projects as projectsEN } from '../../../lib/locales/en/projects';

export default function ProjectsPage() {
  const { locale, t } = useLocale();

  const projects = locale === 'fr' ? projectsFR : projectsEN;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        {t.nav.projects}
      </Typography>

      <Grid container spacing={4}>
        {projects.map((p) => (
          <Grid key={p.slug} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProjectCard
              title={p.title}
              short={p.short}
              description={p.description}
              slug={p.slug}
              imageSrc={p.imageSrc}
              imageAlt={p.imageAlt ?? `${p.title} - aperçu`}
              tech={p.tech}
              demoUrl={p.demoUrl}
              repoUrl={p.repoUrl}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
