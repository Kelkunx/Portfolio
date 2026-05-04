import { NextRequest, NextResponse } from 'next/server';

function acceptsMarkdown(request: NextRequest) {
  const accept = request.headers.get('accept') ?? '';

  return accept
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .some((entry) => {
      const [type, ...params] = entry.split(';').map((part) => part.trim());
      const q = params.find((param) => param.startsWith('q='));

      return type === 'text/markdown' && q !== 'q=0' && q !== 'q=0.0';
    });
}

function preferredLocale(request: NextRequest) {
  const language = request.headers.get('accept-language')?.toLowerCase() ?? '';
  return language.startsWith('en') ? 'en' : 'fr';
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
