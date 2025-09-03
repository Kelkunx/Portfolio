// components/SkillsSection.tsx
'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { profile } from '../../lib/profile';

export default function SkillsSection() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Compétences
      </Typography>

      <Stack spacing={3}>
        {profile.skills.map((group) => (
          <Box key={group.category}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {group.category}
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {group.items.map((skill, idx) => {
                // on met en avant les 2-3 premières compétences de chaque catégorie
                const featured = idx < 3;
                return (
                  <Chip
                    key={skill}
                    label={skill}
                    size="medium"
                    variant={featured ? 'filled' : 'outlined'}
                    color={featured ? 'primary' : 'default'}
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
        Les compétences sont regroupées par catégorie et présentées du plus maîtrisé vers le moins maîtrisé dans chaque groupe.
      </Typography>
    </Box>
  );
}
