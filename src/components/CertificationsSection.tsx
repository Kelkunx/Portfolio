'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
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
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <WorkspacePremiumIcon color="primary" />
        <Typography component="h4" variant="h5" color="primary" gutterBottom>
          {locale === 'en' ? 'Certifications' : 'Certifications'}
        </Typography>
      </Stack>

      <List>
        {profile.certifications.map((c, i) => (
          <ListItem key={i} disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <SchoolIcon color="secondary" />
            </ListItemIcon>

            <ListItemText
              primary={
                c.url ? (
                  <Link href={c.url} target="_blank" rel="noopener noreferrer" underline="hover">
                    {c.name}
                  </Link>
                ) : (
                  c.name
                )
              }
              secondary={`${c.issuer} • ${c.score}${c.date ? ` • ${c.date}` : ''} ${c.note ? ` — ${c.note}` : ''}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
