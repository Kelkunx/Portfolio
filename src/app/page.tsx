// app/page.tsx (ajoute l'import et le composant)
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

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <HeroSection />
      <Box component="section">
        <SkillsSection />
        <LanguagesSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
      </Box>
    </Container>
  );
}
