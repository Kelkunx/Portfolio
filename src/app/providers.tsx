'use client';

import React, { createContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, PaletteMode, CssBaseline } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

type ColorModeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

const tokyoLight = {
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

const tokyoDark = {
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
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') setMode(saved);
      else setMode(prefersDark ? 'dark' : 'light');
    } catch {
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, [prefersDark]);

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
          try { localStorage.setItem('theme', next); } catch {}
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
          ...(mode === 'light' ? tokyoLight : tokyoDark),
        },
        typography: {
          fontFamily: "var(--font-body), system-ui, -apple-system, 'Segoe UI', sans-serif",
          h1: { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: '-0.02em' },
          h2: { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: '-0.02em' },
          h3: { fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: '-0.01em' },
          h4: { fontFamily: "var(--font-display)", fontWeight: 600 },
          h5: { fontFamily: "var(--font-display)", fontWeight: 600 },
          h6: { fontFamily: "var(--font-display)", fontWeight: 600 },
          subtitle1: { fontWeight: 500 },
          button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
        },
        shape: { borderRadius: 16 },
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
          MuiDivider: {
            styleOverrides: {
              root: {
                borderColor: 'var(--border)',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 18,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                boxShadow: 'var(--shadow-soft)',
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
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                textTransform: 'none',
                borderRadius: 12,
                transition: 'transform 180ms ease, box-shadow 200ms ease, background-color 200ms ease',
                '&:active': {
                  transform: 'translateY(1px) scale(0.98)',
                },
              },
              containedPrimary: {
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: 'var(--grad-accent)',
                color: 'var(--bg)',
                boxShadow: 'var(--shadow-glow)',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-60%',
                  width: '40%',
                  height: '100%',
                  background: 'linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                  transform: 'skewX(-20deg)',
                  opacity: 0,
                  transition: 'transform 700ms ease, opacity 500ms ease',
                  pointerEvents: 'none',
                },
                '&:hover': {
                  backgroundImage: 'var(--grad-accent)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 0 0 1px var(--ring), var(--shadow-glow)',
                },
                '&:hover::after': {
                  opacity: 1,
                  transform: 'skewX(-20deg) translateX(260%)',
                },
              },
              outlinedPrimary: {
                borderColor: 'var(--border)',
                color: 'var(--text)',
                '&:hover': {
                  borderColor: 'var(--blue)',
                  backgroundColor: 'rgba(125, 207, 255, 0.08)',
                },
              },
              outlinedSecondary: {
                borderColor: 'var(--border)',
                color: 'var(--text)',
                '&:hover': {
                  borderColor: 'var(--purple)',
                  backgroundColor: 'rgba(187, 154, 247, 0.08)',
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontWeight: 500,
                borderRadius: 999,
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                transition: 'transform 160ms ease, box-shadow 200ms ease, background-color 200ms ease',
                '&:hover': {
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 20px rgba(10, 15, 30, 0.25)',
                  backgroundColor: 'rgba(125, 207, 255, 0.08)',
                },
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                backgroundColor: 'var(--surface-2)',
                borderRadius: 12,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--border)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--blue)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'var(--blue)',
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
                  color: 'var(--blue)',
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
