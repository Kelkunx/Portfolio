// src/components/Footer.tsx
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
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';

export default function Footer() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;

  const linkedin = profile.linkedin ?? 'https://www.linkedin.com';
  const github = 'https://github.com/Kelkunx';
  const email = profile.email ?? 'mailto:leo.jego56@gmail.com';
  const cv = profile.cvPdf ?? '/cv-leo-jego.pdf';
  const roleText = profile.title ?? 'Full-stack developer';

  const ariaLinkedIn = locale === 'fr' ? 'Ouvrir LinkedIn (nouvel onglet)' : 'Open LinkedIn (new tab)';
  const ariaGithub = locale === 'fr' ? 'Ouvrir GitHub (nouvel onglet)' : 'Open GitHub (new tab)';
  const ariaEmail = locale === 'fr' ? 'Envoyer un email' : 'Send an email';
  const ariaCv = locale === 'fr' ? 'Télécharger le CV (PDF)' : 'Download CV (PDF)';

  return (
    <footer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ flex: '1 1 auto' }}>
            © {new Date().getFullYear()} Léo JEGO — {roleText}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: '0 0 auto' }}>
            <Tooltip title={ariaLinkedIn}>
              <IconButton
                component="a"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label={ariaLinkedIn}
                color='info'
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={ariaGithub}>
              <IconButton
                component="a"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label={ariaGithub}
                color='secondary'
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={ariaEmail}>
              <IconButton
                component="a"
                href={`mailto:${email.startsWith('mailto:') ? email.replace('mailto:', '') : email}`}
                size="small"
                aria-label={ariaEmail}
                color='error'
              >
                <EmailIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            <Tooltip title={ariaCv}>
              <IconButton
                component="a"
                href={cv}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                aria-label={ariaCv}
                color='success'
              >
                <DescriptionIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Container>
    </footer>
  );
}
