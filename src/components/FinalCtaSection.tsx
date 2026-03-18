'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { ArrowOutward } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

export default function FinalCtaSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  return (
    <Box
      component="section"
      sx={{
        mt: { xs: 8, md: 12 },
        mb: { xs: 8, md: 10 },
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        borderTop: '2px solid var(--orange)',
        backgroundColor: 'var(--surface)',
        p: { xs: 3, md: 4.5 },
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: 760 }}>
        <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
          {locale === 'fr' ? 'Parlons du poste ou du projet' : "Let's talk about the role or the project"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75 }}>
          {profile.contactPitch}
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
          <Button component={Link} href="/contact" variant="contained" endIcon={<ArrowOutward />}>
            {locale === 'fr' ? 'Me contacter' : 'Contact me'}
          </Button>
          <Button component="a" href={`mailto:${profile.email}`} variant="outlined">
            {locale === 'fr' ? 'Envoyer un email' : 'Send an email'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
