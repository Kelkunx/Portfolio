'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useLocale } from '../context/LocaleContext';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import MemoryIcon from '@mui/icons-material/Memory';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FactCheckIcon from '@mui/icons-material/FactCheck'; // pour tests & qualité

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
  if (l.includes('base de données') || l.includes('database') || l.includes('data')) {
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

export default function SkillsSection() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography component="h4" variant="h5" color="primary" gutterBottom>
        {locale === 'fr' ? 'Compétences' : 'Skills'}
      </Typography>

      <Stack spacing={3}>
        {profile.skills.map((group) => (
          <Box key={group.category}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Box>{getCategoryIcon(group.category)}</Box>
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
                    variant={featured ? 'filled' : 'outlined'}
                    color={featured ? 'primary' : 'secondary'}
                    sx={{ mr: 1, mb: 1 }}
                  />
                );
              })}
            </Stack>

            <Divider sx={{ my: 2 }} />
          </Box>
        ))}
      </Stack>

      <Typography variant="caption" color="text.secondary">
        {locale === 'fr'
          ? "Les compétences sont regroupées par catégorie et présentées du plus maîtrisé vers le moins maîtrisé."
          : 'Skills are grouped by category and presented from most proficient to less proficient.'}
      </Typography>
    </Box>
  );
}
