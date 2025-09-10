// app/page.tsx
'use client';
import React from 'react';
import Container from '@mui/material/Container';
import HeroSection from '../components/HeroSection';
import SkillsSection from '../components/SkillsSection';
import LanguagesSection from '../components/LanguagesSection';
import ExperienceSection from '../components/ExperienceSection';
import EducationSection from '../components/EducationSection';
import CertificationsSection from '../components/CertificationsSection';
import Box from '@mui/material/Box';
import AnimatedSection from '../components/AnimatedSection';

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>

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
  );
}
