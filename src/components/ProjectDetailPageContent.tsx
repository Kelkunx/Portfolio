'use client';

import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowOutward } from '@mui/icons-material';
import Link from 'next/link';
import {
  formatProjectPeriod,
  getProjectCategoryLabel,
  getProjects,
  getProjectStatusLabel,
} from '../../lib/content';
import { projectPlaceholderDataUrl } from '../../lib/project-placeholder';
import { useLocale } from '../context/LocaleContext';
import ImageLightbox from './ImageLightbox';
import TechStackChips from './TechStackChips';

type EditorialSectionProps = {
  title: string;
  children: ReactNode;
};

function EditorialSection({ title, children }: EditorialSectionProps) {
  return (
    <Box component="section" sx={{ borderTop: '1px solid var(--border)', py: { xs: 4, md: 6 } }}>
      <Grid container columnSpacing={{ md: 8 }} rowSpacing={2.5}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
            {title}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>{children}</Grid>
      </Grid>
    </Box>
  );
}

export default function ProjectDetailPageContent({ slug }: { slug?: string }) {
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

  const metadataLabel = [
    getProjectCategoryLabel(project.category, locale),
    getProjectStatusLabel(project.status, locale),
    formatProjectPeriod(project.period, locale, 'long'),
  ].join(' • ');
  const fallbackScreen = {
    src: projectPlaceholderDataUrl(project.title, locale),
    alt: project.imageAlt || project.title,
    caption: locale === 'fr' ? 'Capture à venir.' : 'Screenshot coming soon.',
  };
  const screens = project.screens.length > 0 ? project.screens : [fallbackScreen];
  const primaryScreen = screens[0];
  const galleryScreens = screens.slice(1);

  return (
    <Container component="article" maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box component="header" sx={{ mb: { xs: 4, md: 5 }, maxWidth: 900 }}>
        <Typography variant="body2" sx={{ color: 'var(--text-2)', fontWeight: 600, mb: 2 }}>
          {metadataLabel}
        </Typography>
        <Typography component="h1" variant="h2" sx={{ color: 'var(--text)', maxWidth: '16ch', mb: 2 }}>
          {project.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, maxWidth: '72ch' }}>
          {project.tagline}
        </Typography>
      </Box>

      {primaryScreen && (
        <Box component="figure" sx={{ m: 0, mb: { xs: 6, md: 9 } }}>
          <ImageLightbox
            src={primaryScreen.src}
            alt={primaryScreen.alt}
            priority
            aspectRatio="16/9"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <Typography
            component="figcaption"
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1.25, maxWidth: '80ch' }}
          >
            {primaryScreen.caption}
          </Typography>
        </Box>
      )}

      <Box sx={{ maxWidth: 980, mx: 'auto' }}>
        <EditorialSection title={locale === 'fr' ? 'Synthèse' : 'Overview'}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.85, maxWidth: '70ch' }}>
            {project.context}
          </Typography>

          <Grid container columnSpacing={5} rowSpacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ borderTop: '1px solid var(--border)', pt: 2 }}>
                <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1 }}>
                  {locale === 'fr' ? 'Mon rôle' : 'My role'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {project.role}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ borderTop: '1px solid var(--border)', pt: 2 }}>
                <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1 }}>
                  {locale === 'fr' ? 'Livrables' : 'Deliverables'}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.25, color: 'var(--text-2)' }}>
                  {project.deliverables.map((deliverable) => (
                    <Typography
                      key={deliverable}
                      component="li"
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.75, pl: 0.5 }}
                    >
                      {deliverable}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </EditorialSection>

        <EditorialSection title={locale === 'fr' ? 'Contrainte' : 'Constraint'}>
          <Typography
            variant="body1"
            sx={{ color: 'var(--text)', fontSize: { md: '1.12rem' }, lineHeight: 1.85, maxWidth: '68ch' }}
          >
            {project.problem}
          </Typography>
        </EditorialSection>

        <EditorialSection title={locale === 'fr' ? 'Décisions' : 'Decisions'}>
          <Box component="ol" sx={{ m: 0, pl: 2.5 }}>
            {project.process.map((item) => (
              <Typography
                key={item}
                component="li"
                variant="body1"
                color="text.secondary"
                sx={{ pl: 1, mb: 1.75, lineHeight: 1.8, '&::marker': { color: 'var(--cyan)', fontWeight: 700 } }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </EditorialSection>

        <EditorialSection title={locale === 'fr' ? 'Solution' : 'Solution'}>
          <Stack spacing={2}>
            {project.solution.map((item) => (
              <Box key={item} sx={{ borderLeft: '2px solid var(--purple)', pl: 2 }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Stack>
        </EditorialSection>

        <EditorialSection title={locale === 'fr' ? 'Preuves' : 'Evidence'}>
          <Stack component="dl" spacing={0} sx={{ m: 0 }}>
            {project.highlights.map((highlight) => (
              <Grid
                container
                component="div"
                key={`${highlight.value}-${highlight.label}`}
                columnSpacing={3}
                rowSpacing={0.75}
                sx={{ borderTop: '1px solid var(--border)', py: 2.25, '&:last-child': { pb: 0 } }}
              >
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography component="dt" variant="body1" sx={{ color: 'var(--green)', fontWeight: 700 }}>
                    {highlight.value}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }}>
                  <Typography component="dd" variant="body2" color="text.secondary" sx={{ m: 0, lineHeight: 1.75 }}>
                    {highlight.label}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Stack>
        </EditorialSection>

        {galleryScreens.length > 0 && (
          <EditorialSection title={locale === 'fr' ? 'Galerie' : 'Gallery'}>
            <Stack spacing={3}>
              {galleryScreens.map((screen) => (
                <Box component="figure" key={screen.src} sx={{ m: 0 }}>
                  <ImageLightbox src={screen.src} alt={screen.alt} aspectRatio="16/9" />
                  <Typography component="figcaption" variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {screen.caption}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </EditorialSection>
        )}

        <EditorialSection title={locale === 'fr' ? 'Ressources' : 'Resources'}>
          <Stack spacing={4}>
            <Box>
              <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1.5 }}>
                {locale === 'fr' ? 'Stack technique' : 'Technical stack'}
              </Typography>
              <TechStackChips items={project.tech} />
            </Box>

            <Box>
              <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1.5 }}>
                {locale === 'fr' ? 'Liens' : 'Links'}
              </Typography>
              <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap">
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
        </EditorialSection>

        {nextProject && (
          <Box
            component="nav"
            aria-label={locale === 'fr' ? 'Projet suivant' : 'Next project'}
            sx={{ borderTop: '1px solid var(--border)', pt: { xs: 4, md: 6 } }}
          >
            <Grid container columnSpacing={{ md: 8 }} rowSpacing={2} alignItems="start">
              <Grid size={{ xs: 12, md: 3 }}>
                <Typography variant="body1" sx={{ color: 'var(--text-2)', fontWeight: 600 }}>
                  {locale === 'fr' ? 'Projet suivant' : 'Next project'}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 9 }}>
                <Typography component="h2" variant="h4" sx={{ color: 'var(--text)', mb: 1 }}>
                  {nextProject.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '60ch', mb: 2, lineHeight: 1.75 }}>
                  {nextProject.short}
                </Typography>
                <Button component={Link} href={`/projets/${nextProject.slug}`} variant="outlined" endIcon={<ArrowOutward />}>
                  {locale === 'fr' ? 'Voir le projet' : 'View project'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
}
