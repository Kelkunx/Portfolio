'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

function formatRange(start?: string, end?: string, locale = 'fr') {
  if (!start) return '';
  const present = locale === 'en' ? 'present' : 'présent';
  return end ? `${start} — ${end}` : `${start} — ${present}`;
}

export default function ExperienceSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const mainExperiences = profile.experiences.filter((item) => item.kind !== 'other');
  const otherExperiences = profile.experiences.filter((item) => item.kind === 'other');
  const tones = ['var(--cyan)', 'var(--purple)', 'var(--green)'];

  return (
    <Box sx={{ mt: 8 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
          {locale === 'fr' ? 'Expériences' : 'Experience'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '70ch' }}>
          {locale === 'fr'
            ? 'Expériences principales liées au produit, au développement full-stack et à la livraison.'
            : 'Main experience related to product work, full-stack development and delivery.'}
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {mainExperiences.map((experience, index) => (
          <Box
            key={`${experience.company}-${experience.start}`}
            sx={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 3.5 },
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 4,
                background: `linear-gradient(90deg, ${tones[index % tones.length]}, transparent 72%)`,
              },
            }}
          >
            <Stack spacing={1.5}>
              <Box>
                <Typography component="h3" variant="h6" sx={{ color: 'var(--text)' }}>
                  {experience.role} — {experience.company}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatRange(experience.start, experience.end, locale)} • {experience.location}
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
                      borderRadius: 12,
                      border: '1px solid rgba(125, 207, 255, 0.12)',
                      backgroundColor: 'var(--surface-2)',
                      px: 1.5,
                      py: 1.2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: tones[index % tones.length],
                        mt: '0.45rem',
                        boxShadow: `0 0 0 4px color-mix(in srgb, ${tones[index % tones.length]} 22%, transparent)`,
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

      {otherExperiences.length > 0 && (
        <Box
          sx={{
            position: 'relative',
            mt: 4,
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            backgroundColor: 'var(--surface)',
            p: 3,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 3,
              background: 'linear-gradient(90deg, var(--orange), transparent)',
            },
          }}
        >
          <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1 }}>
            {locale === 'fr' ? 'Autres expériences' : 'Other experience'}
          </Typography>
          <Stack spacing={0.75}>
            {otherExperiences.map((experience) => (
              <Box
                key={`${experience.company}-${experience.start}`}
                sx={{
                  borderRadius: 12,
                  backgroundColor: 'var(--surface-2)',
                  border: '1px solid rgba(255, 158, 100, 0.16)',
                  px: 1.5,
                  py: 1.1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {experience.role} — {experience.company} • {formatRange(experience.start, experience.end, locale)}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
