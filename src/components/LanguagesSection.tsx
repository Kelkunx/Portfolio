'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LanguageIcon from '@mui/icons-material/Language';
import Stack from '@mui/material/Stack';
import { useLocale } from '../context/LocaleContext';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';

export default function LanguagesSection() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;

  const toeic = (profile.certifications || []).find((c) =>
    c.name.toLowerCase().includes('toeic')
  );

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <LanguageIcon color="primary" />
        <Typography component="h4" variant="h5" color="primary" gutterBottom>
          {locale === 'en' ? 'Languages' : 'Langues'}
        </Typography>
      </Stack>

      <List dense>
        {profile.languages.map((lang) => {
          const extra = lang.name.toLowerCase() === (locale === 'en' ? 'english' : 'anglais') && toeic ? ` • TOEIC ${toeic.score}` : '';
          return (
            <ListItem key={lang.name} disableGutters>
              <ListItemText
                primary={lang.name}
                secondary={lang.level + extra}
                primaryTypographyProps={{ color: 'text.primary' }}
                secondaryTypographyProps={{ color: 'text.secondary' }}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
