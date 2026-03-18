'use client';

import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, PaletteMode, CssBaseline } from '@mui/material';

type ColorModeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'dark',
  toggleColorMode: () => {},
});

const premiumLight = {
  primary: { main: '#2e7de9' },
  secondary: { main: '#7b5cf6' },
  info: { main: '#0087a8' },
  success: { main: '#3e8a5b' },
  warning: { main: '#b7791f' },
  error: { main: '#d64d63' },
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
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: 'background-color 250ms ease, color 250ms ease',
                backgroundColor: 'var(--bg)',
                color: 'var(--text)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-soft)',
                transition: 'border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease',
              },
            },
          },
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor: 'var(--border)',
              },
            },
          },
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                borderRadius: 10,
                transition:
                  'background-color 160ms ease, border-color 160ms ease, color 160ms ease, box-shadow 160ms ease',
              },
              containedPrimary: {
                backgroundImage: 'none',
                backgroundColor: mode === 'light' ? '#2e7de9' : '#7aa2f7',
                color: mode === 'light' ? '#ffffff' : '#10131d',
                '&:hover': {
                  backgroundImage: 'none',
                  backgroundColor: mode === 'light' ? '#236fd2' : '#6f98f0',
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
          MuiChip: {
            defaultProps: {
              size: 'small',
            },
            styleOverrides: {
              root: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 'auto',
                borderRadius: 10,
                paddingTop: 0,
                paddingBottom: 0,
                fontWeight: 500,
                '&.MuiChip-sizeSmall': {
                  minHeight: 28,
                },
                '&.MuiChip-sizeMedium': {
                  minHeight: 34,
                },
              },
              label: {
                display: 'flex',
                alignItems: 'center',
                lineHeight: 1.25,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 6,
                paddingBottom: 6,
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                backgroundColor: 'var(--surface-2)',
                borderRadius: 10,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--border)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--blue)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--accent)',
                  boxShadow: '0 0 0 3px var(--ring)',
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: 'var(--muted)',
                '&.Mui-focused': {
                  color: 'var(--accent)',
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
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
