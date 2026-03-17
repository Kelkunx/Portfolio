'use client';

import React from 'react';
import { Container, Typography, Stack, Button, Box, Grid } from '@mui/material';
import { Email, Phone, LinkedIn, GitHub, PictureAsPdf } from '@mui/icons-material';
import { useLocale } from '../../context/LocaleContext';
import { getProfile } from '../../../lib/content';

export default function ContactPage() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
              height: '100%',
            }}
          >
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="overline" sx={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
                  {locale === 'fr' ? 'Contact' : 'Contact'}
                </Typography>
                <Typography component="h1" variant="h2" sx={{ color: 'var(--text)', mb: 1 }}>
                  {locale === 'fr' ? 'Parlons du poste ou du projet' : 'Let’s talk about the role or the project'}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, maxWidth: '58ch' }}>
                  {profile.contactPitch}
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  p: 2.5,
                }}
              >
                <Typography variant="subtitle1" sx={{ color: 'var(--text)', mb: 1 }}>
                  {locale === 'fr' ? 'Le plus simple pour me joindre' : 'The easiest way to reach me'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {locale === 'fr'
                    ? "Pour l'instant, je privilégie le contact direct par email, téléphone ou LinkedIn. Je préfère ça à un formulaire branché sur une solution mail externe."
                    : 'For now, I prefer direct contact by email, phone or LinkedIn rather than a contact form wired to an external email solution.'}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
              height: '100%',
            }}
          >
            <Stack spacing={2}>
              <Box>
                <Typography variant="overline" sx={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
                  {locale === 'fr' ? 'Coordonnées directes' : 'Direct contact'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {locale === 'fr'
                    ? 'Tu peux aussi me joindre directement par email, téléphone ou via mes profils professionnels.'
                    : 'You can also reach me directly by email, phone or through my professional profiles.'}
                </Typography>
              </Box>

              <Button variant="outlined" startIcon={<Email />} href={`mailto:${profile.email}`} fullWidth>
                {profile.email}
              </Button>

              <Button variant="outlined" startIcon={<Phone />} href={`tel:${profile.phone}`} fullWidth>
                {profile.phone}
              </Button>

              <Button
                variant="outlined"
                startIcon={<LinkedIn />}
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                LinkedIn
              </Button>

              <Button
                variant="outlined"
                startIcon={<GitHub />}
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                GitHub
              </Button>

              <Button
                variant="contained"
                startIcon={<PictureAsPdf />}
                href={profile.cvPdf}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                {locale === 'fr' ? 'Télécharger le CV (PDF)' : 'Download CV (PDF)'}
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
