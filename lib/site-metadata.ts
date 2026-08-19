import type { Metadata } from 'next';

export const SITE_NAME = 'Léo JEGO — Portfolio';
export const SITE_URL = (process.env.SITE_URL ?? 'https://leo-jego.vercel.app').replace(/\/+$/, '');

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  socialTitle?: string;
  socialSubtitle?: string;
};

export function absoluteSiteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

function buildOgImageUrl(title: string, subtitle: string) {
  const imageUrl = new URL('/api/og', SITE_URL);
  imageUrl.searchParams.set('title', title);
  imageUrl.searchParams.set('subtitle', subtitle);

  const version = process.env.NEXT_PUBLIC_OG_VERSION;
  if (version) imageUrl.searchParams.set('v', version);

  return imageUrl.toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  socialTitle = `${title} — Léo JEGO`,
  socialSubtitle = description,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteSiteUrl(path);
  const ogImageUrl = buildOgImageUrl(socialTitle, socialSubtitle);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
