// src/context/LocaleContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type Locale = 'fr' | 'en';

type UIStrings = {
  nav: {
    home: string;
    projects: string;
    contact: string;
  };
  header: {
    skipToContent: string;
  };
  projects: {
    searchPlaceholder: string;
    all: string;
    noResults: string;
  };
  buttons: {
    details: string;
    demo: string;
    code: string;
  };
  footer: {
    copyright: string;
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
  nav: { home: 'Accueil', projects: 'Projets', contact: 'Contact' },
  header: { skipToContent: "Aller au contenu" },
  projects: { searchPlaceholder: "Rechercher un projet (titre, description...)", all: 'Tous', noResults: "Aucune correspondance — essaie d'élargir ta recherche ou désactive le filtre." },
  buttons: { details: 'Détails', demo: 'Démo', code: 'Code' },
  footer: { copyright: '© Léo JEGO' },
};

const en: UIStrings = {
  nav: { home: 'Home', projects: 'Projects', contact: 'Contact' },
  header: { skipToContent: 'Skip to content' },
  projects: { searchPlaceholder: 'Search projects (title, description...)', all: 'All', noResults: 'No matches — try widening your search or disable the filter.' },
  buttons: { details: 'Details', demo: 'Demo', code: 'Code' },
  footer: { copyright: '© Léo JEGO' },
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

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(LS_KEY, l);
    } catch {
      // ignore
    }
  };

  const t = useMemo(() => (locale === 'fr' ? fr : en), [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}
