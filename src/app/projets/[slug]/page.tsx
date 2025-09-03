// app/projets/[slug]/page.tsx
import React from 'react';
import { projects, Project } from '../../../../lib/projects';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Link from 'next/link';

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectDetail({ params }: Params) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h5">Projet introuvable</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        {project.title}
      </Typography>

      {project.imageSrc && (
        <Box sx={{ width: '100%', height: 320, position: 'relative', mb: 3 }}>
          <Image src={project.imageSrc} alt={project.imageAlt || project.title} fill style={{ objectFit: 'cover' }} />
        </Box>
      )}

      <Typography variant="body1" paragraph>
        {project.description}
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Stack :</Typography>
        <Box component="div" sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          {project.tech.map((t) => (
            <Box key={t} sx={{ px: 1.5, py: 0.5, bgcolor: 'grey.100', borderRadius: 1 }}>
              {t}
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        {project.demoUrl && (
          <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            Voir la démo
          </Link>
        )}
        {project.repoUrl && (
          <Box component="span" sx={{ ml: 3 }}>
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              Voir le code
            </Link>
          </Box>
        )}
      </Box>
    </Container>
  );
}
