'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useLocale } from '../../context/LocaleContext';
import { getProfile } from '../../../lib/content';
import ExperienceSection from '../../components/ExperienceSection';
import SkillsSection from '../../components/SkillsSection';
import LanguagesSection from '../../components/LanguagesSection';
import CertificationsSection from '../../components/CertificationsSection';
import EducationSection from '../../components/EducationSection';
import TechStackChips from '../../components/TechStackChips';

export default function CvPage() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Box
        sx={{
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          borderTop: '2px solid var(--cyan)',
          backgroundColor: 'var(--surface)',
          p: { xs: 3, md: 4 },
        }}
      >
        <Grid container spacing={{ xs: 3, md: 5 }} alignItems="center">
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={2.25}>
              <Typography component="h1" variant="h2" sx={{ color: 'var(--text)' }}>
                {profile.focus}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '62ch', lineHeight: 1.8 }}>
                {profile.summary}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button component="a" href={profile.cvPdf} target="_blank" rel="noopener noreferrer" variant="contained">
                  {locale === 'fr' ? 'Télécharger le CV PDF' : 'Download PDF CV'}
                </Button>
                <Button component={Link} href="/contact" variant="outlined">
                  {locale === 'fr' ? 'Me contacter' : 'Contact me'}
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2.5} sx={{ borderLeft: { md: '1px solid var(--border)' }, pl: { md: 4 } }}>
              <Box>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.5 }}>
                  {locale === 'fr' ? 'Localisation' : 'Location'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text)' }}>
                  {profile.location}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 1 }}>
                  {locale === 'fr' ? 'Stack principale' : 'Primary stack'}
                </Typography>
                <TechStackChips items={profile.primaryStack} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <ExperienceSection />
      <SkillsSection variant="cv" />

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <LanguagesSection />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CertificationsSection />
        </Grid>
      </Grid>

      <EducationSection />
    </Container>
  );
}
