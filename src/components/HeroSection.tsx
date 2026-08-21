'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowOutward, KeyboardArrowDownRounded } from '@mui/icons-material';
import Link from 'next/link';
import { getProfile } from '../../lib/content';
import { useLocale } from '../context/LocaleContext';
import SiteContainer from './SiteContainer';
import TechStackChips from './TechStackChips';

const proofTones = ['var(--cyan)', 'var(--purple)', 'var(--green)'];

export default function HeroSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  return (
    <Box
      component="section"
      aria-labelledby="hero-heading"
      sx={{
        minHeight: { md: 'calc(100svh - 80px)' },
        display: 'flex',
      }}
    >
      <SiteContainer
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          py: { xs: 5, md: 4 },
        }}
      >
        <Grid
          container
          columnSpacing={{ md: 7, lg: 10 }}
          rowSpacing={{ xs: 5, md: 0 }}
          alignItems="center"
          sx={{ flex: 1 }}
        >
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ maxWidth: 790 }}>
              <Typography
                id="hero-heading"
                component="h1"
                sx={{
                  color: 'var(--text)',
                  maxWidth: '10ch',
                  fontFamily: 'var(--font-display)',
                  fontSize: { xs: '3.35rem', sm: '4.25rem', md: 'clamp(4.7rem, 7vw, 6.5rem)' },
                  fontWeight: 700,
                  lineHeight: 0.98,
                  letterSpacing: '-0.055em',
                }}
              >
                {profile.focus}
              </Typography>

              <Typography
                component="p"
                sx={{
                  color: 'var(--text-2)',
                  fontSize: { xs: '1.05rem', md: '1.2rem' },
                  lineHeight: 1.75,
                  maxWidth: '59ch',
                }}
              >
                {profile.shortBio}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ sm: 'center' }}>
                <Button variant="contained" component={Link} href="/projets" size="large">
                  {locale === 'fr' ? 'Voir mes projets' : 'View projects'}
                </Button>
                <Button variant="outlined" component={Link} href="/contact" size="large" endIcon={<ArrowOutward />}>
                  {locale === 'fr' ? 'Me contacter' : 'Contact me'}
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack
              spacing={3.5}
              sx={{
                borderTop: { xs: '1px solid var(--border)', md: 0 },
                borderLeft: { md: '1px solid var(--border)' },
                pt: { xs: 3.5, md: 2 },
                pb: { md: 2 },
                pl: { md: 6, lg: 7 },
                minHeight: { md: 330 },
                justifyContent: 'center',
              }}
            >
              <Box sx={{ borderLeft: '3px solid var(--blue)', pl: 2 }}>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.5 }}>
                  {locale === 'fr' ? 'Disponibilité' : 'Availability'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text)', lineHeight: 1.65 }}>
                  {profile.availability}
                </Typography>
              </Box>

              <Box sx={{ borderLeft: '3px solid var(--cyan)', pl: 2 }}>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.5 }}>
                  {locale === 'fr' ? 'Localisation' : 'Location'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                  {profile.location}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 1.25 }}>
                  {locale === 'fr' ? 'Stack principale' : 'Primary stack'}
                </Typography>
                <TechStackChips items={profile.primaryStack} />
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Box
          component="ul"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
            gap: { xs: 2, sm: 4, lg: 7 },
            p: 0,
            mt: { xs: 5, md: 3 },
            mb: 0,
            listStyle: 'none',
          }}
        >
          {profile.proofPoints.slice(0, 3).map((item, index) => (
            <Box
              key={`${item.label}-${item.value}`}
              component="li"
              sx={{ borderTop: `2px solid ${proofTones[index]}`, pt: 1.75, minWidth: 0 }}
            >
              <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.45 }}>
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ color: 'var(--text)', fontWeight: 500, lineHeight: 1.55 }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box className="hero-scroll-cue" sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            component="a"
            href="#home-sections-start"
            aria-label={locale === 'fr' ? 'Descendre vers les projets' : 'Scroll to selected projects'}
            variant="text"
            sx={{
              color: 'var(--blue)',
              minWidth: 64,
              width: 64,
              height: 52,
              p: 0,
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'transparent', color: 'var(--cyan)' },
              '& .MuiSvgIcon-root': {
                fontSize: 54,
                animation: 'scrollCueFloat 1.8s ease-in-out infinite',
              },
            }}
          >
            <KeyboardArrowDownRounded />
          </Button>
        </Box>
      </SiteContainer>
    </Box>
  );
}
