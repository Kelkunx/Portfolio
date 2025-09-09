// app/projets/page.tsx
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProjectCard from '../../components/ProjectCard';

const projects = [
  {
    title: 'App commandes',
    short: '',
    description: 'React + NestJS',
    slug: 'app-commandes',
    imageSrc: '/images/app-commandes.png',
    tech: ['React', 'NestJS', 'TypeScript'],
    demoUrl: 'https://demo.example.com/app-commandes',
    repoUrl: 'https://gitlab.com/ton-namespace/app-commandes',
  },
  {
    title: 'Blog statique',
    short:'',
    description: 'Next.js + Markdown',
    slug: 'blog-next',
    imageSrc: '/images/blog-next.png',
    tech: ['Next.js', 'Vercel'],
    demoUrl: 'https://demo.example.com/blog-next',
    repoUrl: 'https://github.com/ton-namespace/blog-next',
  },
];

export default function ProjectsPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Mes projets
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
              imageAlt={`${p.title} - aperçu`}
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
