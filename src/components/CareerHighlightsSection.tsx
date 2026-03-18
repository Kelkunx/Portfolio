'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { WorkHistoryRounded } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';
import SectionTitle from './SectionTitle';

function formatRange(start?: string, end?: string, locale = 'fr') {
  if (!start) return '';
  const present = locale === 'en' ? 'present' : 'présent';
  return end ? `${start} — ${end}` : `${start} — ${present}`;
}

export default function CareerHighlightsSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const experiences = profile.experiences.filter((item) => item.featured && item.kind !== 'other').slice(0, 3);
  const tones = ['var(--cyan)', 'var(--purple)', 'var(--green)'];

  return (
    <Box component="section" sx={{ mt: { xs: 8, md: 12 } }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <SectionTitle
          title={locale === 'fr' ? 'Parcours en bref' : 'Career highlights'}
          icon={<WorkHistoryRounded />}
          tone="purple"
        />
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '70ch' }}>
          {locale === 'fr'
            ? 'Des expériences qui relient développement full-stack, automatisation et qualité logicielle.'
            : 'Experience spanning full-stack development, automation and software quality.'}
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {experiences.map((experience, index) => (
          <Grid key={`${experience.company}-${experience.start}`} size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                borderTop: `2px solid ${tones[index % tones.length]}`,
                backgroundColor: 'var(--surface)',
                p: 3,
                height: '100%',
                transition: 'transform 180ms ease, border-color 160ms ease, background-color 160ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderColor: tones[index % tones.length],
                  backgroundColor: 'var(--surface-2)',
                },
              }}
            >
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.5 }}>
                    {formatRange(experience.start, experience.end, locale)}
                  </Typography>
                  <Typography component="h3" variant="h6" sx={{ color: 'var(--text)' }}>
                    {experience.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {experience.company} • {experience.location}
                  </Typography>
                </Box>

                <Stack spacing={1}>
                  {experience.bullets.slice(0, 2).map((bullet) => (
                    <Box
                      key={bullet}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '8px 1fr',
                        gap: 1.1,
                        alignItems: 'start',
                        borderRadius: 1,
                        backgroundColor: 'var(--surface-2)',
                        border: '1px solid rgba(125, 207, 255, 0.1)',
                        px: 1.35,
                        py: 1.1,
                        '& + &': {
                          mt: 1,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: tones[index % tones.length],
                          mt: '0.45rem',
                        }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.68 }}>
                        {bullet}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Button component={Link} href="/cv" variant="text" sx={{ mt: 3, px: 0 }}>
        {locale === 'fr' ? 'Voir le CV complet' : 'View full CV'}
      </Button>
    </Box>
  );
}
