'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { profile } from '../../lib/profile';

export default function LanguagesSection() {
  const toeic = (profile.certifications || []).find((c) =>
    c.name.toLowerCase().includes('toeic')
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography component="h4" variant="h5" color="primary" gutterBottom>
        Langues
      </Typography>

      <List dense>
        {profile.languages.map((lang) => {
          const extra = lang.name.toLowerCase() === 'anglais' && toeic ? ` • TOEIC ${toeic.score}` : '';
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
