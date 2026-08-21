'use client';

import Box from '@mui/material/Box';
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

  return (
    <Box component="nav" className="local-section-nav" aria-label={ariaLabel}>
      <Box component="ul" className="local-section-nav-list">
        {items.map((item) => {
          const isActive = item.id === activeSection;

          return (
            <Box component="li" key={item.id} className="local-section-nav-item">
              <Box
                component="a"
                href={`#${item.id}`}
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
