'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import Stack from '@mui/material/Stack';
import { useLocale } from '../context/LocaleContext';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';

export default function LanguagesSection() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;

  const toeic = (profile.certifications || []).find((c) =>
    c.name.toLowerCase().includes('toeic')
  );

  return (
    <Box sx={{ mt: 8 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <LanguageIcon color="primary" />
        <Typography component="h4" variant="h5" color="primary" gutterBottom>
          {locale === 'en' ? 'Languages' : 'Langues'}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {profile.languages.map((lang) => {
          const extra =
            lang.name.toLowerCase() === (locale === 'en' ? 'english' : 'anglais') && toeic
              ? ` • TOEIC ${toeic.score}`
              : '';
          return (
            <Box
              key={lang.name}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                gap: 1,
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                p: 2.5,
                transition: 'transform 200ms ease, box-shadow 220ms ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 'var(--shadow-glow)',
                },
              }}
            >
              <Typography variant="subtitle1" color="text.primary">
                {lang.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {lang.level + extra}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
