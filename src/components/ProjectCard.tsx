// src/components/ProjectCard.tsx
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
import type { Project } from '../../lib/projects';

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
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {imageSrc && (
        <Box sx={{ aspectRatio: '16/9', overflow: 'hidden' }}>
          <CardMedia component="img" image={imageSrc} alt={imageAlt || title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography component="h3" variant="h6" gutterBottom>
          {title}
        </Typography>

        {short ? (
          <Typography variant="body2" color="text.secondary" paragraph>
            {short}
          </Typography>
        ) : null}

        <Typography variant="body2" color="text.secondary">
          {/** si tu veux afficher description courte ici, attention à la longueur */}
        </Typography>

        {tech && tech.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
            {tech.map((t) => (
              <Chip key={t} label={t} size="small" variant="outlined" />
            ))}
          </Stack>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button component={Link} href={`/projets/${slug}`} size="small">Détails</Button>
        {demoUrl && <Button size="small" href={demoUrl} target="_blank" rel="noopener noreferrer">Démo</Button>}
        {repoUrl && <Button size="small" href={repoUrl} target="_blank" rel="noopener noreferrer">Code</Button>}
      </CardActions>
    </Card>
  );
}
