'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { profile } from '../../lib/profile';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import MemoryIcon from '@mui/icons-material/Memory';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const categoryIcon: Record<string, React.ReactNode> = {
  'Frontend': <CodeIcon fontSize="small" />,
  'Backend / API': <BuildIcon fontSize="small" />,
  'Bases de données': <StorageIcon fontSize="small" />,
  'DevOps & Tests': <BuildIcon fontSize="small" />,
  'Langages embarqués & Systèmes': <MemoryIcon fontSize="small" />,
  'Autres': <MoreHorizIcon fontSize="small" />,
};

export default function SkillsSection() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography component="h4" variant="h5" color="primary" gutterBottom>
        Compétences
      </Typography>

      <Stack spacing={3}>
        {profile.skills.map((group) => (
          <Box key={group.category}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Box>{categoryIcon[group.category] || <MoreHorizIcon fontSize="small" />}</Box>
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
        Les compétences sont regroupées par catégorie et présentées du plus maîtrisé vers le moins maîtrisé.
      </Typography>
    </Box>
  );
}
