'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';

export default function Footer() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  const ariaLinkedIn = locale === 'fr' ? 'Ouvrir LinkedIn' : 'Open LinkedIn';
  const ariaGithub = locale === 'fr' ? 'Ouvrir GitHub' : 'Open GitHub';
  const ariaEmail = locale === 'fr' ? 'Envoyer un email' : 'Send an email';
  const ariaCv = locale === 'fr' ? 'Télécharger le CV' : 'Download CV';

  return (
    <footer>
      <Box
        sx={{
          position: 'relative',
          borderTop: '1px solid var(--border)',
          backgroundColor: 'var(--bg-2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '1px',
            background: 'var(--grad-border)',
            opacity: 0.35,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ color: 'var(--text)' }}>
                © {new Date().getFullYear()} Léo JEGO
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.focus} • {profile.location}
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title={ariaLinkedIn}>
                <IconButton
                  component="a"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={ariaLinkedIn}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={ariaGithub}>
                <IconButton
                  component="a"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={ariaGithub}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={ariaEmail}>
                <IconButton component="a" href={`mailto:${profile.email}`} size="small" aria-label={ariaEmail}>
                  <EmailIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={ariaCv}>
                <IconButton
                  component="a"
                  href={profile.cvPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  aria-label={ariaCv}
                >
                  <DescriptionIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
