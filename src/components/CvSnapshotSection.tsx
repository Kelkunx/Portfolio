'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { DescriptionRounded } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';
import SectionTitle from './SectionTitle';
import TechStackChips from './TechStackChips';

export default function CvSnapshotSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const toeicCertification = profile.certifications.find((item) => item.name.toLowerCase().includes('toeic'));
  const languageSummary = profile.languages.map((item) => `${item.name} ${item.level}`).join(' • ');

  return (
    <Box component="section" sx={{ mt: { xs: 8, md: 12 } }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            sx={{
              height: '100%',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
            }}
          >
            <Stack spacing={2}>
              <SectionTitle
                title={locale === 'fr' ? 'CV express' : 'Quick CV'}
                icon={<DescriptionRounded />}
                tone="cyan"
              />
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '60ch' }}>
                {profile.summary}
              </Typography>

              <TechStackChips items={profile.primaryStack} />

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
              height: '100%',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
            }}
          >
            <Stack spacing={2}>
              <Box sx={{ borderLeft: '3px solid var(--cyan)', pl: 1.5 }}>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.4 }}>
                  {locale === 'fr' ? 'Disponibilité' : 'Availability'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                  {profile.availability}
                </Typography>
              </Box>

              <Box sx={{ borderLeft: '3px solid var(--purple)', pl: 1.5 }}>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.4 }}>
                  {locale === 'fr' ? 'Langues' : 'Languages'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                  {languageSummary}
                </Typography>
              </Box>

              {toeicCertification && (
                <Box sx={{ borderLeft: '3px solid var(--green)', pl: 1.5 }}>
                  <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.4 }}>
                    TOEIC
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                    {toeicCertification.score}
                  </Typography>
                </Box>
              )}

              <Box sx={{ borderLeft: '3px solid var(--orange)', pl: 1.5 }}>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.4 }}>
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
