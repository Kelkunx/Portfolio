import React from 'react';
import type { Metadata } from 'next';
import ProjectsPageContent from '../../components/ProjectsPageContent';
import StructuredData from '../../components/StructuredData';
import { getProjects } from '../../../lib/content';
import { buildProjectsStructuredData } from '../../../lib/structured-data';
import { buildPageMetadata } from '../../../lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Projets',
  description:
    'Découvrez les projets web de Léo JEGO : outils développeur, applications Shopify, interfaces métier, automatisation et IoT.',
  path: '/projets',
  socialSubtitle: 'Outils développeur, applications web, Shopify et IoT',
});

export default function ProjectsPage() {
  const projects = getProjects('fr');

  return (
    <>
      <StructuredData data={buildProjectsStructuredData(projects)} />
      <ProjectsPageContent />
    </>
  );
}
