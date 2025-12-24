'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '../context/LocaleContext';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';
import { LinkedIn, Email, Phone } from '@mui/icons-material';

export default function HeroSection() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;
  const highlightSkills = profile.skills.flatMap((group) => group.items).slice(0, 6);
  const chipColors = ['info', 'secondary', 'success', 'warning'] as const;

  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
        backgroundColor: 'var(--bg)',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'var(--grad-hero)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          right: { xs: '-30%', md: '-10%' },
          top: { xs: '-20%', md: '-30%' },
          width: { xs: 280, md: 380 },
          height: { xs: 280, md: 380 },
          borderRadius: '50%',
          background: 'var(--accent)',
          opacity: 0.18,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: { xs: '-20%', md: '-10%' },
          bottom: { xs: '-25%', md: '-35%' },
          width: { xs: 240, md: 320 },
          height: { xs: 240, md: 320 },
          borderRadius: '50%',
          background: 'var(--accent-3)',
          opacity: 0.16,
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: 90, md: 140 },
          background: 'linear-gradient(180deg, rgba(0,0,0,0), var(--bg))',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Typography
                id="hero-heading"
                component="h1"
                variant="h2"
                sx={{ color: 'var(--text)', maxWidth: '20ch' }}
              >
                {profile.name}
              </Typography>

              <Typography component="h2" variant="subtitle1" color="text.secondary">
                {profile.title}
              </Typography>

              <Typography component="p" sx={{ maxWidth: '60ch' }} color="text.secondary">
                {profile.summary}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button variant="contained" color="primary" component={Link} href="/projets">
                  {locale === 'fr' ? 'Voir mes projets' : 'See my projects'}
                </Button>
                <Button variant="outlined" color="secondary" component="a" href={profile.cvPdf} target="_blank" rel="noopener noreferrer">
                  {locale === 'fr' ? 'Télécharger le CV (PDF)' : 'Download CV (PDF)'}
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface-glass)',
                boxShadow: 'var(--shadow-soft)',
                backdropFilter: 'blur(var(--blur-glass))',
                p: 3,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 84,
                    height: 84,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid var(--border)',
                    boxShadow: 'var(--shadow-glow)',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={profile.avatar}
                    alt={`Portrait de ${profile.name}`}
                    width={84}
                    height={84}
                    style={{ objectFit: 'cover', display: 'block' }}
                    priority
                  />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: 'var(--text)' }}>
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {profile.location}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1} flexWrap="wrap">
                {highlightSkills.map((skill, idx) => (
                  <Chip
                    key={skill}
                    label={skill}
                    size="small"
                    variant="outlined"
                    color={chipColors[idx % chipColors.length]}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button
                  variant="text"
                  color="info"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<LinkedIn />}
                  sx={{ px: 0.5 }}
                >
                  LinkedIn
                </Button>
                <Button
                  variant="text"
                  color="error"
                  href={`mailto:${profile.email}`}
                  startIcon={<Email />}
                  sx={{ px: 0.5 }}
                >
                  {profile.email}
                </Button>
                <Button
                  variant="text"
                  color="success"
                  href={`tel:${profile.phone}`}
                  startIcon={<Phone />}
                  sx={{ px: 0.5 }}
                >
                  {profile.phone}
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
