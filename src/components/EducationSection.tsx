// components/EducationSection.tsx
'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { profile } from '../../lib/profile';

export default function EducationSection() {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography component={"h4"} variant="h5" gutterBottom>
        Formations
      </Typography>

      <Stack spacing={2}>
        {profile.education.map((edu, i) => (
          <Box key={i}>
            <Typography component={"h5"} variant="subtitle1">
              {edu.degree} — {edu.school}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {edu.start} {edu.end ? `— ${edu.end}` : ''}
            </Typography>
            {edu.notes && (
              <Box component="ul" sx={{ mt: 1, ml: 0 }}>
                {edu.notes.map((n, idx) => (
                  <li key={idx}>
                    <Typography variant="body2" color="text.secondary">
                      {n}
                    </Typography>
                  </li>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
