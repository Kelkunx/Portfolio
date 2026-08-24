'use client';

import ArrowOutward from '@mui/icons-material/ArrowOutward';
import Email from '@mui/icons-material/Email';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Phone from '@mui/icons-material/Phone';
import PictureAsPdf from '@mui/icons-material/PictureAsPdf';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { getProfile } from '../../../lib/content';
import SiteContainer from '../../components/SiteContainer';
import { useLocale } from '../../context/LocaleContext';

function getPhoneHref(phone: string) {
  const normalizedPhone = phone.replace(/[^\d+]/g, '');

  if (normalizedPhone.startsWith('+')) return `tel:${normalizedPhone}`;
  if (normalizedPhone.startsWith('0')) return `tel:+33${normalizedPhone.slice(1)}`;
  return `tel:${normalizedPhone}`;
}

type ContactLinkProps = {
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  tone: 'email' | 'linkedin' | 'phone' | 'github' | 'pdf';
  variant?: 'primary' | 'secondary' | 'quiet';
  external?: boolean;
};

function ContactLink({ href, label, value, icon, tone, variant = 'quiet', external = false }: ContactLinkProps) {
  return (
    <Box
      component="a"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`contact-action contact-action--${variant} contact-action--${tone}`}
    >
      <Box aria-hidden="true" className="contact-action-icon">
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography component="span" variant="body2" className="contact-action-label">
          {label}
        </Typography>
        <Typography component="span" variant={variant === 'primary' ? 'h6' : 'body1'} className="contact-action-value">
          {value}
        </Typography>
      </Box>
      <ArrowOutward className="contact-action-arrow" aria-hidden="true" />
    </Box>
  );
}

export default function ContactPage() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const phoneHref = getPhoneHref(profile.phone);

  return (
    <SiteContainer sx={{ py: { xs: 6, md: 10 } }}>
      <Box className="contact-layout">
        <Box component="header">
          <Typography
            component="h1"
            variant="h2"
            sx={{ color: 'var(--text)', fontSize: { xs: '2.5rem', sm: '3.5rem' }, mb: 2, maxWidth: '13ch' }}
          >
            {locale === 'fr' ? 'Parlons du poste ou du projet' : "Let's talk about the role or the project"}
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.85, maxWidth: '52ch' }}>
            {profile.contactPitch}
          </Typography>
        </Box>

        <Box component="address" className="contact-address">
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            <Typography component="h2" variant="h5" sx={{ color: 'var(--text)' }}>
              {locale === 'fr' ? 'Contact direct' : 'Direct contact'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.7 }}>
              {locale === 'fr'
                ? 'L’email est le moyen le plus simple de me transmettre le contexte d’un poste ou d’un projet.'
                : 'Email is the easiest way to share the context of a role or project.'}
            </Typography>
          </Stack>

          <Stack spacing={1.25}>
            <ContactLink
              href={`mailto:${profile.email}`}
              label="Email"
              value={profile.email}
              icon={<Email fontSize="small" />}
              tone="email"
              variant="primary"
            />
            <ContactLink
              href={profile.linkedin}
              label="LinkedIn"
              value={locale === 'fr' ? 'Échanger sur LinkedIn' : 'Connect on LinkedIn'}
              icon={<LinkedIn fontSize="small" />}
              tone="linkedin"
              variant="secondary"
              external
            />
          </Stack>

          <Box sx={{ mt: 3, borderBottom: '1px solid var(--border)' }}>
            <ContactLink
              href={phoneHref}
              label={locale === 'fr' ? 'Téléphone' : 'Phone'}
              value={profile.phone}
              icon={<Phone fontSize="small" />}
              tone="phone"
            />
            <ContactLink
              href={profile.github}
              label="GitHub"
              value="Kelkunx"
              icon={<GitHub fontSize="small" />}
              tone="github"
              external
            />
            <ContactLink
              href={profile.cvPdf}
              label={locale === 'fr' ? 'CV' : 'Resume'}
              value={locale === 'fr' ? 'Ouvrir le CV PDF' : 'Open PDF resume'}
              icon={<PictureAsPdf fontSize="small" />}
              tone="pdf"
              external
            />
          </Box>
        </Box>
      </Box>
    </SiteContainer>
  );
}
