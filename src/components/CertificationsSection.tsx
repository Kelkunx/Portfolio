// components/CertificationsSection.tsx
'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SchoolIcon from '@mui/icons-material/School';
import Link from '@mui/material/Link';
import { profile } from '../../lib/profile';

export default function CertificationsSection() {
  if (!profile.certifications || profile.certifications.length === 0) return null;

  return (
    <Box sx={{ mt: 6 }}>
      <Typography component={"h4"} variant="h5" gutterBottom>
        Certifications
      </Typography>

      <List>
        {profile.certifications.map((c, i) => (
          <ListItem key={i} disableGutters>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <SchoolIcon color="primary" />
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
