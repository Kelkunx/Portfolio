'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

export default function CertificationsSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const tones = ['var(--green)', 'var(--cyan)', 'var(--purple)'];

  if (profile.certifications.length === 0) return null;

  return (
    <Box sx={{ mt: 8 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
          {locale === 'fr' ? 'Certifications' : 'Certifications'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {locale === 'fr' ? 'Preuves externes utiles pour crédibiliser le profil.' : 'External proof points that support the profile.'}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {profile.certifications.map((certification, index) => (
          <Box
            key={`${certification.name}-${certification.date}`}
            sx={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: 2.5,
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: 3,
                background: `linear-gradient(90deg, ${tones[index % tones.length]}, transparent 72%)`,
              },
            }}
          >
            <Typography variant="subtitle1" sx={{ color: 'var(--text)', mb: 0.5 }}>
              {certification.url ? (
                <Link href={certification.url} target="_blank" rel="noopener noreferrer" underline="hover">
                  {certification.name}
                </Link>
              ) : (
                certification.name
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {[certification.issuer, certification.score, certification.date].filter(Boolean).join(' • ')}
            </Typography>
            {certification.note && (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
                {certification.note}
              </Typography>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
