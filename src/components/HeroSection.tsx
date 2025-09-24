// components/HeroSection.tsx
'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import { profile } from '../../lib/profile';
import { LinkedIn, Email, Phone } from '@mui/icons-material';

export default function HeroSection() {
  return (
    <Box component="section" aria-labelledby="hero-heading" sx={{ py: 6 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems="center"
      >
        <Box sx={{ flexShrink: 0 }}>
          <Image
            src={profile.avatar}
            alt={`Portrait de ${profile.name}`}
            width={150}
            height={150}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            priority
          />
        </Box>

        <Box>
          <Typography id="hero-heading" component="h1" variant="h3">
            {profile.name}
          </Typography>

          <Typography component="h2" variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            {profile.title} — {profile.location}
          </Typography>

          <Typography component="h3" sx={{ mt: 2, maxWidth: '60ch' }} color="text.secondary">
            {profile.summary}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" component={Link} href="/projets">
              Voir mes projets
            </Button>
            <Button
              variant="outlined"
              component="a"
              href={profile.cvPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              Télécharger le CV (PDF)
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
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
            <Button
              variant="text"
              href={`tel:${profile.phone}`}
              startIcon={<Phone />}
            >
              {profile.phone}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
