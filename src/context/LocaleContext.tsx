// src/context/LocaleContext.tsx
'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

type Locale = 'fr' | 'en';

type UIStrings = {
  nav: {
    home: string;
    projects: string;
    cv: string;
    contact: string;
  };
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: UIStrings;
};

const DEFAULT_LOCALE: Locale = 'fr';
const LS_KEY = 'locale';

const fr: UIStrings = {
  nav: { home: 'Accueil', projects: 'Projets', cv: 'CV', contact: 'Contact' },
};

const en: UIStrings = {
  nav: { home: 'Home', projects: 'Projects', cv: 'CV', contact: 'Contact' },
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY) as Locale | null;
      if (saved === 'fr' || saved === 'en') {
        setLocaleState(saved);
        return;
      }
    } catch {
      // ignore
    }

    // fallback to navigator language
    if (typeof navigator !== 'undefined') {
      const nav = navigator.language?.toLowerCase() ?? '';
      if (nav.startsWith('en')) setLocaleState('en');
      else setLocaleState('fr');
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LS_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  const t = locale === 'fr' ? fr : en;
  const contextValue = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}
