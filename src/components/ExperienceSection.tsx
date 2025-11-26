'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useLocale } from '../context/LocaleContext';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';

function formatRange(start?: string, end?: string, locale = 'fr') {
  if (!start) return '';
  const present = locale === 'en' ? 'present' : 'présent';
  return end ? `${start} — ${end}` : `${start} — ${present}`;
}

export default function ExperienceSection() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <WorkOutlineIcon color="primary" />
        <Typography component="h4" variant="h5" color="primary" gutterBottom>
          {locale === 'en' ? 'Experience' : 'Expériences professionnelles'}
        </Typography>
      </Stack>

      <Stack spacing={3}>
        {profile.experiences.map((exp, i) => (
          <Box key={i} sx={{ borderLeft: '3px solid', borderColor: 'divider', pl: 3 }}>
            <Typography variant="subtitle1" component="h3" color="text.primary">
              {exp.role} — {exp.company}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatRange(exp.start, exp.end, locale)} • {exp.location}
            </Typography>
            <Box component="ul" sx={{ mt: 1, ml: 0 }}>
              {exp.bullets.map((b, idx) => (
                <li key={idx}>
                  <Typography variant="body2" color="text.secondary">
                    {b}
                  </Typography>
                </li>
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
