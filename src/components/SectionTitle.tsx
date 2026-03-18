'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography, { type TypographyProps } from '@mui/material/Typography';

type SectionTitleProps = {
  title: string;
  icon: React.ReactNode;
  tone?: 'cyan' | 'purple' | 'green' | 'orange';
  component?: TypographyProps['component'];
  variant?: TypographyProps['variant'];
};

const toneStyles = {
  cyan: {
    color: 'var(--cyan)',
    border: 'rgba(125, 207, 255, 0.24)',
    background: 'rgba(125, 207, 255, 0.08)',
  },
  purple: {
    color: 'var(--purple)',
    border: 'rgba(187, 154, 247, 0.24)',
    background: 'rgba(187, 154, 247, 0.08)',
  },
  green: {
    color: 'var(--green)',
    border: 'rgba(158, 206, 106, 0.24)',
    background: 'rgba(158, 206, 106, 0.08)',
  },
  orange: {
    color: 'var(--orange)',
    border: 'rgba(255, 158, 100, 0.24)',
    background: 'rgba(255, 158, 100, 0.08)',
  },
} as const;

export default function SectionTitle({
  title,
  icon,
  tone = 'cyan',
  component = 'h2',
  variant = 'h4',
}: SectionTitleProps) {
  const style = toneStyles[tone];

  return (
    <Stack direction="row" spacing={1.2} alignItems="center">
      <Box
        aria-hidden="true"
        sx={{
          width: 32,
          height: 32,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          border: `1px solid ${style.border}`,
          backgroundColor: style.background,
          color: style.color,
          '& svg': {
            fontSize: 18,
          },
        }}
      >
        {icon}
      </Box>
      <Typography component={component} variant={variant} sx={{ color: 'var(--text)' }}>
        {title}
      </Typography>
    </Stack>
  );
}
