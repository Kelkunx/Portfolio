'use client';

import React from 'react';
import { motion, useReducedMotion, type Easing } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

const MotionBox = motion(Box);

type SkillsSectionProps = {
  variant?: 'home' | 'cv';
};

export default function SkillsSection({ variant = 'home' }: SkillsSectionProps) {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const reduce = useReducedMotion();
  const ease: Easing = [0.22, 1, 0.36, 1];
  const tones = ['var(--cyan)', 'var(--purple)', 'var(--green)', 'var(--orange)'];

  if (variant === 'cv') {
    return (
      <Box sx={{ mt: 8 }}>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
            {locale === 'fr' ? 'Compétences' : 'Skills'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '70ch' }}>
            {locale === 'fr'
              ? 'Vue complète de la stack, structurée par domaines de pratique.'
              : 'Full view of the stack, organised by practice areas.'}
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {profile.skills.map((group, index) => {
            const tone = tones[index % tones.length];
            const revealProps = reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 16 },
                  whileInView: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease, delay: Math.min(index * 0.05, 0.24) },
                  },
                  viewport: { once: true, amount: 0.25 },
                };

            return (
              <Grid key={group.category} size={{ xs: 12, md: 6 }}>
                <MotionBox
                  {...revealProps}
                  sx={{
                    position: 'relative',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border)',
                    backgroundColor: 'var(--surface)',
                    p: 3,
                    height: '100%',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: 3,
                      background: `linear-gradient(90deg, ${tone}, transparent)`,
                    },
                  }}
                >
                  <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 2 }}>
                    {group.category}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {group.items.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: tone,
                          color: 'var(--text)',
                          backgroundColor:
                            tone === 'var(--cyan)'
                              ? 'rgba(125, 207, 255, 0.1)'
                              : tone === 'var(--purple)'
                                ? 'rgba(187, 154, 247, 0.1)'
                                : tone === 'var(--green)'
                                  ? 'rgba(158, 206, 106, 0.1)'
                                  : 'rgba(255, 158, 100, 0.1)',
                        }}
                      />
                    ))}
                  </Box>
                </MotionBox>
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
        <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
          {locale === 'fr' ? "Ce que j'apporte" : 'What I bring'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '70ch' }}>
          {locale === 'fr'
            ? 'Un profil full-stack avec une attention forte portée à la clarté, à la logique métier et à la qualité de livraison.'
            : 'A full-stack profile focused on clarity, business logic and execution quality.'}
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {profile.valuePillars.map((pillar, index) => {
          const tone = tones[index % tones.length];
          const revealProps = reduce
            ? {}
            : {
                initial: { opacity: 0, y: 18 },
                whileInView: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease, delay: Math.min(index * 0.06, 0.28) },
                },
                viewport: { once: true, amount: 0.3 },
              };

          return (
            <Grid key={pillar.title} size={{ xs: 12, md: 6 }}>
              <MotionBox
                {...revealProps}
                sx={{
                  position: 'relative',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  p: { xs: 3, md: 3.5 },
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: tone,
                    boxShadow: 'var(--shadow-soft)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 3,
                    background: `linear-gradient(90deg, ${tone}, transparent)`,
                  },
                }}
              >
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="overline"
                      sx={{ color: 'var(--muted)', letterSpacing: '0.08em', display: 'block' }}
                    >
                      {locale === 'fr' ? 'Pilier' : 'Pillar'}
                    </Typography>
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

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {pillar.tools.map((tool) => (
                      <Chip
                        key={tool}
                        label={tool}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: tone,
                          color: 'var(--text)',
                          backgroundColor:
                            tone === 'var(--cyan)'
                              ? 'rgba(125, 207, 255, 0.1)'
                              : tone === 'var(--purple)'
                                ? 'rgba(187, 154, 247, 0.1)'
                                : tone === 'var(--green)'
                                  ? 'rgba(158, 206, 106, 0.1)'
                                  : 'rgba(255, 158, 100, 0.1)',
                        }}
                      />
                    ))}
                  </Box>
                </Stack>
              </MotionBox>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
