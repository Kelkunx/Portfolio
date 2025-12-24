// src/app/contact/page.tsx
'use client';

import React from 'react';
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  Paper,
} from '@mui/material';
import {
  Email,
  Phone,
  LinkedIn,
  GitHub,
  PictureAsPdf,
} from '@mui/icons-material';
import { useLocale } from '../../context/LocaleContext';
import { profile as profileFR } from '../../../lib/locales/fr/profile';
import { profile as profileEN } from '../../../lib/locales/en/profile';

export default function ContactPage() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;

  const title = locale === 'fr' ? 'Me contacter' : 'Contact';
  const subtitle =
    locale === 'fr'
      ? 'Vous pouvez me joindre facilement par email, téléphone ou via mes réseaux pro.'
      : 'You can reach me easily via email, phone or my professional networks.';

  const downloadCvLabel = locale === 'fr' ? 'Télécharger mon CV (PDF)' : 'Download my CV (PDF)';
  const emailAria = locale === 'fr' ? 'Envoyer un email' : 'Send an email';
  const phoneAria = locale === 'fr' ? 'Appeler' : 'Call';
  const linkedInAria = locale === 'fr' ? 'Profil LinkedIn (ouvert dans un nouvel onglet)' : 'LinkedIn profile (opens in a new tab)';
  const githubAria = locale === 'fr' ? 'Profil GitHub (ouvert dans un nouvel onglet)' : 'GitHub profile (opens in a new tab)';
  const cvAria = locale === 'fr' ? "Télécharger le CV au format PDF" : 'Download CV as PDF';

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          backgroundColor: 'var(--surface-glass)',
          boxShadow: 'var(--shadow-soft)',
          backdropFilter: 'blur(var(--blur-glass))',
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>

        <Stack spacing={2}>
          <Button
            variant="contained"
            color="error"
            startIcon={<Email />}
            href={`mailto:${profile.email}`}
            fullWidth
            aria-label={emailAria}
          >
            {profile.email}
          </Button>

          <Button
            variant="contained"
            color="warning"
            startIcon={<Phone />}
            href={`tel:${profile.phone}`}
            fullWidth
            aria-label={phoneAria}
          >
            {profile.phone}
          </Button>

          <Button
            variant="contained"
            color="info"
            startIcon={<LinkedIn />}
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            aria-label={linkedInAria}
          >
            LinkedIn
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<GitHub />}
            href={'https://github.com/Kelkunx'}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            aria-label={githubAria}
          >
            GitHub
          </Button>

          <Button
            variant="outlined"
            startIcon={<PictureAsPdf />}
            href={profile.cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            aria-label={cvAria}
          >
            {downloadCvLabel}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
