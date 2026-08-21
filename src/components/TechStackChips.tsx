'use client';

import React from 'react';
import Box from '@mui/material/Box';

type TechStackChipsProps = {
  items: string[];
  limit?: number;
  size?: 'small' | 'medium';
};

const tonePresets = {
  cyan: 'var(--cyan)',
  blue: 'var(--blue)',
  purple: 'var(--purple)',
  magenta: 'var(--magenta)',
  green: 'var(--green)',
  orange: 'var(--orange)',
  yellow: 'var(--yellow)',
  teal: 'var(--teal)',
  red: 'var(--red)',
} as const;

const fallbackTones = ['cyan', 'purple', 'green', 'orange', 'blue', 'teal', 'yellow', 'magenta', 'red'] as const;

// Keep the same technologies visually recognizable across the portfolio.
function resolveTechTone(item: string, index: number) {
  const normalized = item.trim().toLowerCase();

  if (normalized.includes('react')) return tonePresets.cyan;
  if (normalized.includes('typescript')) return tonePresets.purple;
  if (normalized.includes('node')) return tonePresets.green;
  if (normalized.includes('nest')) return tonePresets.orange;
  if (normalized.includes('next')) return tonePresets.blue;
  if (normalized.includes('mui') || normalized.includes('material')) return tonePresets.magenta;
  if (normalized.includes('tailwind')) return tonePresets.teal;
  if (normalized.includes('shopify') || normalized.includes('polaris')) return tonePresets.green;
  if (normalized.includes('bridge')) return tonePresets.yellow;
  if (normalized.includes('hugging')) return tonePresets.orange;
  if (normalized.includes('arduino')) return tonePresets.yellow;
  if (normalized.includes('cisco') || normalized.includes('radius')) return tonePresets.orange;
  if (normalized.includes('active directory')) return tonePresets.teal;
  if (normalized.includes('sécur') || normalized.includes('security') || normalized.includes('incident')) {
    return tonePresets.red;
  }

  return tonePresets[fallbackTones[index % fallbackTones.length]];
}

export default function TechStackChips({ items, limit, size = 'small' }: TechStackChipsProps) {
  const visibleItems = limit ? items.slice(0, limit) : items;
  const chipHeight = size === 'small' ? 27 : 32;
  const chipPaddingX = size === 'small' ? 1.15 : 1.45;
  const chipFontSize = size === 'small' ? '0.86rem' : '0.96rem';

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
      {visibleItems.map((item, index) => {
        const tone = resolveTechTone(item, index);

        return (
          <Box
            key={item}
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: chipHeight,
              px: chipPaddingX,
              borderRadius: '999px',
              border: `1px solid color-mix(in srgb, ${tone} 34%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${tone} 12%, transparent)`,
              color: tone,
              fontSize: chipFontSize,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {item}
          </Box>
        );
      })}
    </Box>
  );
}
