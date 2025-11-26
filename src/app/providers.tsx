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
          ...(mode === 'light'
            ? {
                // TokyoNight Light — accents brightened 
                primary: { main: '#3b82f6' },    // bleu (plus lumineux)
                secondary: { main: '#8b5cf6' },  // magenta (clair)
                info: { main: '#0f77a0' },       // cyan / bleu-vert (plus lisible)
                success: { main: '#33635c' },    // vert profond (inchangé)
                warning: { main: '#c08a2f' },    // jaune-orangé (plus lumineux)
                error: { main: '#b65a64' },      // rouge (allégé)
                background: { default: '#f6f8fb', paper: '#ffffff' },
                text: { primary: '#343b58', secondary: '#40434f' },
                divider: '#e6e7ed',
              }
            : {
                primary: { main: '#7aa2f7' },
                secondary: { main: '#bb9af7' },
                info: { main: '#7dcfff' },
                success: { main: '#9ece6a' },
                warning: { main: '#e0af68' },
                error: { main: '#f7768e' },
                background: { default: '#1a1b26', paper: '#0a0f1a' },
                text: { primary: '#c0caf5', secondary: '#a9b1d6' },
                divider: '#565f89',
              }),
        },
        typography: {
          fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                transition: 'background-color 250ms ease, color 250ms ease',
              },
            },
          },
          MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
              root: {
                textTransform: 'none',
                transition: 'all 180ms ease',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: { fontWeight: 500 },
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
