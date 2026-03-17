'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

export default function ProofBar() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const tones = ['var(--cyan)', 'var(--purple)', 'var(--green)'];

  return (
    <Box component="section" sx={{ mt: { xs: 4, md: 6 } }}>
      <Grid container spacing={2}>
        {profile.proofPoints.map((item, index) => (
          <Grid key={item.label} size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                px: 2.5,
                py: 2.25,
                height: '100%',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '0 auto 0 0',
                  width: 4,
                  backgroundColor: tones[index % tones.length],
                },
              }}
            >
              <Stack spacing={0.75}>
                <Typography
                  variant="overline"
                  sx={{ color: 'var(--muted)', letterSpacing: '0.08em', lineHeight: 1.3 }}
                >
                  {item.label}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text)', fontWeight: 600 }}>
                  {item.value}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
