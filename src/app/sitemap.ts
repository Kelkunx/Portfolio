import { MetadataRoute } from 'next';
import { projects } from '../../lib/locales/fr/projects';
import { absoluteSiteUrl } from '../../lib/site-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteSiteUrl('/'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: absoluteSiteUrl('/projets'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: absoluteSiteUrl('/cv'),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: absoluteSiteUrl('/contact'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteSiteUrl(`/projets/${project.slug}`),
    changeFrequency: project.status === 'En cours' ? 'weekly' : 'monthly',
    priority: 0.7,
  }));

  return [...mainRoutes, ...projectRoutes];
}
