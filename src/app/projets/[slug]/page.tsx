'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { ArrowOutward } from '@mui/icons-material';
import ImageLightbox from '../../../components/ImageLightbox';
import TechStackChips from '../../../components/TechStackChips';
import { useLocale } from '../../../context/LocaleContext';
import { getProjects } from '../../../../lib/content';
import { projectPlaceholderDataUrl } from '../../../../lib/project-placeholder';

function formatDate(date?: string, locale = 'fr') {
  if (!date) return undefined;
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return date;

  return value.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
  });
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const { locale } = useLocale();
  const projects = getProjects(locale);
  const projectIndex = slug ? projects.findIndex((item) => item.slug === slug) : -1;
  const project = projectIndex >= 0 ? projects[projectIndex] : undefined;
  const nextProject =
    projectIndex >= 0 && projects.length > 1 ? projects[(projectIndex + 1) % projects.length] : undefined;

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography component="h1" variant="h4" sx={{ color: 'var(--text)' }}>
          {locale === 'fr' ? 'Projet introuvable' : 'Project not found'}
        </Typography>
        <Button component={Link} href="/projets" sx={{ mt: 2, px: 0 }}>
          {locale === 'fr' ? 'Retour aux projets' : 'Back to projects'}
        </Button>
      </Container>
    );
  }

  const published = formatDate(project.date, locale);
  const fallbackScreen = {
    src: projectPlaceholderDataUrl(project.title, locale),
    alt: project.imageAlt || project.title,
    caption: locale === 'fr' ? 'Capture à venir.' : 'Screenshot coming soon.',
  };
  const screens = project.screens.length > 0 ? project.screens : [fallbackScreen];
  const primaryScreen = screens[0];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Stack spacing={2} sx={{ mb: 5, maxWidth: 860 }}>
        <Typography variant="body2" sx={{ color: 'var(--text-2)', fontWeight: 600 }}>
          {published ? `${project.status} • ${published}` : project.status}
        </Typography>

        <Typography component="h1" variant="h2" sx={{ color: 'var(--text)', maxWidth: '14ch' }}>
          {project.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {project.tagline}
        </Typography>
      </Stack>

      {primaryScreen && (
        <Box sx={{ mb: 5 }}>
          <ImageLightbox src={primaryScreen.src} alt={primaryScreen.alt} priority aspectRatio="16/9" />
        </Box>
      )}

      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--cyan)',
              backgroundColor: 'var(--surface)',
              p: 3,
              height: '100%',
              transition: 'background-color 160ms ease, border-color 160ms ease',
              '&:hover': {
                borderColor: 'var(--cyan)',
                backgroundColor: 'rgba(125, 207, 255, 0.05)',
              },
            }}
          >
            <Typography variant="body1" sx={{ color: 'var(--text-2)', mb: 0.75 }}>
              {locale === 'fr' ? 'Contexte' : 'Context'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.8 }}>
              {project.context}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--purple)',
              backgroundColor: 'var(--surface)',
              p: 3,
              height: '100%',
              transition: 'background-color 160ms ease, border-color 160ms ease',
              '&:hover': {
                borderColor: 'var(--purple)',
                backgroundColor: 'rgba(187, 154, 247, 0.05)',
              },
            }}
          >
            <Typography variant="body1" sx={{ color: 'var(--text-2)', mb: 0.75 }}>
              {locale === 'fr' ? 'Problème' : 'Problem'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.8 }}>
              {project.problem}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--green)',
              backgroundColor: 'var(--surface)',
              p: 3,
              height: '100%',
              transition: 'background-color 160ms ease, border-color 160ms ease',
              '&:hover': {
                borderColor: 'var(--green)',
                backgroundColor: 'rgba(158, 206, 106, 0.05)',
              },
            }}
          >
            <Typography variant="body1" sx={{ color: 'var(--text-2)', mb: 0.75 }}>
              {locale === 'fr' ? 'Mon rôle' : 'My role'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.8 }}>
              {project.role}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--orange)',
              backgroundColor: 'var(--surface)',
              p: 3,
              height: '100%',
              transition: 'background-color 160ms ease, border-color 160ms ease',
              '&:hover': {
                borderColor: 'var(--orange)',
                backgroundColor: 'rgba(255, 158, 100, 0.05)',
              },
            }}
          >
            <Typography variant="body1" sx={{ color: 'var(--text-2)', mb: 0.75 }}>
              {locale === 'fr' ? 'Livrables' : 'Deliverables'}
            </Typography>
            <Stack spacing={0.75} sx={{ mt: 1 }}>
              {project.deliverables.map((deliverable) => (
                <Typography key={deliverable} variant="body2" color="text.secondary">
                  • {deliverable}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--cyan)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
              mb: 3,
              transition: 'border-color 160ms ease, background-color 160ms ease',
              '&:hover': {
                borderColor: 'var(--cyan)',
                backgroundColor: 'rgba(125, 207, 255, 0.03)',
              },
            }}
          >
            <Typography component="h2" variant="h4" sx={{ color: 'var(--text)', mb: 2 }}>
              {locale === 'fr' ? 'Approche / Process' : 'Approach / Process'}
            </Typography>
            <Stack spacing={1.25}>
              {project.process.map((item) => (
                <Typography key={item} variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  • {item}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--purple)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
              mb: 3,
              transition: 'border-color 160ms ease, background-color 160ms ease',
              '&:hover': {
                borderColor: 'var(--purple)',
                backgroundColor: 'rgba(187, 154, 247, 0.03)',
              },
            }}
          >
            <Typography component="h2" variant="h4" sx={{ color: 'var(--text)', mb: 2 }}>
              {locale === 'fr' ? 'Solution' : 'Solution'}
            </Typography>
            <Stack spacing={1.25}>
              {project.solution.map((item) => (
                <Typography key={item} variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  • {item}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--green)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
            }}
          >
            <Typography component="h2" variant="h4" sx={{ color: 'var(--text)', mb: 2 }}>
              {locale === 'fr' ? 'Visuels' : 'Visuals'}
            </Typography>
            <Grid container spacing={2}>
              {screens.map((screen) => (
                <Grid key={screen.src} size={{ xs: 12, md: screens.length > 1 ? 6 : 12 }}>
                  <Stack spacing={1}>
                    <ImageLightbox src={screen.src} alt={screen.alt} aspectRatio="16/9" />
                    <Typography variant="body2" color="text.secondary">
                      {screen.caption}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Box
              sx={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                borderTop: '2px solid var(--green)',
                backgroundColor: 'var(--surface)',
                p: 3,
                transition: 'border-color 160ms ease, background-color 160ms ease',
                '&:hover': {
                  borderColor: 'var(--green)',
                  backgroundColor: 'rgba(158, 206, 106, 0.03)',
                },
              }}
            >
              <Typography component="h2" variant="h5" sx={{ color: 'var(--text)', mb: 2 }}>
                {locale === 'fr' ? 'Résultats' : 'Outcomes'}
              </Typography>
              <Stack spacing={1.5}>
                {project.results.map((result) => (
                  <Box
                    key={`${result.value}-${result.label}`}
                    sx={{
                      borderLeft: '2px solid var(--cyan)',
                      pl: 1.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: 'var(--text)', fontWeight: 600, mb: 0.4 }}>
                      {result.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {result.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                p: 3,
              }}
            >
              <Typography component="h2" variant="h5" sx={{ color: 'var(--text)', mb: 2 }}>
                {locale === 'fr' ? 'Stack' : 'Stack'}
              </Typography>
              <TechStackChips items={project.tech} />
            </Box>

            <Box
              sx={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                p: 3,
              }}
            >
              <Typography component="h2" variant="h5" sx={{ color: 'var(--text)', mb: 2 }}>
                {locale === 'fr' ? 'Liens' : 'Links'}
              </Typography>
              <Stack spacing={1.25}>
                {project.links.map((link) => {
                  const isInternal = link.url.startsWith('/');
                  return (
                    <Button
                      key={`${link.label}-${link.url}`}
                      component={isInternal ? Link : 'a'}
                      href={link.url}
                      target={isInternal ? undefined : '_blank'}
                      rel={isInternal ? undefined : 'noopener noreferrer'}
                      variant={link.type === 'contact' ? 'contained' : 'outlined'}
                      endIcon={<ArrowOutward />}
                    >
                      {link.label}
                    </Button>
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {nextProject && (
        <Box
          sx={{
            mt: 6,
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            borderTop: '2px solid var(--orange)',
            backgroundColor: 'var(--surface)',
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography variant="body1" sx={{ color: 'var(--text-2)', mb: 0.75 }}>
            {locale === 'fr' ? 'Projet suivant' : 'Next project'}
          </Typography>
          <Typography variant="h4" sx={{ color: 'var(--text)', mb: 1 }}>
            {nextProject.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '60ch', mb: 2 }}>
            {nextProject.short}
          </Typography>
          <Button component={Link} href={`/projets/${nextProject.slug}`} variant="contained" endIcon={<ArrowOutward />}>
            {locale === 'fr' ? 'Voir le projet' : 'View project'}
          </Button>
        </Box>
      )}
    </Container>
  );
}
