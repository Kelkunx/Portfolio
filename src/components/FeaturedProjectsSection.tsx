'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { useLocale } from '../context/LocaleContext';
import { getProjects } from '../../lib/content';
import ProjectCard from './ProjectCard';

export default function FeaturedProjectsSection() {
  const { locale } = useLocale();
  const featuredProjects = getProjects(locale).filter((project) => project.featured).slice(0, 3);

  return (
    <Box component="section" id="home-sections-start" sx={{ mt: { xs: 8, md: 12 }, scrollMarginTop: '96px' }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'flex-end' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box sx={{ maxWidth: 720 }}>
          <Typography component="h2" variant="h4" sx={{ color: 'var(--text)', mb: 1 }}>
            {locale === 'fr' ? 'Projets phares' : 'Featured projects'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {locale === 'fr'
              ? 'Trois projets qui montrent le mieux ma façon de concevoir un produit, structurer une solution et livrer un résultat crédible.'
              : 'Three projects that best show how I design a product, structure a solution and ship something credible.'}
          </Typography>
        </Box>
        <Button component={Link} href="/projets" variant="outlined">
          {locale === 'fr' ? 'Tous les projets' : 'All projects'}
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {featuredProjects.map((project, index) => (
          <Grid key={project.slug} size={{ xs: 12, md: 4 }}>
            <ProjectCard {...project} revealDelay={index * 0.05} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
