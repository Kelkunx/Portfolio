'use client';

import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ProjectCard from './ProjectCard';
import type { Project } from '../../lib/projects';

type Props = { projects: Project[] };

export default function ProjectsList({ projects }: Props) {
  const [query, setQuery] = useState('');
  const [activeTech, setActiveTech] = useState<string | null>(null);

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
        <TextField
          aria-label="Recherche projets"
          placeholder="Rechercher un projet (titre, description...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />

        <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
          <Chip
            label="Tous"
            clickable
            color={!activeTech ? 'primary' : 'default'}
            onClick={() => setActiveTech(null)}
            sx={{
              fontWeight: !activeTech ? 600 : 400,
              textTransform: 'none',
            }}
          />
          {allTechs.map((t) => (
            <Chip
              key={t}
              label={t}
              clickable
              color={activeTech === t ? 'primary' : 'default'}
              onClick={() => setActiveTech((cur) => (cur === t ? null : t))}
              sx={{
                fontWeight: activeTech === t ? 600 : 400,
                textTransform: 'none',
              }}
            />
          ))}
        </Stack>
      </Box>

      <Grid container spacing={4} aria-live="polite">
        {filtered.map((p) => (
          <Grid key={p.slug} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ height: '100%' }}>
              <ProjectCard {...p} />
            </Box>
          </Grid>
        ))}

        {filtered.length === 0 && (
          <Grid size={{ xs: 12 }}>
            <Box sx={{ p: 4 }}>Aucune correspondance — essaie d&apos;élargir ta recherche ou désactive le filtre.</Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
