'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

export default function CvSnapshotSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const toeic = profile.certifications.find((item) => item.name.toLowerCase().includes('toeic'));
  const languages = profile.languages.map((item) => `${item.name} ${item.level}`).join(' • ');

  return (
    <Box component="section" sx={{ mt: { xs: 8, md: 12 } }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, rgba(125, 207, 255, 0.16), transparent 46%), radial-gradient(circle at top right, rgba(187, 154, 247, 0.14), transparent 40%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
              <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
                {locale === 'fr' ? 'CV express' : 'Quick CV'}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '60ch' }}>
                {profile.summary}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {profile.primaryStack.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(125, 207, 255, 0.3)',
                      color: 'var(--text)',
                      backgroundColor: 'rgba(125, 207, 255, 0.1)',
                    }}
                  />
                ))}
              </Box>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button component={Link} href="/cv" variant="contained">
                  {locale === 'fr' ? 'Ouvrir le CV détaillé' : 'Open full CV'}
                </Button>
                <Button component="a" href={profile.cvPdf} target="_blank" rel="noopener noreferrer" variant="outlined">
                  {locale === 'fr' ? 'Télécharger le PDF' : 'Download PDF'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(255, 158, 100, 0.12), transparent 35%), radial-gradient(circle at bottom left, rgba(158, 206, 106, 0.12), transparent 36%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Stack spacing={2} sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ borderLeft: '3px solid var(--cyan)', pl: 1.5 }}>
                <Typography variant="overline" sx={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
                  {locale === 'fr' ? 'Disponibilité' : 'Availability'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                  {profile.availability}
                </Typography>
              </Box>

              <Box sx={{ borderLeft: '3px solid var(--purple)', pl: 1.5 }}>
                <Typography variant="overline" sx={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
                  {locale === 'fr' ? 'Langues' : 'Languages'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                  {languages}
                </Typography>
              </Box>

              {toeic && (
                <Box sx={{ borderLeft: '3px solid var(--green)', pl: 1.5 }}>
                  <Typography variant="overline" sx={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
                    TOEIC
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                    {toeic.score}
                  </Typography>
                </Box>
              )}

              <Box sx={{ borderLeft: '3px solid var(--orange)', pl: 1.5 }}>
                <Typography variant="overline" sx={{ color: 'var(--muted)', letterSpacing: '0.08em' }}>
                  {locale === 'fr' ? 'Localisation' : 'Location'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                  {profile.location}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
