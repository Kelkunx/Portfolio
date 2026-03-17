// src/components/ThemeToggle.tsx
'use client';

import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { LightMode, DarkMode } from '@mui/icons-material';
import { ColorModeContext } from '../app/providers';
import { useLocale } from '../context/LocaleContext';

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const { locale } = useLocale();
  const title =
    mode === 'light'
      ? locale === 'fr'
        ? 'Passer en mode sombre'
        : 'Switch to dark mode'
      : locale === 'fr'
        ? 'Passer en mode clair'
        : 'Switch to light mode';
  const ariaLabel =
    mode === 'light'
      ? locale === 'fr'
        ? 'Activer le mode sombre'
        : 'Enable dark mode'
      : locale === 'fr'
        ? 'Activer le mode clair'
        : 'Enable light mode';

  return (
    <Tooltip title={title}>
      <IconButton
        onClick={toggleColorMode}
        aria-label={ariaLabel}
        size="large"
      >
        {mode === 'light' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
