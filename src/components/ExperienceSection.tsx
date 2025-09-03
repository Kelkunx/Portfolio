// components/ExperienceSection.tsx
'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { profile } from '../../lib/profile';

function formatRange(start?: string, end?: string) {
  if (!start) return '';
  return end ? `${start} — ${end}` : `${start} — présent`;
}

export default function ExperienceSection() {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h5" gutterBottom>
        Expériences professionnelles
      </Typography>

      <Stack spacing={3}>
        {profile.experiences.map((exp, i) => (
          <Box key={i} sx={{ borderLeft: '3px solid', borderColor: 'divider', pl: 3 }}>
            <Typography variant="subtitle1" component="h3">
              {exp.role} — {exp.company}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatRange(exp.start, exp.end)} • {exp.location}
            </Typography>
            <Box component="ul" sx={{ mt: 1, ml: 0 }}>
              {exp.bullets.map((b, idx) => (
                <li key={idx}>
                  <Typography variant="body2" color="text.secondary">
                    {b}
                  </Typography>
                </li>
              ))}
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
