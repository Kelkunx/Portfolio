import React from 'react';
import Container from '@mui/material/Container';
import AnimatedSection from '../components/AnimatedSection';
import HeroSection from '../components/HeroSection';
import FeaturedProjectsSection from '../components/FeaturedProjectsSection';
import SkillsSection from '../components/SkillsSection';
import CareerHighlightsSection from '../components/CareerHighlightsSection';
import CvSnapshotSection from '../components/CvSnapshotSection';
import FinalCtaSection from '../components/FinalCtaSection';

export default function HomePage() {
  return (
    <>
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
