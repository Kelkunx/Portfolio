'use client';

import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import PictureAsPdf from '@mui/icons-material/PictureAsPdf';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getProfile } from '../../lib/content';
import { useLocale } from '../context/LocaleContext';
import SiteContainer from './SiteContainer';

export default function Footer() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  return (
    <Box component="footer" sx={{ backgroundColor: 'var(--bg-2)' }}>
      <SiteContainer
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          py: 3.5,
          '@media (max-width: 359px)': {
            alignItems: 'flex-start',
            flexDirection: 'column',
          },
        }}
      >
        <Typography variant="body2" sx={{ color: 'var(--text-2)' }}>
          © {new Date().getFullYear()} Léo JEGO
        </Typography>

        <Stack direction="row" spacing={0.75}>
          <Box
            component="a"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link footer-icon-link--linkedin"
            aria-label={locale === 'fr' ? 'Voir mon profil LinkedIn' : 'View my LinkedIn profile'}
            title="LinkedIn"
          >
            <LinkedIn />
          </Box>
          <Box
            component="a"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link footer-icon-link--github"
            aria-label={locale === 'fr' ? 'Voir mon profil GitHub' : 'View my GitHub profile'}
            title="GitHub"
          >
            <GitHub />
          </Box>
          <Box
            component="a"
            href={profile.cvPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon-link footer-icon-link--cv"
            aria-label={locale === 'fr' ? 'Ouvrir mon CV PDF' : 'Open my PDF resume'}
            title={locale === 'fr' ? 'CV PDF' : 'PDF resume'}
          >
            <PictureAsPdf />
          </Box>
        </Stack>
      </SiteContainer>
    </Box>
  );
}
