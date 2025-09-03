// components/HeroSection.tsx
'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { profile } from '../../lib/profile';
import { LinkedIn, GitHub, Email, Phone } from '@mui/icons-material';

export default function HeroSection() {
  return (
    <Box sx={{ py: 6 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center">
        <Avatar alt={profile.name} src={profile.avatar} sx={{ width: 120, height: 120 }} />

        <Box>
          <Typography variant="h3" component="h1">
            {profile.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            {profile.title} — {profile.location}
          </Typography>

          <Typography sx={{ mt: 2, maxWidth: '60ch' }} color="text.secondary">
            {profile.summary}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" component={Link} href="/projets">
              Voir mes projets
            </Button>

            <Button variant="outlined" component="a" href={profile.cvPdf} target="_blank" rel="noopener noreferrer">
              Télécharger le CV (PDF)
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button
              variant="text"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<LinkedIn />}
            >
              LinkedIn
            </Button>

            <Button
              variant="text"
              href={`mailto:${profile.email}`}
              startIcon={<Email />}
            >
              {profile.email}
            </Button>

            <Button variant="text" href={`tel:${profile.phone}`} startIcon={<Phone />}>
              {profile.phone}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
