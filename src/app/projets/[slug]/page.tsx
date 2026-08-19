import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetailPageContent from '../../../components/ProjectDetailPageContent';
import StructuredData from '../../../components/StructuredData';
import { profile as profileFR } from '../../../../lib/locales/fr/profile';
import { getProjects } from '../../../../lib/content';
import { buildProjectStructuredData } from '../../../../lib/structured-data';
import { buildPageMetadata } from '../../../../lib/site-metadata';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const projectsFR = getProjects('fr');

export function generateStaticParams() {
  return projectsFR.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsFR.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: 'Projet introuvable',
      robots: { index: false, follow: false },
    };
  }

  return buildPageMetadata({
    title: project.title,
    description: project.description,
    path: `/projets/${project.slug}`,
    socialSubtitle: project.short,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsFR.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <>
      <StructuredData data={buildProjectStructuredData(project, profileFR)} />
      <ProjectDetailPageContent slug={slug} />
    </>
  );
}
