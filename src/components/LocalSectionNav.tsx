'use client';

import Box from '@mui/material/Box';
import { useEffect, useRef } from 'react';
import useActiveSection from '../hooks/useActiveSection';

export type LocalSectionNavItem = {
  id: string;
  label: string;
};

type LocalSectionNavProps = {
  items: LocalSectionNavItem[];
  ariaLabel: string;
};

export default function LocalSectionNav({ items, ariaLabel }: LocalSectionNavProps) {
  const activeSection = useActiveSection(items.map(({ id }) => id));
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navigation = navigationRef.current;
    const activeLink = navigation?.querySelector<HTMLElement>(`[data-section-id="${activeSection}"]`);

    if (!navigation || !activeLink || navigation.scrollWidth <= navigation.clientWidth) return;

    const centeredPosition = activeLink.offsetLeft - (navigation.clientWidth - activeLink.offsetWidth) / 2;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    navigation.scrollTo({
      left: Math.max(0, centeredPosition),
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [activeSection]);

  return (
    <Box component="nav" className="local-section-nav" aria-label={ariaLabel} ref={navigationRef}>
      <Box component="ul" className="local-section-nav-list">
        {items.map((item) => {
          const isActive = item.id === activeSection;

          return (
            <Box component="li" key={item.id} className="local-section-nav-item">
              <Box
                component="a"
                href={`#${item.id}`}
                data-section-id={item.id}
                className={`local-section-nav-link${isActive ? ' local-section-nav-link--active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
