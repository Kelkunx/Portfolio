'use client';
import React from 'react';
import { motion, useReducedMotion, type Easing } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { useLocale } from '../context/LocaleContext';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import MemoryIcon from '@mui/icons-material/Memory';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FactCheckIcon from '@mui/icons-material/FactCheck'; // pour tests & qualité
import SecurityIcon from '@mui/icons-material/Security';

const MotionBox = motion(Box);

function getCategoryIcon(label: string): React.ReactNode {
  const l = label.toLowerCase();

  // Frontend
  if (l.includes('front')) {
    return <CodeIcon fontSize="small" />;
  }

  // Backend / API
  if (l.includes('back') || l.includes('api')) {
    return <BuildIcon fontSize="small" />;
  }

  // Bases de données / Databases
  if (l.includes('bases de données') || l.includes('database') || l.includes('data')) {
    return <StorageIcon fontSize="small" />;
  }

  // Tests & Qualité / Testing & Quality
  if (l.includes('test') || l.includes('qualit')) {
    return <FactCheckIcon fontSize="small" />;
  }

  // DevOps
  if (l.includes('devops')) {
    return <BuildIcon fontSize="small" />;
  }

  // Cybersecurity / Cybersécurité
  if (l.includes('cyber') || l.includes('security') || l.includes('secur') || l.includes('sécur')) {
    return <SecurityIcon fontSize="small" />;
  }

  // IoT, embarqué, systèmes / IoT & systems / embedded
  if (
    l.includes('iot') ||
    l.includes('embarqué') ||
    l.includes('embarqu') ||
    l.includes('embedded') ||
    l.includes('syst')
  ) {
    return <MemoryIcon fontSize="small" />;
  }

  // Automatisation / Automation / no-code
  if (l.includes('auto') || l.includes('no-code') || l.includes('automation')) {
    return <BuildIcon fontSize="small" />;
  }

  // Autres / Others / Other
  if (l.includes('autre') || l.includes('other')) {
    return <MoreHorizIcon fontSize="small" />;
  }

  // Fallback par défaut
  return <MoreHorizIcon fontSize="small" />;
}

function getCategoryTone(label: string): string {
  const l = label.toLowerCase();

  if (l.includes('front')) return 'var(--cyan)';
  if (l.includes('back') || l.includes('api')) return 'var(--blue)';
  if (l.includes('base') || l.includes('database') || l.includes('data')) return 'var(--teal)';
  if (l.includes('test') || l.includes('qualit')) return 'var(--green)';
  if (l.includes('devops')) return 'var(--orange)';
  if (l.includes('cyber') || l.includes('security') || l.includes('secur') || l.includes('sécur')) {
    return 'var(--red)';
  }
  if (l.includes('iot') || l.includes('embarqu') || l.includes('embedded')) return 'var(--purple)';
  if (l.includes('auto') || l.includes('no-code') || l.includes('automation')) return 'var(--magenta)';
  if (l.includes('autre') || l.includes('other')) return 'var(--muted)';

  return 'var(--accent)';
}

export default function SkillsSection() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;
  const reduce = useReducedMotion();

  return (
    <Box sx={{ mt: 6 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography component="h4" variant="h5" color="primary">
          {locale === 'fr' ? 'Compétences' : 'Skills'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '70ch' }}>
          {locale === 'fr'
            ? 'Stack organisée par domaines, avec les outils les plus maîtrisés mis en avant.'
            : 'Stack organized by domain, highlighting the most proficient tools.'}
        </Typography>
      </Stack>

      <Grid container spacing={3}>
        {profile.skills.map((group, index) => {
          const tone = getCategoryTone(group.category);
          const delay = Math.min(index * 0.08, 0.4);
          const ease: Easing = [0.22, 1, 0.36, 1];
          const revealProps = reduce
            ? {}
            : {
                initial: { opacity: 0, y: 16, filter: 'blur(6px)' },
                whileInView: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.55, ease, delay },
                },
                viewport: { once: true, amount: 0.3 },
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
                  overflow: 'hidden',
                  transition: 'transform 200ms ease, box-shadow 220ms ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: 'var(--shadow-glow)',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${tone}, transparent)`,
                    opacity: 0.9,
                    pointerEvents: 'none',
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <Box sx={{ color: tone }}>{getCategoryIcon(group.category)}</Box>
                  <Typography component="h5" variant="subtitle1">
                    {group.category}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {group.items.map((skill, idx) => {
                    const featured = idx < 3;
                    return (
                      <Chip
                        key={skill}
                        label={skill}
                        size="medium"
                        variant="outlined"
                        sx={{
                          mr: 1,
                          mb: 1,
                          borderColor: featured ? tone : 'var(--border)',
                          color: featured ? 'var(--bg)' : 'var(--text-2)',
                          backgroundColor: featured ? tone : 'transparent',
                          fontWeight: featured ? 600 : 500,
                        }}
                      />
                    );
                  })}
                </Stack>
              </MotionBox>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
