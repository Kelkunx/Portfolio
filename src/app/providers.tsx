// app/providers.tsx
'use client';

import React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../../lib/createEmotionCache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  palette: {
    primary: {
      main: '#0f172a', // slate-900 ~ adapt to your brand
    },
    secondary: {
      main: '#06b6d4', // cyan-500
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
