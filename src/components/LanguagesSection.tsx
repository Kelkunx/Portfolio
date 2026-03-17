'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

export default function LanguagesSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const toeicCertification = profile.certifications.find((item) => item.name.toLowerCase().includes('toeic'));
  const accentTones = ['var(--cyan)', 'var(--purple)', 'var(--green)'];

  return (
    <Box sx={{ mt: 8 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
          {locale === 'fr' ? 'Langues' : 'Languages'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {locale === 'fr' ? 'Niveaux utiles en contexte professionnel.' : 'Useful language levels in professional contexts.'}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {profile.languages.map((language, index) => {
          const scoreSuffix =
            language.name.toLowerCase() === (locale === 'fr' ? 'anglais' : 'english') && toeicCertification
              ? ` • TOEIC ${toeicCertification.score}`
              : '';
          const accentTone = accentTones[index % accentTones.length];

          return (
            <Box
              key={language.name}
              sx={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                p: 2.5,
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 3,
                  background: `linear-gradient(90deg, ${accentTone}, transparent 72%)`,
                },
              }}
            >
              <Typography variant="subtitle1" sx={{ color: 'var(--text)' }}>
                {language.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {language.level}
                {scoreSuffix}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
