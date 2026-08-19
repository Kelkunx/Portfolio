'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BusinessCenterRounded } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';
import SectionTitle from './SectionTitle';

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
        <SectionTitle
          title={locale === 'fr' ? 'Expériences' : 'Experience'}
          icon={<BusinessCenterRounded />}
          tone="green"
        />
      </Stack>

      <Stack spacing={3}>
        {featuredExperiences.map((experience, index) => (
          <Box
            key={`${experience.company}-${experience.start}`}
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              borderLeft: `3px solid ${accentTones[index % accentTones.length]}`,
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 3.5 },
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
                      gridTemplateColumns: '7px 1fr',
                      gap: 1.25,
                      alignItems: 'start',
                    }}
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
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
            borderLeft: '3px solid var(--orange)',
            backgroundColor: 'var(--surface)',
            p: 3,
          }}
        >
          <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1 }}>
            {locale === 'fr' ? 'Autres expériences' : 'Other experience'}
          </Typography>
          <Stack spacing={0.75}>
            {supportingExperiences.map((experience) => (
              <Typography
                key={`${experience.company}-${experience.start}`}
                variant="body2"
                color="text.secondary"
              >
                {experience.role} — {experience.company} •{' '}
                {formatExperienceRange(experience.start, experience.end, locale)}
              </Typography>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
