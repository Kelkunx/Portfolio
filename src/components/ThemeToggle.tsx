// src/components/ThemeToggle.tsx
'use client';

import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { LightMode, DarkMode } from '@mui/icons-material';
import { ColorModeContext } from '../app/providers';

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <Tooltip title={mode === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}>
      <IconButton
        onClick={toggleColorMode}
        aria-label={mode === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
        size="large"
      >
        {mode === 'light' ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
