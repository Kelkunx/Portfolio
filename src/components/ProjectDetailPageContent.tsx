'use client';

import ArrowOutward from '@mui/icons-material/ArrowOutward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  formatProjectPeriod,
  getProjectCategoryLabel,
  getProjects,
  getProjectStatusLabel,
} from '../../lib/content';
import type { ProjectLink } from '../../lib/content-types';
import { projectPlaceholderDataUrl } from '../../lib/project-placeholder';
import { useLocale } from '../context/LocaleContext';
import ImageLightbox from './ImageLightbox';
import LocalSectionNav, { type LocalSectionNavItem } from './LocalSectionNav';
import ProjectThumbnail from './ProjectThumbnail';
import SiteContainer from './SiteContainer';
import TechStackChips from './TechStackChips';

type CaseStudySectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

function CaseStudySection({ id, title, children }: CaseStudySectionProps) {
  return (
    <Box component="section" id={id} className="case-study-section">
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'var(--text)',
          mb: { xs: 2.5, md: 3.5 },
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function ResourceLink({ link }: { link: ProjectLink }) {
  const isInternal = link.url.startsWith('/');

  if (isInternal) {
    return (
      <Button component={Link} href={link.url} variant={link.type === 'contact' ? 'contained' : 'outlined'} endIcon={<ArrowOutward />}>
        {link.label}
      </Button>
    );
  }

  return (
    <Button
      component="a"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      endIcon={<ArrowOutward />}
    >
      {link.label}
    </Button>
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
      <SiteContainer sx={{ py: 8 }}>
        <Typography component="h1" variant="h4" sx={{ color: 'var(--text)' }}>
          {locale === 'fr' ? 'Projet introuvable' : 'Project not found'}
        </Typography>
        <Button component={Link} href="/projets" sx={{ mt: 2, px: 0 }}>
          {locale === 'fr' ? 'Retour aux projets' : 'Back to projects'}
        </Button>
      </SiteContainer>
    );
  }

  const fallbackScreen = {
    src: projectPlaceholderDataUrl(project.title, locale),
    alt: project.imageAlt || project.title,
    caption: locale === 'fr' ? 'Capture à venir.' : 'Screenshot coming soon.',
  };
  const screens = project.screens.length > 0 ? project.screens : [fallbackScreen];
  const primaryScreen = screens[0];
  const galleryScreens = screens.slice(1);
  const navigationItems: LocalSectionNavItem[] = [
    { id: 'overview', label: locale === 'fr' ? 'Synthèse' : 'Overview' },
    { id: 'problem', label: locale === 'fr' ? 'Problème' : 'Problem' },
    { id: 'decisions', label: locale === 'fr' ? 'Décisions' : 'Decisions' },
    { id: 'solution', label: 'Solution' },
    ...(galleryScreens.length > 0
      ? [{ id: 'gallery', label: locale === 'fr' ? 'Galerie' : 'Gallery' }]
      : []),
    { id: 'resources', label: locale === 'fr' ? 'Ressources' : 'Resources' },
  ];
  const solutionTones = [
    { color: 'var(--purple)', tint: 'rgba(187, 154, 247, 0.045)' },
    { color: 'var(--cyan)', tint: 'rgba(125, 207, 255, 0.045)' },
    { color: 'var(--green)', tint: 'rgba(158, 206, 106, 0.045)' },
  ];

  return (
    <SiteContainer component="article" sx={{ py: { xs: 6, md: 9 } }}>
      <Box component="header" className="project-detail-header">
        <Box>
          <Typography variant="body2" sx={{ color: 'var(--purple)', fontWeight: 700, mb: 2 }}>
            {getProjectCategoryLabel(project.category, locale)} • {getProjectStatusLabel(project.status, locale)}
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            sx={{ color: 'var(--text)', fontSize: { xs: '2.5rem', sm: '3.5rem' }, maxWidth: '16ch', mb: 2 }}
          >
            {project.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.8, maxWidth: '68ch' }}>
            {project.tagline}
          </Typography>
        </Box>

        <Box className="project-detail-meta">
          <Box>
            <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 0.5 }}>
              {locale === 'fr' ? 'Rôle' : 'Role'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text)', lineHeight: 1.7 }}>
              {project.role}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 0.5 }}>
              {locale === 'fr' ? 'Période' : 'Period'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text)' }}>
              {formatProjectPeriod(project.period, locale, 'long')}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 1 }}>
              {locale === 'fr' ? 'Stack' : 'Stack'}
            </Typography>
            <TechStackChips items={project.tech} limit={6} />
          </Box>
          <Box
            component="a"
            href="#resources"
            sx={{ color: 'var(--cyan)', textDecoration: 'none', fontWeight: 600, width: 'fit-content' }}
          >
            {locale === 'fr' ? 'Voir les liens du projet' : 'View project links'} →
          </Box>
        </Box>
      </Box>

      {primaryScreen && (
        <Box component="figure" sx={{ m: 0, mt: { xs: 5, md: 8 } }}>
          <ImageLightbox
            src={primaryScreen.src}
            alt={primaryScreen.alt}
            aspectRatio="16/9"
            sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 1199px) calc(100vw - 64px), (max-width: 1536px) calc(100vw - 96px), 1440px"
            thumbnailFit="contain"
            thumbnailPosition="center"
          />
          <Typography component="figcaption" variant="body2" sx={{ color: 'var(--text-2)', mt: 1.25, maxWidth: '82ch' }}>
            {primaryScreen.caption}
          </Typography>
        </Box>
      )}

      <Box component="dl" className="project-evidence-band">
        {project.highlights.map((highlight, index) => {
          const tones = ['var(--cyan)', 'var(--green)', 'var(--orange)'];

          return (
            <Box component="div" key={`${highlight.value}-${highlight.label}`} sx={{ borderColor: tones[index % tones.length] }}>
              <Typography component="dt" variant="h6" sx={{ color: tones[index % tones.length], mb: 0.75 }}>
                {highlight.value}
              </Typography>
              <Typography component="dd" variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.65, m: 0 }}>
                {highlight.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box className="editorial-document-layout">
        <LocalSectionNav
          items={navigationItems}
          ariaLabel={locale === 'fr' ? 'Sommaire du projet' : 'Project contents'}
        />

        <Box>
          <CaseStudySection id="overview" title={locale === 'fr' ? 'Synthèse' : 'Overview'}>
            <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.9, maxWidth: '72ch' }}>
              {project.context}
            </Typography>
            <Box sx={{ mt: 4, borderTop: '1px solid var(--border)', pt: 2.5 }}>
              <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 2 }}>
                {locale === 'fr' ? 'Livrables' : 'Deliverables'}
              </Typography>
              <Grid component="ul" container spacing={{ xs: 1.5, md: 2 }} sx={{ m: 0, p: 0, listStyle: 'none' }}>
                {project.deliverables.map((deliverable, index) => (
                  <Grid component="li" key={deliverable} size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '28px 1fr', gap: 1.25 }}>
                      <Typography aria-hidden="true" variant="body2" sx={{ color: 'var(--cyan)', fontWeight: 700 }}>
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
                        {deliverable}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CaseStudySection>

          <CaseStudySection id="problem" title={locale === 'fr' ? 'Problème' : 'Problem'}>
            <Box sx={{ borderLeft: '3px solid var(--orange)', pl: { xs: 2.5, md: 3.5 }, py: 0.5 }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'var(--text)',
                  fontSize: { xs: '1.45rem', sm: '1.75rem', md: '2.125rem' },
                  lineHeight: 1.5,
                  maxWidth: '32ch',
                }}
              >
                {project.problem}
              </Typography>
            </Box>
          </CaseStudySection>

          <CaseStudySection id="decisions" title={locale === 'fr' ? 'Décisions' : 'Decisions'}>
            <Box component="ol" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              {project.process.map((item, index) => (
                <Box component="li" key={item} className="case-study-numbered-row">
                  <Typography aria-hidden="true" variant="h5" sx={{ color: 'var(--cyan)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CaseStudySection>

          <CaseStudySection id="solution" title="Solution">
            <Grid container columnSpacing={4} rowSpacing={3}>
              {project.solution.map((item, index) => {
                const tone = solutionTones[index % solutionTones.length];

                return (
                  <Grid key={item} size={{ xs: 12, md: 6 }}>
                    <Box
                      className="case-study-solution"
                      sx={{ '--solution-tone': tone.color, '--solution-tint': tone.tint }}
                    >
                      <Typography aria-hidden="true" variant="h5" sx={{ color: 'var(--solution-tone)' }}>
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
                        {item}
                      </Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </CaseStudySection>

          {galleryScreens.length > 0 && (
            <CaseStudySection id="gallery" title={locale === 'fr' ? 'Galerie' : 'Gallery'}>
              <Stack spacing={4}>
                {galleryScreens.map((screen) => (
                  <Box component="figure" key={screen.src} sx={{ m: 0 }}>
                    <ImageLightbox
                      src={screen.src}
                      alt={screen.alt}
                      aspectRatio="16/9"
                      sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 899px) calc(100vw - 64px), 860px"
                      thumbnailFit="contain"
                    />
                    <Typography component="figcaption" variant="body2" sx={{ color: 'var(--text-2)', mt: 1 }}>
                      {screen.caption}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CaseStudySection>
          )}

          <CaseStudySection id="resources" title={locale === 'fr' ? 'Ressources' : 'Resources'}>
            <Grid container spacing={{ xs: 4, md: 6 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 2 }}>
                  {locale === 'fr' ? 'Stack technique' : 'Technical stack'}
                </Typography>
                <TechStackChips items={project.tech} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 2 }}>
                  {locale === 'fr' ? 'Liens' : 'Links'}
                </Typography>
                <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap">
                  {project.links.map((link) => (
                    <ResourceLink key={`${link.type}-${link.url}`} link={link} />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </CaseStudySection>
        </Box>
      </Box>

      {nextProject && (
        <Box component="nav" aria-label={locale === 'fr' ? 'Projet suivant' : 'Next project'} sx={{ mt: { xs: 7, md: 10 } }}>
          <Box component={Link} href={`/projets/${nextProject.slug}`} className="next-project-link">
            <Box>
              <Typography variant="body2" sx={{ color: 'var(--purple)', fontWeight: 700, mb: 1 }}>
                {locale === 'fr' ? 'Projet suivant' : 'Next project'}
              </Typography>
              <Typography
                component="h2"
                variant="h3"
                sx={{ color: 'var(--text)', mb: 1, fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' } }}
              >
                {nextProject.title}
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-2)', maxWidth: '58ch', lineHeight: 1.75 }}>
                {nextProject.short}
              </Typography>
            </Box>
            <ProjectThumbnail
              src={nextProject.imageSrc}
              alt=""
              title={nextProject.title}
              locale={locale}
              sizes="(max-width: 599px) calc(100vw - 40px), (max-width: 899px) calc(100vw - 64px), 360px"
              className="next-project-thumbnail"
            />
            <ArrowOutward className="next-project-arrow" aria-hidden="true" />
          </Box>
        </Box>
      )}
    </SiteContainer>
  );
}
