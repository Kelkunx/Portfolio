'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { useLocale } from '../context/LocaleContext';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';

export default function CertificationsSection() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;

  if (!profile.certifications || profile.certifications.length === 0) return null;

  return (
    <Box sx={{ mt: 8 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <WorkspacePremiumIcon color="primary" />
        <Typography component="h4" variant="h5" color="primary" gutterBottom>
          {locale === 'en' ? 'Certifications' : 'Certifications'}
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {profile.certifications.map((c, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              gap: 2,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              p: 2.5,
              transition: 'transform 200ms ease, box-shadow 220ms ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 'var(--shadow-glow)',
              },
            }}
          >
            <SchoolIcon color="secondary" />
            <Box>
              <Typography variant="subtitle1" color="text.primary">
                {c.url ? (
                  <Link href={c.url} target="_blank" rel="noopener noreferrer" underline="hover">
                    {c.name}
                  </Link>
                ) : (
                  c.name
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${c.issuer} • ${c.score}${c.date ? ` • ${c.date}` : ''}${c.note ? ` — ${c.note}` : ''}`}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
