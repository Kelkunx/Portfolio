import { NextRequest, NextResponse } from 'next/server';

function acceptsMarkdown(request: NextRequest) {
  const accept = request.headers.get('accept') ?? '';

  return accept
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .some((entry) => {
      const [type, ...params] = entry.split(';').map((part) => part.trim());
      const qualityParameter = params.find((param) => param.startsWith('q='));
      const quality = qualityParameter ? Number(qualityParameter.slice(2)) : 1;

      return type === 'text/markdown' && Number.isFinite(quality) && quality > 0;
    });
}

function preferredLocale(request: NextRequest) {
  const language = request.headers.get('accept-language')?.toLowerCase() ?? '';

  const preferredLanguage = language
    .split(',')
    .map((entry, index) => {
      const [tag, ...params] = entry.split(';').map((part) => part.trim());
      const qualityParameter = params.find((param) => param.startsWith('q='));
      const quality = qualityParameter ? Number(qualityParameter.slice(2)) : 1;

      return { locale: tag.split('-')[0], quality, index };
    })
    .filter(({ locale, quality }) =>
      (locale === 'fr' || locale === 'en') && Number.isFinite(quality) && quality > 0,
    )
    .sort((a, b) => b.quality - a.quality || a.index - b.index)[0];

  return preferredLanguage?.locale === 'en' ? 'en' : 'fr';
}

function shouldSkip(pathname: string) {
  return (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname === '/favicon.ico' ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    /\.[a-z0-9]+$/i.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!acceptsMarkdown(request) || shouldSkip(pathname)) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = '/api/markdown';
  rewriteUrl.search = '';
  rewriteUrl.searchParams.set('path', pathname);
  rewriteUrl.searchParams.set('locale', preferredLocale(request));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-markdown-path', pathname);
  requestHeaders.set('x-markdown-locale', preferredLocale(request));

  return NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/', '/projets/:path*', '/cv', '/contact'],
};
