import type { Metadata } from 'next';
import { buildPageMetadata } from '../../../lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'CV',
  description:
    'CV de Léo JEGO, développeur full-stack : expériences, compétences techniques, formations, certifications et langues.',
  path: '/cv',
  socialSubtitle: 'Expériences, compétences, formations et certifications',
});

export default function CvLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
