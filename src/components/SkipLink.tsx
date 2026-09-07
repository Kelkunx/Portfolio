'use client';

import { useLocale } from '../context/LocaleContext';

export default function SkipLink() {
  const { locale } = useLocale();

  return (
    <a href="#main-content" className="skip-link">
      {locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}
    </a>
  );
}
