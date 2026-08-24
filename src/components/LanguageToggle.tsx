// components/LanguageToggle.tsx
'use client';

import React from 'react';
import Button from '@mui/material/Button';
import LanguageIcon from '@mui/icons-material/Language';
import { useLocale } from '../context/LocaleContext';

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const nextLocale = locale === 'fr' ? 'en' : 'fr';

  return (
    <Button
      color="primary"
      onClick={() => setLocale(nextLocale)}
      aria-label={
        locale === 'fr' ? 'Afficher le portfolio en anglais' : 'Display the portfolio in French'
      }
      size="small"
      startIcon={<LanguageIcon fontSize="small" />}
      sx={{
        minWidth: 0,
        minHeight: 44,
        px: 1,
        color: 'var(--text-2)',
        '&:hover': { color: 'var(--cyan)' },
      }}
    >
      {locale.toUpperCase()}
    </Button>
  );
}
