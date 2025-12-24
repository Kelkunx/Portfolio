'use client';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useLocale } from '../context/LocaleContext';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { profile as profileEN } from '../../lib/locales/en/profile';

const MotionBox = motion(Box);

function formatRange(start?: string, end?: string, locale = 'fr') {
  if (!start) return '';
  const present = locale === 'en' ? 'present' : 'présent';
  return end ? `${start} — ${end}` : `${start} — ${present}`;
}

export default function ExperienceSection() {
  const { locale } = useLocale();
  const profile = locale === 'fr' ? profileFR : profileEN;
  const reduce = useReducedMotion();

  return (
    <Box sx={{ mt: 8 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <WorkOutlineIcon color="primary" />
        <Typography component="h4" variant="h5" color="primary" gutterBottom>
          {locale === 'en' ? 'Experience' : 'Expériences professionnelles'}
        </Typography>
      </Stack>

      <Box
        sx={{
          position: 'relative',
          pl: { xs: 2.5, md: 3.5 },
          '&::before': {
            content: '""',
            position: 'absolute',
            left: { xs: 12, md: 14 },
            top: 8,
            bottom: 8,
            width: '2px',
            background: 'var(--grad-border)',
            opacity: 0.5,
            pointerEvents: 'none',
          },
        }}
      >
        <Stack spacing={3}>
          {profile.experiences.map((exp, i) => {
            const delay = Math.min(i * 0.08, 0.4);
            return (
            <MotionBox
              key={i}
              sx={{ position: 'relative', pl: { xs: 2, md: 3 } }}
              initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={reduce ? undefined : { duration: 0.6, ease: 'easeOut', delay }}
              viewport={reduce ? undefined : { once: true, amount: 0.3 }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: -2, md: -1 },
                  top: 20,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent)',
                  boxShadow: 'var(--shadow-glow)',
                }}
              />
              <Box
                sx={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--surface)',
                  p: 3,
                  transition: 'transform 200ms ease, box-shadow 220ms ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'var(--shadow-glow)',
                  },
                }}
              >
                <Typography variant="subtitle1" component="h3" color="text.primary">
                  {exp.role} — {exp.company}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatRange(exp.start, exp.end, locale)} • {exp.location}
                </Typography>
                {exp.bullets.length > 0 && (
                  <Box component="ul" sx={{ mt: 1.5, ml: 0 }}>
                    {exp.bullets.map((b, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" color="text.secondary">
                          {b}
                        </Typography>
                      </li>
                    ))}
                  </Box>
                )}
              </Box>
            </MotionBox>
          );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
