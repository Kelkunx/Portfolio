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
  const supportingExperienceGroups = [
    ...supportingExperiences
      .reduce((groups, experience) => {
        const key = `${experience.role}-${experience.company}`;
        const period = formatExperienceRange(experience.start, experience.end, locale);
        const existingGroup = groups.get(key);

        if (existingGroup) {
          existingGroup.periods.push(period);
        } else {
          groups.set(key, {
            company: experience.company,
            role: experience.role,
            periods: [period],
          });
        }

        return groups;
      }, new Map<string, { company: string; role: string; periods: string[] }>())
      .values(),
  ];

  return (
    <Box sx={{ mt: 8 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <SectionTitle
          title={locale === 'fr' ? 'Expériences' : 'Experience'}
          icon={<BusinessCenterRounded />}
          tone="green"
        />
      </Stack>

      <Stack spacing={2}>
        {featuredExperiences.map((experience) => (
          <Box
            key={`${experience.company}-${experience.start}`}
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--green)',
              backgroundColor: 'var(--surface)',
              p: { xs: 2.5, md: 3 },
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
                        backgroundColor: 'var(--green)',
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
            borderTop: '1px solid var(--border)',
            pt: 2.5,
          }}
        >
          <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1.25 }}>
            {locale === 'fr' ? 'Autres expériences' : 'Other experience'}
          </Typography>
          <Stack spacing={1}>
            {supportingExperienceGroups.map((experience) => (
              <Box
                key={`${experience.company}-${experience.role}`}
                sx={{ display: 'flex', justifyContent: 'space-between', gap: 1.5, flexWrap: 'wrap' }}
              >
                <Typography variant="body2" color="text.secondary">
                  {experience.role} — {experience.company}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-2)' }}>
                  {experience.periods.join(' • ')}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
