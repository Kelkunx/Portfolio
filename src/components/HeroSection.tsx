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
        pt: { xs: 8, md: 10 },
        pb: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="stretch">
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3} sx={{ maxWidth: 700, pt: { md: 2 } }}>
              <Typography
                id="hero-heading"
                component="h1"
                variant="h1"
                sx={{
                  color: 'var(--text)',
                  maxWidth: '11ch',
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
                {profile.summary}
              </Typography>

              <Grid container spacing={1.5}>
                {profile.proofPoints.slice(0, 3).map((item, index) => {
                  const tone = index === 0 ? 'var(--cyan)' : index === 1 ? 'var(--purple)' : 'var(--green)';
                  const bg =
                    index === 0
                      ? 'rgba(125, 207, 255, 0.08)'
                      : index === 1
                        ? 'rgba(187, 154, 247, 0.08)'
                        : 'rgba(158, 206, 106, 0.08)';

                  return (
                    <Grid key={`${item.label}-${item.value}`} size={{ xs: 12, sm: 4 }}>
                      <Box
                        sx={{
                          height: '100%',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border)',
                          borderTop: `2px solid ${tone}`,
                          backgroundColor: bg,
                          px: 2,
                          py: 1.75,
                          transition: 'background-color 160ms ease, border-color 160ms ease',
                          '&:hover': {
                            borderColor: tone,
                            backgroundColor:
                              index === 0
                                ? 'rgba(125, 207, 255, 0.12)'
                                : index === 1
                                  ? 'rgba(187, 154, 247, 0.12)'
                                  : 'rgba(158, 206, 106, 0.12)',
                          },
                        }}
                      >
                        <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.5 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text)', fontWeight: 600, lineHeight: 1.55 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

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
                backgroundColor: 'var(--surface)',
                boxShadow: 'var(--shadow-soft)',
                p: { xs: 3, md: 3.5 },
              }}
            >
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 92,
                      height: 92,
                      borderRadius: 'var(--radius-md)',
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
                    display: 'grid',
                    gap: 1.25,
                  }}
                >
                  <Box sx={{ borderLeft: '2px solid var(--cyan)', pl: 1.5 }}>
                    <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.4 }}>
                      {locale === 'fr' ? 'Disponibilité' : 'Availability'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text)' }}>
                      {profile.availability}
                    </Typography>
                  </Box>
                  <Box sx={{ borderLeft: '2px solid var(--purple)', pl: 1.5 }}>
                    <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.4 }}>
                      {locale === 'fr' ? 'Cibles' : 'Target roles'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text)' }}>
                      {profile.targetRoles.join(' • ')}
                    </Typography>
                  </Box>
                  <Box sx={{ borderLeft: '2px solid var(--green)', pl: 1.5 }}>
                    <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.4 }}>
                      {locale === 'fr' ? 'Stack principale' : 'Primary stack'}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {profile.primaryStack.map((item, index) => (
                        <Chip
                          key={item}
                          label={item}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: 'var(--text)',
                            borderColor:
                              index % 3 === 0
                                ? 'rgba(125, 207, 255, 0.3)'
                                : index % 3 === 1
                                  ? 'rgba(187, 154, 247, 0.3)'
                                  : 'rgba(158, 206, 106, 0.3)',
                            backgroundColor:
                              index % 3 === 0
                                ? 'rgba(125, 207, 255, 0.1)'
                                : index % 3 === 1
                                  ? 'rgba(187, 154, 247, 0.1)'
                                  : 'rgba(158, 206, 106, 0.1)',
                          }}
                        />
                      ))}
                    </Box>
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
                    Email
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
