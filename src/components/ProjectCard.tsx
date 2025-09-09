// components/ProjectCard.tsx
'use client';

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { Project } from '../../lib/projects';

export default function ProjectCard({
  slug,
  title,
  short,
  imageSrc,
  imageAlt,
  tech,
  demoUrl,
  repoUrl,
}: Project) {
  const titleId = `proj-title-${slug}`;

  return (
    <Card
      role="article"
      tabIndex={0}
      aria-labelledby={titleId}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        boxShadow: 2,
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        '&:hover': { transform: 'translateY(-3px)', boxShadow: 6 },
      }}
    >
      {imageSrc && (
        <Box sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
          <CardMedia component="img" image={imageSrc} alt={imageAlt || title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography id={titleId} variant="h6" component="h2" gutterBottom>
          {title}
        </Typography>

        {short && <Typography variant="body2" color="text.secondary" paragraph>{short}</Typography>}

        {tech && tech.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            {tech.map((t) => <Chip key={t} label={t} size="small" variant="outlined" />)}
          </Stack>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', gap: 1, px: 2, pb: 2 }}>
        <Button component={Link} href={`/projets/${slug}`} size="small" aria-label={`Voir les détails du projet ${title}`}>
          Détails
        </Button>

        {demoUrl && (
          <Button size="small" href={demoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ouvrir la démo de ${title}`}>
            Démo
          </Button>
        )}

        {repoUrl && (
          <Button size="small" href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Voir le code de ${title}`}>
            Code
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
