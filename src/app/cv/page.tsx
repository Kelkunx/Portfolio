'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
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

export default function CvPage() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const toeic = profile.certifications.find((item) => item.name.toLowerCase().includes('toeic'));

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
      <Grid container spacing={3} alignItems="stretch">
        <Grid size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--cyan)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
              height: '100%',
            }}
          >
            <Stack spacing={2.5}>
              <Typography component="h1" variant="h2" sx={{ color: 'var(--text)' }}>
                {profile.focus}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '62ch', lineHeight: 1.8 }}>
                {profile.summary}
              </Typography>

              <Grid container spacing={1.25}>
                {profile.proofPoints.slice(0, 3).map((item, index) => {
                  const tone = index === 0 ? 'var(--cyan)' : index === 1 ? 'var(--purple)' : 'var(--green)';
                  const bg =
                    index === 0
                      ? 'rgba(125, 207, 255, 0.12)'
                      : index === 1
                        ? 'rgba(187, 154, 247, 0.12)'
                        : 'rgba(158, 206, 106, 0.12)';

                  return (
                    <Grid key={`${item.label}-${item.value}`} size={{ xs: 12, sm: 4 }}>
                      <Box
                        sx={{
                          borderRadius: 14,
                          border: `1px solid color-mix(in srgb, ${tone} 30%, transparent)`,
                          backgroundColor: bg,
                          px: 1.5,
                          py: 1.25,
                          height: '100%',
                        }}
                      >
                        <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.35 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'var(--text)', lineHeight: 1.55 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>

              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                {profile.targetRoles.join(' • ')}
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
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              borderTop: '2px solid var(--purple)',
              backgroundColor: 'var(--surface)',
              p: { xs: 3, md: 4 },
              height: '100%',
            }}
          >
            <Stack spacing={2}>
              <Box>
                <Typography variant="body1" sx={{ color: 'var(--text)', mt: 0.5 }}>
                  {profile.name}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  {profile.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.availability}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.5 }}>
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

              <Box sx={{ borderLeft: '3px solid var(--purple)', pl: 1.5 }}>
                <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.5 }}>
                  {locale === 'fr' ? 'Langues' : 'Languages'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.languages.map((item) => `${item.name} ${item.level}`).join(' • ')}
                </Typography>
              </Box>

              {toeic && (
                <Box sx={{ borderLeft: '3px solid var(--green)', pl: 1.5 }}>
                  <Typography variant="body2" sx={{ color: 'var(--text-2)', mb: 0.5 }}>
                    TOEIC
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {toeic.score} • {toeic.date}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Grid>
      </Grid>

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
