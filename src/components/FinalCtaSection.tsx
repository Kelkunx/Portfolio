'use client';

import { ArrowOutward } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useLocale } from '../context/LocaleContext';
import SiteContainer from './SiteContainer';

export default function FinalCtaSection() {
  const { locale } = useLocale();

  return (
    <Box
      component="section"
      sx={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--surface-3)',
      }}
    >
      <SiteContainer
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 3,
          py: { xs: 4, md: 5 },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={{ color: 'var(--text)', fontSize: { xs: '1.65rem', sm: '2.125rem' } }}
        >
          {locale === 'fr' ? 'Un poste ou un projet à discuter ?' : 'A role or a project to discuss?'}
        </Typography>
        <Button
          component={Link}
          href="/contact"
          variant="contained"
          size="large"
          endIcon={<ArrowOutward />}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {locale === 'fr' ? 'Me contacter' : 'Contact me'}
        </Button>
      </SiteContainer>
    </Box>
  );
}
