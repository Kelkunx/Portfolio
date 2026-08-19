'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { CodeRounded, HandymanRounded } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';
import SectionTitle from './SectionTitle';
import TechStackChips from './TechStackChips';

type SkillsSectionProps = {
  variant?: 'home' | 'cv';
};

export default function SkillsSection({ variant = 'home' }: SkillsSectionProps) {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const tones = ['var(--cyan)', 'var(--purple)', 'var(--green)', 'var(--orange)'];

  if (variant === 'cv') {
    return (
      <Box sx={{ mt: 8 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <SectionTitle
            title={locale === 'fr' ? 'Compétences' : 'Skills'}
            icon={<CodeRounded />}
            tone="purple"
          />
        </Stack>

        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {profile.skills.map((group, index) => {
            const tone = tones[index % tones.length];

            return (
              <Grid key={group.category} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    borderLeft: `2px solid ${tone}`,
                    pl: 2,
                    py: 0.25,
                  }}
                >
                  <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1.25 }}>
                    {group.category}
                  </Typography>
                  <TechStackChips items={group.items} />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: { xs: 8, md: 12 } }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <SectionTitle
          title={locale === 'fr' ? "Ce que j'apporte" : 'What I bring'}
          icon={<HandymanRounded />}
          tone="green"
        />
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '70ch' }}>
          {locale === 'fr'
            ? 'Un profil full-stack avec une attention forte portée à la clarté, à la logique métier et à la qualité de livraison.'
            : 'A full-stack profile focused on clarity, business logic and execution quality.'}
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {profile.valuePillars.map((pillar, index) => {
          const tone = tones[index % tones.length];

          return (
            <Grid key={pillar.title} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  borderTop: `2px solid ${tone}`,
                  backgroundColor: 'var(--surface)',
                  p: { xs: 3, md: 3.5 },
                  height: '100%',
                  transition: 'transform 180ms ease, border-color 180ms ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: tone,
                  },
                }}
              >
                <Stack spacing={2}>
                  <Box>
                    <Typography component="h3" variant="h5" sx={{ color: 'var(--text)' }}>
                      {pillar.title}
                    </Typography>
                  </Box>

                  <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
                    {pillar.description}
                  </Typography>

                  <Divider />

                  <Box>
                    <Typography variant="body2" sx={{ color: 'var(--text)', fontWeight: 600, mb: 0.75 }}>
                      {locale === 'fr' ? 'Preuve' : 'Proof'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {pillar.proof}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {pillar.tools.join(' • ')}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
