'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Email, GitHub, LinkedIn, Phone, PictureAsPdf } from '@mui/icons-material';
import { getProfile } from '../../../lib/content';
import { useLocale } from '../../context/LocaleContext';

function getPhoneHref(phone: string) {
  const normalizedPhone = phone.replace(/[^\d+]/g, '');

  if (normalizedPhone.startsWith('+')) return `tel:${normalizedPhone}`;
  if (normalizedPhone.startsWith('0')) return `tel:+33${normalizedPhone.slice(1)}`;
  return `tel:${normalizedPhone}`;
}

export default function ContactPage() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const phoneHref = getPhoneHref(profile.phone);

  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Box component="header" sx={{ mb: 4, maxWidth: 760 }}>
        <Typography component="h1" variant="h2" sx={{ color: 'var(--text)', mb: 1.5 }}>
          {locale === 'fr' ? 'Parlons du poste ou du projet' : "Let's talk about the role or the project"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, maxWidth: '58ch' }}>
          {profile.contactPitch}
        </Typography>
      </Box>

      <Box
        component="address"
        sx={{
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          borderTop: '2px solid var(--cyan)',
          backgroundColor: 'var(--surface)',
          p: { xs: 3, md: 4 },
          fontStyle: 'normal',
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography component="h2" variant="h5" sx={{ color: 'var(--text)', mb: 0.75 }}>
              {locale === 'fr' ? 'Contact direct' : 'Direct contact'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {locale === 'fr'
                ? 'L’email est le moyen le plus simple de me transmettre le contexte d’un poste ou d’un projet.'
                : 'Email is the easiest way to share the context of a role or project.'}
            </Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <Button variant="contained" startIcon={<Email />} href={`mailto:${profile.email}`}>
              {profile.email}
            </Button>
            <Button
              variant="outlined"
              startIcon={<LinkedIn />}
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              {locale === 'fr' ? 'Échanger sur LinkedIn' : 'Connect on LinkedIn'}
            </Button>
          </Stack>

          <Divider />

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Button variant="text" size="small" startIcon={<Phone />} href={phoneHref}>
              {profile.phone}
            </Button>
            <Button
              variant="text"
              size="small"
              startIcon={<GitHub />}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Button>
            <Button
              variant="text"
              size="small"
              startIcon={<PictureAsPdf />}
              href={profile.cvPdf}
              target="_blank"
              rel="noopener noreferrer"
            >
              {locale === 'fr' ? 'CV PDF' : 'PDF CV'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
