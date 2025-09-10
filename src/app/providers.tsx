// src/app/providers.tsx
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

  // Hydrate mode from localStorage or system preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') {
        setMode(saved);
      } else {
        setMode(prefersDark ? 'dark' : 'light');
      }
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
          try {
            localStorage.setItem('theme', next);
          } catch {}
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
                background: { default: '#ffffff', paper: '#fff' },
              }
            : {
                background: { default: '#0b1020', paper: '#0a0f1a' },
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
