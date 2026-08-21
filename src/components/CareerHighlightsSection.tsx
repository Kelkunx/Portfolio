'use client';

import { ArrowOutward } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { getProfile } from '../../lib/content';
import { useLocale } from '../context/LocaleContext';
import SiteContainer from './SiteContainer';

function formatRange(start?: string, end?: string, locale = 'fr') {
  if (!start) return '';
  const present = locale === 'en' ? 'present' : 'présent';
  return end ? `${start} — ${end}` : `${start} — ${present}`;
}

const timelineTones = ['var(--cyan)', 'var(--green)', 'var(--purple)'];

export default function CareerHighlightsSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const experiences = profile.experiences
    .filter((item) => item.featured && item.kind !== 'other')
    .slice(0, 3)
    .reverse();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 }, borderTop: '1px solid var(--border)' }}>
      <SiteContainer>
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography component="h2" variant="h3" sx={{ color: 'var(--text)', mb: 1 }}>
            {locale === 'fr' ? 'Parcours en bref' : 'Career highlights'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '70ch' }}>
            {locale === 'fr'
              ? 'Trois contextes complémentaires, des systèmes connectés aux outils métier full-stack.'
              : 'Three complementary contexts, from connected systems to full-stack business tools.'}
          </Typography>
        </Box>

        <Box className="home-career-grid">
          <Box className="home-career-rail" aria-hidden="true" />
          {experiences.map((experience, index) => {
            const isFeatured = experience.company === 'CGI';
            const positionClass = index === 0 ? 'first' : index === experiences.length - 1 ? 'last' : 'middle';
            const tone = timelineTones[index % timelineTones.length];

            return (
              <Box
                key={`${experience.company}-${experience.start}`}
                component={Link}
                href="/cv"
                className={`home-career-item home-career-item--${positionClass}${isFeatured ? ' home-career-item--featured' : ''}`}
                style={{ '--career-tone': tone } as CSSProperties}
                aria-label={
                  locale === 'fr'
                    ? `Voir l'expérience ${experience.company} dans le CV`
                    : `View the ${experience.company} experience in the CV`
                }
              >
                <Box className="home-career-content">
                  <Typography className="home-career-period" variant="body2">
                    {formatRange(experience.start, experience.end, locale)}
                  </Typography>
                  <Typography className="home-career-title" component="h3">
                    {experience.company}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text)', mb: 0.75 }}>
                    {experience.role}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.65 }}>
                    {experience.summary}
                  </Typography>
                </Box>
                <Box className="home-career-dot" aria-hidden="true" />
              </Box>
            );
          })}
        </Box>

        <Button
          component={Link}
          href="/cv"
          variant="text"
          endIcon={<ArrowOutward className="home-link-arrow" />}
          sx={{ mt: { xs: 3, md: 2 }, px: 0, '&:hover': { backgroundColor: 'transparent' } }}
        >
          {locale === 'fr' ? 'Voir le CV complet' : 'View full CV'}
        </Button>
      </SiteContainer>
    </Box>
  );
}
