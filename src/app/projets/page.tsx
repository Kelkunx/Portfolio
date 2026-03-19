import React from 'react';
import ProjectsPageContent from '../../components/ProjectsPageContent';
import StructuredData from '../../components/StructuredData';
import { projects as projectsFR } from '../../../lib/locales/fr/projects';
import { buildProjectsStructuredData } from '../../../lib/structured-data';

export default function ProjectsPage() {
  return (
    <>
      <StructuredData data={buildProjectsStructuredData(projectsFR)} />
      <ProjectsPageContent />
    </>
  );
}
