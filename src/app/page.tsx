import React from 'react';
import Container from '@mui/material/Container';
import AnimatedSection from '../components/AnimatedSection';
import HeroSection from '../components/HeroSection';
import FeaturedProjectsSection from '../components/FeaturedProjectsSection';
import SkillsSection from '../components/SkillsSection';
import CareerHighlightsSection from '../components/CareerHighlightsSection';
import CvSnapshotSection from '../components/CvSnapshotSection';
import FinalCtaSection from '../components/FinalCtaSection';
import StructuredData from '../components/StructuredData';
import { profile as profileFR } from '../../lib/locales/fr/profile';
import { projects as projectsFR } from '../../lib/locales/fr/projects';
import { buildHomeStructuredData } from '../../lib/structured-data';

export default function HomePage() {
  const featuredProjects = projectsFR.filter((project) => project.featured).slice(0, 3);

  return (
    <>
      <StructuredData data={buildHomeStructuredData(profileFR, featuredProjects)} />
      <HeroSection />

      <Container maxWidth="lg">
        <AnimatedSection>
          <FeaturedProjectsSection />
        </AnimatedSection>

        <AnimatedSection>
          <SkillsSection variant="home" />
        </AnimatedSection>

        <AnimatedSection>
          <CareerHighlightsSection />
        </AnimatedSection>

        <AnimatedSection>
          <CvSnapshotSection />
        </AnimatedSection>

        <AnimatedSection>
          <FinalCtaSection />
        </AnimatedSection>
      </Container>
    </>
  );
}
