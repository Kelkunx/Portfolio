'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import SchoolIcon from '@mui/icons-material/School';
import { useLocale } from '../context/LocaleContext';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';

export default function EducationSection() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;

  return (
    <Box sx={{ mt: 8 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <SchoolIcon color="primary" />
        <Typography component="h4" variant="h5" color="primary" gutterBottom>
          {locale === 'en' ? 'Education' : 'Formations'}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {profile.education.map((edu, i) => (
          <Box
            key={i}
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: 3,
              transition: 'transform 200ms ease, box-shadow 220ms ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 'var(--shadow-glow)',
              },
            }}
          >
            <Typography component="h5" variant="subtitle1" color="text.primary">
              {edu.degree} — {edu.school}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {edu.start} {edu.end ? `— ${edu.end}` : locale === 'en' ? '— present' : '— présent'}
            </Typography>
            {edu.notes && (
              <Box component="ul" sx={{ mt: 1.5, ml: 0 }}>
                {edu.notes.map((n, idx) => (
                  <li key={idx}>
                    <Typography variant="body2" color="text.secondary">
                      {n}
                    </Typography>
                  </li>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
