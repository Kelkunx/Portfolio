'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getProfile } from '../../lib/content';
import { useLocale } from '../context/LocaleContext';
import SiteContainer from './SiteContainer';

const footerLinkStyles = {
  color: 'var(--text-2)',
  fontSize: '0.9rem',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'color 160ms ease',
  '&:hover': { color: 'var(--blue)' },
};

export default function Footer() {
  const { locale } = useLocale();
  const profile = getProfile(locale);

  return (
    <Box component="footer" sx={{ backgroundColor: 'var(--bg-2)' }}>
      <SiteContainer
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          py: 3.5,
        }}
      >
        <Typography variant="body2" sx={{ color: 'var(--text-2)' }}>
          © {new Date().getFullYear()} Léo JEGO
        </Typography>

        <Stack direction="row" spacing={{ xs: 2.5, sm: 3.5 }} useFlexGap flexWrap="wrap">
          <Box component="a" href={profile.linkedin} target="_blank" rel="noopener noreferrer" sx={footerLinkStyles}>
            LinkedIn
          </Box>
          <Box component="a" href={profile.github} target="_blank" rel="noopener noreferrer" sx={footerLinkStyles}>
            GitHub
          </Box>
          <Box component="a" href={profile.cvPdf} target="_blank" rel="noopener noreferrer" sx={footerLinkStyles}>
            CV
          </Box>
        </Stack>
      </SiteContainer>
    </Box>
  );
}
