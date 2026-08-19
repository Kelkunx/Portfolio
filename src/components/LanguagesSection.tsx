'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { TranslateRounded } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';
import SectionTitle from './SectionTitle';

export default function LanguagesSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  return (
    <Box sx={{ mt: 8 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <SectionTitle
          title={locale === 'fr' ? 'Langues' : 'Languages'}
          icon={<TranslateRounded />}
          tone="cyan"
        />
      </Stack>

      <Stack spacing={2}>
        {profile.languages.map((language) => (
          <Box
            key={language.name}
            sx={{
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--cyan)',
              backgroundColor: 'var(--surface)',
              p: 2.5,
              transition: 'background-color 160ms ease, border-color 160ms ease',
              '&:hover': {
                borderColor: 'rgba(125, 207, 255, 0.42)',
                backgroundColor: 'rgba(125, 207, 255, 0.05)',
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ color: 'var(--text)' }}>
              {language.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {language.level}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
