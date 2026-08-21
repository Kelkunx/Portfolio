'use client';

import ArrowOutward from '@mui/icons-material/ArrowOutward';
import BusinessCenterRounded from '@mui/icons-material/BusinessCenterRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import SchoolRounded from '@mui/icons-material/SchoolRounded';
import WorkspacePremiumRounded from '@mui/icons-material/WorkspacePremiumRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getProfile } from '../../../lib/content';
import type { ExperienceItem } from '../../../lib/content-types';
import LocalSectionNav, { type LocalSectionNavItem } from '../../components/LocalSectionNav';
import SiteContainer from '../../components/SiteContainer';
import TechStackChips from '../../components/TechStackChips';
import { useLocale } from '../../context/LocaleContext';

type CvSectionProps = {
  id: string;
  title: string;
  icon: ReactNode;
  tone: string;
  children: ReactNode;
};

const experienceTones = [
  { color: 'var(--purple)', tint: 'rgba(187, 154, 247, 0.045)' },
  { color: 'var(--cyan)', tint: 'rgba(125, 207, 255, 0.045)' },
  { color: 'var(--green)', tint: 'rgba(158, 206, 106, 0.045)' },
];

const skillTones = [
  { color: 'var(--cyan)', tint: 'rgba(125, 207, 255, 0.04)' },
  { color: 'var(--purple)', tint: 'rgba(187, 154, 247, 0.04)' },
  { color: 'var(--green)', tint: 'rgba(158, 206, 106, 0.04)' },
  { color: 'var(--orange)', tint: 'rgba(255, 158, 100, 0.04)' },
];

function formatExperienceRange(experience: ExperienceItem, locale: 'fr' | 'en') {
  const present = locale === 'fr' ? 'présent' : 'present';
  return `${experience.start} — ${experience.end || present}`;
}

function CvSection({ id, title, icon, tone, children }: CvSectionProps) {
  return (
    <Box component="section" id={id} className="cv-section">
      <Box className="cv-section-heading" sx={{ '--cv-section-tone': tone }}>
        <Box component="span" className="cv-section-icon" aria-hidden="true">
          {icon}
        </Box>
        <Typography component="h2" variant="h4" sx={{ color: 'var(--text)' }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

export default function CvPage() {
  const { locale } = useLocale();
  const profile = getProfile(locale);
  const techExperiences = profile.experiences.filter((experience) => experience.kind !== 'other');
  const supportingExperiences = profile.experiences.filter((experience) => experience.kind === 'other');
  const supportingExperienceGroups = [
    ...supportingExperiences
      .reduce((groups, experience) => {
        const key = `${experience.role}-${experience.company}`;
        const period = formatExperienceRange(experience, locale);
        const existingGroup = groups.get(key);

        if (existingGroup) {
          existingGroup.periods.push(period);
        } else {
          groups.set(key, {
            company: experience.company,
            role: experience.role,
            periods: [period],
          });
        }

        return groups;
      }, new Map<string, { company: string; role: string; periods: string[] }>())
      .values(),
  ];
  const navigationItems: LocalSectionNavItem[] = [
    { id: 'experience', label: locale === 'fr' ? 'Expériences' : 'Experience' },
    { id: 'skills', label: locale === 'fr' ? 'Compétences' : 'Skills' },
    { id: 'education', label: locale === 'fr' ? 'Formation' : 'Education' },
    {
      id: 'qualifications',
      label: locale === 'fr' ? 'Langues & certifications' : 'Languages & certifications',
    },
  ];

  return (
    <SiteContainer sx={{ py: { xs: 6, md: 9 } }}>
      <Box component="header" className="cv-header">
        <Stack spacing={2.25}>
          <Box>
            <Typography
              component="h1"
              variant="h2"
              sx={{ color: 'var(--text)', fontSize: { xs: '2.75rem', sm: '3.5rem' }, mb: 0.75 }}
            >
              {profile.name}
            </Typography>
            <Typography component="p" variant="h4" sx={{ color: 'var(--cyan)', m: 0 }}>
              {profile.title}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'var(--text-2)', maxWidth: '68ch', lineHeight: 1.85 }}>
            {profile.summary}
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} sx={{ alignItems: { sm: 'flex-start' } }}>
            <Button component="a" href={profile.cvPdf} target="_blank" rel="noopener noreferrer" variant="contained">
              {locale === 'fr' ? 'Télécharger le CV PDF' : 'Download PDF CV'}
            </Button>
            <Button component={Link} href="/contact" variant="outlined">
              {locale === 'fr' ? 'Me contacter' : 'Contact me'}
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={3} className="cv-header-meta">
          <Box>
            <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 0.5 }}>
              {locale === 'fr' ? 'Disponibilité' : 'Availability'}
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--green)', fontWeight: 600, lineHeight: 1.6 }}>
              {profile.availability}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 0.5 }}>
              {locale === 'fr' ? 'Localisation' : 'Location'}
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--text)' }}>
              {profile.location}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 1 }}>
              {locale === 'fr' ? 'Stack principale' : 'Primary stack'}
            </Typography>
            <TechStackChips items={profile.primaryStack} />
          </Box>
        </Stack>
      </Box>

      <Box className="editorial-document-layout cv-document-layout">
        <LocalSectionNav items={navigationItems} ariaLabel={locale === 'fr' ? 'Sommaire du CV' : 'Resume contents'} />

        <Box>
          <CvSection
            id="experience"
            title={locale === 'fr' ? 'Expériences' : 'Experience'}
            icon={<BusinessCenterRounded />}
            tone="var(--green)"
          >
            <Box sx={{ borderBottom: '1px solid var(--border)' }}>
              {techExperiences.map((experience, index) => {
                const tone = experienceTones[index % experienceTones.length];

                return (
                  <Box
                    component="article"
                    key={`${experience.company}-${experience.start}`}
                    className="cv-experience-row"
                    tabIndex={0}
                    aria-label={`${experience.role}, ${experience.company}`}
                    sx={{ '--experience-tone': tone.color, '--experience-tint': tone.tint }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ color: 'var(--experience-tone)', fontWeight: 700 }}>
                        {formatExperienceRange(experience, locale)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--muted)', mt: 0.5 }}>
                        {experience.location}
                      </Typography>
                    </Box>

                    <Stack spacing={2.25}>
                      <Box>
                        <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 0.5 }}>
                          {experience.role}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'var(--experience-tone)', fontWeight: 700 }}>
                          {experience.company}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ color: 'var(--text-2)', lineHeight: 1.8, maxWidth: '72ch' }}>
                        {experience.summary}
                      </Typography>
                      <Box component="ul" className="cv-experience-list">
                        {experience.bullets.map((bullet) => (
                          <Typography component="li" key={bullet} variant="body2" sx={{ color: 'var(--text-2)', lineHeight: 1.75 }}>
                            {bullet}
                          </Typography>
                        ))}
                      </Box>
                      {experience.technologies && <TechStackChips items={experience.technologies} />}
                    </Stack>
                  </Box>
                );
              })}
            </Box>

            {supportingExperienceGroups.length > 0 && (
              <Box sx={{ pt: 3.5 }}>
                <Typography component="h3" variant="h6" sx={{ color: 'var(--text)', mb: 1.5 }}>
                  {locale === 'fr' ? 'Autres expériences' : 'Other experience'}
                </Typography>
                {supportingExperienceGroups.map((experience) => (
                  <Box key={`${experience.company}-${experience.role}`} className="cv-supporting-experience">
                    <Typography variant="body2" sx={{ color: 'var(--text-2)' }}>
                      {experience.role} — {experience.company}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
                      {experience.periods.join(' • ')}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </CvSection>

          <CvSection
            id="skills"
            title={locale === 'fr' ? 'Compétences' : 'Skills'}
            icon={<CodeRounded />}
            tone="var(--purple)"
          >
            <Box className="cv-skills-grid">
              {profile.skills.map((group, index) => {
                const tone = skillTones[index % skillTones.length];

                return (
                  <Box
                    key={group.category}
                    className="cv-skill-group"
                    sx={{ '--skill-tone': tone.color, '--skill-tint': tone.tint }}
                  >
                    <Typography component="h3" variant="h6" sx={{ color: 'var(--skill-tone)' }}>
                      {group.category}
                    </Typography>
                    <TechStackChips items={group.items} />
                  </Box>
                );
              })}
            </Box>
          </CvSection>

          <CvSection
            id="education"
            title={locale === 'fr' ? 'Formation' : 'Education'}
            icon={<SchoolRounded />}
            tone="var(--orange)"
          >
            <Box sx={{ borderBottom: '1px solid var(--border)' }}>
              {profile.education.map((education) => (
                <Box component="article" key={`${education.school}-${education.degree}`} className="cv-education-row">
                  <Typography variant="body2" sx={{ color: 'var(--orange)', fontWeight: 700 }}>
                    {education.start}
                    {education.end ? ` — ${education.end}` : ''}
                  </Typography>
                  <Box>
                    <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 0.5 }}>
                      {education.degree}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'var(--text-2)' }}>
                      {education.school}
                    </Typography>
                    {education.notes && (
                      <Typography variant="body2" sx={{ color: 'var(--muted)', mt: 1.25, lineHeight: 1.7 }}>
                        {education.notes.join(' • ')}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </CvSection>

          <CvSection
            id="qualifications"
            title={locale === 'fr' ? 'Langues & certifications' : 'Languages & certifications'}
            icon={<WorkspacePremiumRounded />}
            tone="var(--cyan)"
          >
            <Grid container spacing={{ xs: 6, md: 8 }}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 2 }}>
                  {locale === 'fr' ? 'Langues' : 'Languages'}
                </Typography>
                <Box sx={{ borderBottom: '1px solid var(--border)' }}>
                  {profile.languages.map((language) => (
                    <Box key={language.name} className="cv-qualification-row">
                      <Typography variant="body1" sx={{ color: 'var(--text)', fontWeight: 600 }}>
                        {language.name}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'var(--cyan)', fontWeight: 700 }}>
                        {language.level}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 2 }}>
                  {locale === 'fr' ? 'Certifications' : 'Certifications'}
                </Typography>
                <Box sx={{ borderBottom: '1px solid var(--border)' }}>
                  {profile.certifications.map((certification) => (
                    <Box key={`${certification.name}-${certification.date}`} className="cv-certification-row">
                      <Box>
                        {certification.url ? (
                          <Box
                            component="a"
                            href={certification.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cv-certification-link"
                          >
                            {certification.name}
                            <ArrowOutward fontSize="small" aria-hidden="true" />
                          </Box>
                        ) : (
                          <Typography variant="body1" sx={{ color: 'var(--text)', fontWeight: 600 }}>
                            {certification.name}
                          </Typography>
                        )}
                        <Typography variant="body2" sx={{ color: 'var(--text-2)', mt: 0.5 }}>
                          {[certification.issuer, certification.score, certification.date].filter(Boolean).join(' • ')}
                        </Typography>
                      </Box>
                      {certification.note && (
                        <Typography variant="body2" sx={{ color: 'var(--muted)', lineHeight: 1.65 }}>
                          {certification.note}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CvSection>
        </Box>
      </Box>
    </SiteContainer>
  );
}
