'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Link from 'next/link';
import { LinkedIn, Email, GitHub, ArrowOutward, KeyboardArrowDownRounded } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

export default function HeroSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const [showScrollCue, setShowScrollCue] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScrollCue(window.scrollY < 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleScrollCueClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const nextSection = document.getElementById('home-sections-start');
    if (!nextSection) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    nextSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{
        pt: { xs: 7, md: 9 },
        pb: { xs: 3, md: 4 },
        minHeight: { md: 'calc(100svh - 80px)' },
        display: 'flex',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" sx={{ flex: 1 }}>
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
                {profile.shortBio}
              </Typography>

              <Box
                component="ul"
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                  gap: { xs: 1.5, sm: 2 },
                  p: 0,
                  m: 0,
                  listStyle: 'none',
                }}
              >
                {profile.proofPoints.slice(0, 3).map((item, index) => {
                  const tone = index === 0 ? 'var(--cyan)' : index === 1 ? 'var(--purple)' : 'var(--green)';

                  return (
                    <Box
                      key={`${item.label}-${item.value}`}
                      component="li"
                      sx={{ borderLeft: `2px solid ${tone}`, pl: 1.5 }}
                    >
                      <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.35 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--text)', fontWeight: 600, lineHeight: 1.5 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button variant="contained" color="primary" component={Link} href="/projets">
                  {locale === 'fr' ? 'Voir mes projets' : 'View projects'}
                </Button>
                <Button variant="outlined" component={Link} href="/contact" endIcon={<ArrowOutward />}>
                  {locale === 'fr' ? 'Me contacter' : 'Contact me'}
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Box
              sx={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                boxShadow: 'var(--shadow-soft)',
                p: { xs: 3, md: 3.5 },
              }}
            >
              <Stack spacing={2.5}>
                <Stack spacing={0.75}>
                  <Typography variant="h5" sx={{ color: 'var(--text)' }}>
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profile.location}
                  </Typography>
                </Stack>

                <Box sx={{ borderLeft: '2px solid var(--cyan)', pl: 1.5 }}>
                  <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.4 }}>
                    {locale === 'fr' ? 'Disponibilité' : 'Availability'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text)' }}>
                    {profile.availability}
                  </Typography>
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

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: { xs: 4, md: 5 },
            opacity: showScrollCue ? 1 : 0,
            transform: showScrollCue ? 'translateY(0)' : 'translateY(8px)',
            pointerEvents: showScrollCue ? 'auto' : 'none',
            transition: 'opacity 180ms ease, transform 180ms ease',
          }}
        >
          <Button
            component="a"
            href="#home-sections-start"
            onClick={handleScrollCueClick}
            aria-label={locale === 'fr' ? 'Descendre vers les sections suivantes' : 'Scroll to the next sections'}
            variant="text"
            sx={{
              color: 'var(--text-2)',
              minWidth: 'auto',
              width: 56,
              height: 56,
              borderRadius: '999px',
              p: 0,
              '@keyframes scrollCueFloat': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(8px)' },
              },
              '& .MuiSvgIcon-root': {
                fontSize: 75,
                animation: 'scrollCueFloat 1.4s ease-in-out infinite',
              },
              '&:hover': {
                backgroundColor: 'var(--surface-2)',
                color: 'var(--cyan)',
              },
            }}
          >
            <KeyboardArrowDownRounded />
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
