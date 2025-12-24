// app/page.tsx
'use client';
import React from 'react';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import LanguagesSection from '../components/LanguagesSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import CertificationsSection from '../components/CertificationsSection';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AnimatedSection from '../components/AnimatedSection';

export default function HomePage() {
  return (
    <>
      <AnimatedSection intent="showcase">
        <HeroSection />
      </AnimatedSection>

      <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 8, md: 12 } }}>
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <AnimatedSection>
            <SkillsSection />
          </AnimatedSection>

          <AnimatedSection>
            <LanguagesSection />
          </AnimatedSection>

          <AnimatedSection>
            <ExperienceSection />
          </AnimatedSection>

          <AnimatedSection>
            <EducationSection />
          </AnimatedSection>

          <AnimatedSection>
            <CertificationsSection />
          </AnimatedSection>
        </Box>
      </Container>
    </>
  );
}
