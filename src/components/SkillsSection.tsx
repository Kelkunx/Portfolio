'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useLocale } from '../context/LocaleContext';
import { getProfile } from '../../lib/content';
import SiteContainer from './SiteContainer';
import TechStackChips from './TechStackChips';

export default function SkillsSection() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const tones = [
    { color: 'var(--cyan)', background: 'rgba(125, 207, 255, 0.045)' },
    { color: 'var(--green)', background: 'rgba(158, 206, 106, 0.045)' },
    { color: 'var(--purple)', background: 'rgba(187, 154, 247, 0.045)' },
    { color: 'var(--orange)', background: 'rgba(255, 158, 100, 0.045)' },
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 }, borderTop: '1px solid var(--border)' }}>
      <SiteContainer>
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography component="h2" variant="h3" sx={{ color: 'var(--text)', mb: 1 }}>
            {locale === 'fr' ? "Ce que j'apporte" : 'What I bring'}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '70ch' }}>
            {locale === 'fr'
              ? 'Un profil full-stack attentif à la clarté, à la logique métier et à la qualité de livraison.'
              : 'A full-stack profile focused on clarity, business logic and delivery quality.'}
          </Typography>
        </Box>

        <Box>
          {profile.valuePillars.map((pillar, index) => {
            const tone = tones[index % tones.length];
            const isOffset = index % 2 === 1;

            return (
              <Box
                key={pillar.title}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '44px minmax(0, 1fr)',
                    md: '64px minmax(160px, 1.5fr) minmax(260px, 3fr) minmax(280px, 2.4fr)',
                  },
                  columnGap: { xs: 1.5, md: 3 },
                  rowGap: { xs: 1.25, md: 0 },
                  alignItems: 'center',
                  width: { lg: 'calc(100% - 64px)' },
                  ml: { lg: isOffset ? 8 : 0 },
                  mr: { lg: isOffset ? 0 : 8 },
                  px: { xs: 1, md: 2 },
                  py: { xs: 2.5, md: 2.75 },
                  borderTop: '1px solid var(--border)',
                  transition: 'background-color 160ms ease',
                  '&:hover': { backgroundColor: tone.background },
                }}
              >
                <Typography
                  aria-hidden="true"
                  variant="h6"
                  sx={{ color: tone.color, borderLeft: `2px solid ${tone.color}`, pl: 1.25 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </Typography>
                <Typography component="h3" variant="h6" sx={{ color: 'var(--text)' }}>
                  {pillar.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    gridColumn: { xs: '2', md: 'auto' },
                    color: 'var(--text-2)',
                    lineHeight: 1.7,
                  }}
                >
                  {pillar.description}
                </Typography>
                <Box sx={{ gridColumn: { xs: '2', md: 'auto' } }}>
                  <TechStackChips items={pillar.tools} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </SiteContainer>
    </Box>
  );
}
