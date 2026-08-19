'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { SchoolRounded } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';
import SectionTitle from './SectionTitle';

export default function EducationSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  return (
    <Box sx={{ mt: 8, mb: { xs: 4, md: 6 } }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <SectionTitle
          title={locale === 'fr' ? 'Formation' : 'Education'}
          icon={<SchoolRounded />}
          tone="orange"
        />
      </Stack>

      <Stack spacing={2}>
        {profile.education.map((education) => (
          <Box
            key={`${education.school}-${education.degree}`}
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--orange)',
              backgroundColor: 'var(--surface)',
              p: 3,
              transition: 'background-color 160ms ease, border-color 160ms ease',
              '&:hover': {
                borderColor: 'rgba(255, 158, 100, 0.42)',
                backgroundColor: 'rgba(255, 158, 100, 0.05)',
              },
            }}
          >
            <Typography component="h3" variant="h6" sx={{ color: 'var(--text)' }}>
              {education.degree}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {education.school} • {education.start}
              {education.end ? ` — ${education.end}` : ''}
            </Typography>
            {education.notes && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {education.notes.join(' • ')}
              </Typography>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
