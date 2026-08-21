'use client';

import { useEffect, useState } from 'react';

export default function useActiveSection(sectionIds: readonly string[]) {
  const sectionIdsKey = sectionIds.join('|');
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    const ids = sectionIdsKey.split('|').filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const hashSection = window.location.hash.slice(1);
    if (ids.includes(hashSection)) setActiveSection(hashSection);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

        if (visibleEntry?.target.id) setActiveSection(visibleEntry.target.id);
      },
      {
        rootMargin: '-18% 0px -68% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIdsKey]);

  return activeSection;
}
