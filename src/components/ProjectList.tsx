'use client';

import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ProjectCard from './ProjectCard';
import type { Project } from '../../lib/locales/fr/projects';
import { useLocale } from '../context/LocaleContext';
import { projects as projectsFR } from '../../lib/locales/fr/projects';
import { projects as projectsEN } from '../../lib/locales/en/projects';

type Props = { projects?: Project[] };

export default function ProjectsList({ projects: projectsProp }: Props) {
  const { locale } = useLocale();
  const [query, setQuery] = useState('');
  const [activeTech, setActiveTech] = useState<string | null>(null);

  // choose projects according to prop > locale files
  const projects = projectsProp ?? (locale === 'fr' ? projectsFR : projectsEN);

  const allTechs = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesQuery =
        q === '' ||
        p.title.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchesTech = !activeTech || p.tech.includes(activeTech);
      return matchesQuery && matchesTech;
    });
  }, [projects, query, activeTech]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <TextField
          aria-label={locale === 'fr' ? 'Recherche projets' : 'Search projects'}
          placeholder={locale === 'fr' ? 'Rechercher un projet (titre, description...)' : 'Search projects (title, description...)'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />

        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
          <Chip
            label={locale === 'fr' ? 'Tous' : 'All'}
            clickable
            color={!activeTech ? 'primary' : 'default'}
            variant="outlined"
            onClick={() => setActiveTech(null)}
            sx={{
              fontWeight: !activeTech ? 600 : 400,
              textTransform: 'none',
              borderColor: !activeTech ? 'var(--accent)' : 'var(--border)',
              color: !activeTech ? 'var(--bg)' : 'var(--text-2)',
              backgroundColor: !activeTech ? 'var(--accent)' : 'transparent',
            }}
          />
          {allTechs.map((t) => (
            <Chip
              key={t}
              label={t}
              clickable
              color={activeTech === t ? 'primary' : 'default'}
              variant="outlined"
              onClick={() => setActiveTech((cur) => (cur === t ? null : t))}
              sx={{
                fontWeight: activeTech === t ? 600 : 400,
                textTransform: 'none',
                borderColor: activeTech === t ? 'var(--accent)' : 'var(--border)',
                color: activeTech === t ? 'var(--bg)' : 'var(--text-2)',
                backgroundColor: activeTech === t ? 'var(--accent)' : 'transparent',
              }}
            />
          ))}
        </Stack>
      </Box>

      <Grid container spacing={4} aria-live="polite">
        {filtered.map((p, index) => (
          <Grid key={p.slug} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ height: '100%' }}>
              <ProjectCard {...p} revealDelay={index * 0.06} />
            </Box>
          </Grid>
        ))}

        {filtered.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ p: 4 }}>
              {locale === 'fr'
                ? "Aucune correspondance — essaie d'élargir ta recherche ou désactive le filtre."
                : 'No matches — try widening your search or disable the filter.'}
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
