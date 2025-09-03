// components/ProjectsList.tsx
'use client';

import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import ProjectCard from './ProjectCard';
import { Project } from '../../lib/projects';

type Props = { projects: Project[] };

export default function ProjectsList({ projects }: Props) {
  const [query, setQuery] = useState('');
  const [activeTech, setActiveTech] = useState<string | null>(null);

  // extraire la liste des techs uniques
  const allTechs = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery =
        query.trim() === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.short.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
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
          />
          {allTechs.map((t) => (
            <Chip
              key={t}
              label={t}
              clickable
              color={activeTech === t ? 'primary' : 'default'}
              onClick={() => setActiveTech((cur) => (cur === t ? null : t))}
            />
          ))}
        </Stack>
      </Box>

      <Grid container spacing={4} aria-live="polite">
        {filtered.map((p) => (
          <Grid key={p.slug} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProjectCard
              title={p.title}
              short={p.short}
              description={p.description}
              slug={p.slug}
              imageSrc={p.imageSrc}
              imageAlt={p.imageAlt}
              tech={p.tech}
              demoUrl={p.demoUrl}
              repoUrl={p.repoUrl}
            />
          </Grid>
        ))}

        {filtered.length === 0 && (
          <Box sx={{ p: 4 }}>
            Aucune correspondance — essaie d'élargir ta recherche ou désactive le filtre.
          </Box>
        )}
      </Grid>
    </Container>
  );
}
