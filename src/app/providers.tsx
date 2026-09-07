'use client';

import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, type PaletteMode } from '@mui/material/styles';

type ColorModeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'dark',
  toggleColorMode: () => {},
});

const premiumLight = {
  primary: { main: '#1d63be' },
  secondary: { main: '#6948d7' },
  info: { main: '#006a80' },
  success: { main: '#24673e' },
  warning: { main: '#8a5a12' },
  error: { main: '#aa2d46' },
  background: { default: '#e1e2e7', paper: '#ffffff' },
  text: { primary: '#1f2335', secondary: '#2f3555' },
  divider: '#d2d6e3',
};

const premiumDark = {
  primary: { main: '#7aa2f7' },
  secondary: { main: '#bb9af7' },
  info: { main: '#7dcfff' },
  success: { main: '#9ece6a' },
  warning: { main: '#e0af68' },
  error: { main: '#f7768e' },
  background: { default: '#1a1b26', paper: '#24283b' },
  text: { primary: '#c0caf5', secondary: '#a9b1d6' },
  divider: '#3b4261',
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('dark');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        setMode(saved);
      } else {
        setMode('dark');
      }
    } catch {
      setMode('dark');
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          try {
            localStorage.setItem('theme', next);
          } catch {
            // ignore
          }
          return next;
        });
      },
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light' ? premiumLight : premiumDark),
        },
        typography: {
          fontFamily: "var(--font-body), system-ui, -apple-system, 'Segoe UI', sans-serif",
          h1: { fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.04em' },
          h2: { fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.04em' },
          h3: { fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.03em' },
          h4: { fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em' },
          h5: { fontFamily: 'var(--font-display)', fontWeight: 600 },
          h6: { fontFamily: 'var(--font-display)', fontWeight: 600 },
          button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
        },
        shape: { borderRadius: 10 },
        components: {
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                borderRadius: 10,
                transition:
                  'background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease',
                '@media (max-width: 899px)': {
                  minHeight: 44,
                },
              },
              containedPrimary: {
                backgroundImage: 'none',
                backgroundColor: mode === 'light' ? '#1d63be' : '#7aa2f7',
                color: mode === 'light' ? '#ffffff' : '#10131d',
                '&:hover': {
                  backgroundImage: 'none',
                  backgroundColor: mode === 'light' ? '#174f99' : '#6f98f0',
                },
              },
              outlinedPrimary: {
                borderColor: 'var(--border)',
                color: 'var(--text)',
                '&:hover': {
                  borderColor: 'var(--blue)',
                  backgroundColor: 'rgba(125, 207, 255, 0.12)',
                },
              },
              textPrimary: {
                color: 'var(--text)',
                '&:hover': {
                  backgroundColor: 'rgba(125, 207, 255, 0.1)',
                },
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: 'var(--text)',
                borderRadius: 10,
                transition: 'background-color 160ms ease',
                '&:hover': {
                  backgroundColor: 'rgba(125, 207, 255, 0.08)',
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
