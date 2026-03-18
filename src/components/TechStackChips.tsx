'use client';

import React from 'react';
import Box from '@mui/material/Box';

type TechStackChipsProps = {
  items: string[];
  limit?: number;
  size?: 'small' | 'medium';
};

const tonePresets = {
  blue: {
    color: 'var(--cyan)',
    border: 'rgba(125, 207, 255, 0.34)',
    background: 'rgba(125, 207, 255, 0.12)',
  },
  indigo: {
    color: 'var(--blue)',
    border: 'rgba(122, 162, 247, 0.34)',
    background: 'rgba(122, 162, 247, 0.12)',
  },
  purple: {
    color: 'var(--purple)',
    border: 'rgba(187, 154, 247, 0.34)',
    background: 'rgba(187, 154, 247, 0.12)',
  },
  green: {
    color: 'var(--green)',
    border: 'rgba(158, 206, 106, 0.34)',
    background: 'rgba(158, 206, 106, 0.12)',
  },
  orange: {
    color: 'var(--orange)',
    border: 'rgba(255, 158, 100, 0.34)',
    background: 'rgba(255, 158, 100, 0.12)',
  },
  yellow: {
    color: 'var(--yellow)',
    border: 'rgba(224, 175, 104, 0.34)',
    background: 'rgba(224, 175, 104, 0.12)',
  },
  teal: {
    color: 'var(--teal)',
    border: 'rgba(115, 218, 202, 0.34)',
    background: 'rgba(115, 218, 202, 0.12)',
  },
} as const;

const fallbackTones = ['blue', 'purple', 'green', 'orange', 'indigo', 'teal', 'yellow'] as const;

// Keep the same technologies visually recognizable across the portfolio.
function resolveTechTone(item: string, index: number) {
  const normalized = item.trim().toLowerCase();

  if (normalized.includes('react')) return tonePresets.blue;
  if (normalized.includes('typescript')) return tonePresets.purple;
  if (normalized.includes('node')) return tonePresets.green;
  if (normalized.includes('nest')) return tonePresets.orange;
  if (normalized.includes('next')) return tonePresets.indigo;
  if (normalized.includes('mui') || normalized.includes('material')) return tonePresets.purple;
  if (normalized.includes('tailwind')) return tonePresets.teal;
  if (normalized.includes('shopify') || normalized.includes('polaris')) return tonePresets.green;
  if (normalized.includes('bridge')) return tonePresets.yellow;
  if (normalized.includes('hugging')) return tonePresets.orange;
  if (normalized.includes('arduino')) return tonePresets.yellow;
  if (normalized.includes('cisco') || normalized.includes('radius')) return tonePresets.orange;
  if (normalized.includes('active directory')) return tonePresets.teal;

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
              border: `1px solid ${tone.border}`,
              backgroundColor: tone.background,
              color: tone.color,
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
