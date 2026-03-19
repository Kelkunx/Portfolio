import React from 'react';
import ProjectDetailPageContent from '../../../components/ProjectDetailPageContent';
import StructuredData from '../../../components/StructuredData';
import { profile as profileFR } from '../../../../lib/locales/fr/profile';
import { projects as projectsFR } from '../../../../lib/locales/fr/projects';
import { buildProjectStructuredData } from '../../../../lib/structured-data';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsFR.find((item) => item.slug === slug);

  return (
    <>
      {project ? <StructuredData data={buildProjectStructuredData(project, profileFR)} /> : null}
      <ProjectDetailPageContent slug={slug} />
    </>
  );
}
