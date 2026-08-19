import type { Metadata } from 'next';
import { buildPageMetadata } from '../../../lib/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact',
  description:
    'Contactez Léo JEGO pour échanger autour d’un poste de développeur full-stack, frontend ou backend.',
  path: '/contact',
  socialSubtitle: 'Email, LinkedIn, GitHub et CV',
});

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
