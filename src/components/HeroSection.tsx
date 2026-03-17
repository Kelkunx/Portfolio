'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import Image from 'next/image';
import { LinkedIn, Email, GitHub, ArrowOutward } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

export default function HeroSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{
        position: 'relative',
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 6 },
        overflow: 'hidden',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'var(--grad-hero)',
          opacity: 0.95,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3} sx={{ maxWidth: 700 }}>
              <Box sx={{ display: 'flex', gap: 1.25, alignItems: 'center', flexWrap: 'wrap' }}>
                <Chip
                  label={locale === 'fr' ? 'Portfolio / CV dynamique' : 'Portfolio / dynamic CV'}
                  sx={{
                    backgroundColor: 'rgba(125, 207, 255, 0.14)',
                    color: 'var(--text)',
                    border: '1px solid rgba(125, 207, 255, 0.3)',
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {profile.name}
                </Typography>
              </Box>

              <Typography
                id="hero-heading"
                component="h1"
                variant="h1"
                sx={{
                  color: 'var(--text)',
                  maxWidth: '12ch',
                  fontSize: { xs: '3rem', md: '4.6rem' },
                  lineHeight: 0.98,
                  letterSpacing: '-0.05em',
                }}
              >
                {profile.focus}
              </Typography>

              <Typography
                component="p"
                sx={{
                  color: 'var(--text-2)',
                  fontSize: { xs: '1.05rem', md: '1.22rem' },
                  lineHeight: 1.7,
                  maxWidth: '58ch',
                }}
              >
                {profile.shortBio}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button variant="contained" color="primary" component={Link} href="/projets">
                  {locale === 'fr' ? 'Voir mes projets' : 'View projects'}
                </Button>
                <Button variant="outlined" component={Link} href="/cv">
                  {locale === 'fr' ? 'Voir le CV' : 'View CV'}
                </Button>
                <Button variant="text" component={Link} href="/contact" endIcon={<ArrowOutward />}>
                  {locale === 'fr' ? 'Me contacter' : 'Contact me'}
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                height: '100%',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface-glass)',
                boxShadow: 'var(--shadow-soft)',
                backdropFilter: 'blur(var(--blur-glass))',
                p: { xs: 3, md: 3.5 },
              }}
            >
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 92,
                      height: 92,
                      borderRadius: '26px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={profile.avatar}
                      alt={profile.name}
                      width={92}
                      height={92}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      priority
                    />
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ color: 'var(--text)' }}>
                      {profile.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {profile.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {profile.location}
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    p: 2,
                  }}
                >
                  <Typography variant="overline" sx={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
                    {locale === 'fr' ? 'Disponibilité' : 'Availability'}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text)', mt: 0.5 }}>
                    {profile.availability}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="overline" sx={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
                    {locale === 'fr' ? 'Cibles' : 'Target roles'}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                    {profile.targetRoles.map((role) => (
                      <Chip
                        key={role}
                        label={role}
                        variant="outlined"
                        sx={{
                          color: 'var(--text)',
                          borderColor: 'rgba(187, 154, 247, 0.34)',
                          backgroundColor: 'rgba(187, 154, 247, 0.12)',
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Divider />

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap">
                  <Button
                    variant="text"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<LinkedIn />}
                    sx={{ justifyContent: 'flex-start', px: 0, color: 'var(--text)' }}
                  >
                    LinkedIn
                  </Button>
                  <Button
                    variant="text"
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<GitHub />}
                    sx={{ justifyContent: 'flex-start', px: 0, color: 'var(--text)' }}
                  >
                    GitHub
                  </Button>
                  <Button
                    variant="text"
                    href={`mailto:${profile.email}`}
                    startIcon={<Email />}
                    sx={{ justifyContent: 'flex-start', px: 0, color: 'var(--text)' }}
                  >
                    {locale === 'fr' ? 'Email direct' : 'Direct email'}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
