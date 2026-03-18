'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

function formatExperienceRange(start?: string, end?: string, locale = 'fr') {
  if (!start) return '';
  const present = locale === 'en' ? 'present' : 'présent';
  return end ? `${start} — ${end}` : `${start} — ${present}`;
}

export default function ExperienceSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const featuredExperiences = profile.experiences.filter((item) => item.kind !== 'other');
  const supportingExperiences = profile.experiences.filter((item) => item.kind === 'other');
  const accentTones = ['var(--cyan)', 'var(--purple)', 'var(--green)'];

  return (
    <Box sx={{ mt: 8 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
          {locale === 'fr' ? 'Expériences' : 'Experience'}
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {featuredExperiences.map((experience, index) => (
          <Box
            key={`${experience.company}-${experience.start}`}
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              borderTop: `2px solid ${accentTones[index % accentTones.length]}`,
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 3.5 },
              transition: 'border-color 160ms ease, background-color 160ms ease',
              '&:hover': {
                borderColor: accentTones[index % accentTones.length],
              },
            }}
          >
            <Stack spacing={1.5}>
              <Box>
                <Typography component="h3" variant="h6" sx={{ color: 'var(--text)' }}>
                  {experience.role} — {experience.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatExperienceRange(experience.start, experience.end, locale)} • {experience.location}
                </Typography>
              </Box>

              <Stack spacing={1.1}>
                {experience.bullets.map((bullet) => (
                  <Box
                    key={bullet}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '10px 1fr',
                      gap: 1.25,
                      alignItems: 'start',
                      borderLeft: `2px solid ${accentTones[index % accentTones.length]}`,
                      pl: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: accentTones[index % accentTones.length],
                        mt: '0.45rem',
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.72 }}>
                      {bullet}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        ))}
      </Stack>

      {supportingExperiences.length > 0 && (
        <Box
          sx={{
            mt: 4,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            borderTop: '2px solid var(--orange)',
            backgroundColor: 'var(--surface)',
            p: 3,
            transition: 'border-color 160ms ease, background-color 160ms ease',
            '&:hover': {
              borderColor: 'var(--orange)',
            },
          }}
        >
          <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1 }}>
            {locale === 'fr' ? 'Autres expériences' : 'Other experience'}
          </Typography>
          <Stack spacing={0.75}>
            {supportingExperiences.map((experience) => (
              <Box
                key={`${experience.company}-${experience.start}`}
                sx={{
                  borderLeft: '2px solid var(--orange)',
                  pl: 1.5,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {experience.role} — {experience.company} •{' '}
                  {formatExperienceRange(experience.start, experience.end, locale)}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
