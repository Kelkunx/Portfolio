import React from 'react';
import Container from '@mui/material/Container';
import HeroSection from '../components/HeroSection';
import FeaturedProjectsSection from '../components/FeaturedProjectsSection';
import SkillsSection from '../components/SkillsSection';
import CareerHighlightsSection from '../components/CareerHighlightsSection';
import CvSnapshotSection from '../components/CvSnapshotSection';
import FinalCtaSection from '../components/FinalCtaSection';
import StructuredData from '../components/StructuredData';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { getFeaturedProjects } from '../../lib/content';
import { buildHomeStructuredData } from '../../lib/structured-data';

export default function HomePage() {
  const featuredProjects = getFeaturedProjects('fr', 3);

  return (
    <>
      <StructuredData data={buildHomeStructuredData(profileFR, featuredProjects)} />
      <HeroSection />

      <Container maxWidth="lg">
        <FeaturedProjectsSection />
        <SkillsSection variant="home" />
        <CareerHighlightsSection />
        <CvSnapshotSection />
        <FinalCtaSection />
      </Container>
    </>
  );
}
