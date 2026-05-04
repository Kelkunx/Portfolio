import { NextResponse } from 'next/server';
import type { ContentLocale } from '../../../../lib/content';
import { buildMarkdownForPath, estimateMarkdownTokens } from '../../../../lib/markdown-content';

export const dynamic = 'force-dynamic';

function getLocale(value: string | null): ContentLocale {
  return value === 'en' ? 'en' : 'fr';
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const pathname = request.headers.get('x-markdown-path') ?? url.searchParams.get('path') ?? '/';
  const locale = getLocale(request.headers.get('x-markdown-locale') ?? url.searchParams.get('locale'));
  const siteUrl = `${url.protocol}//${url.host}`;
  const document = buildMarkdownForPath(pathname, locale, siteUrl);

  if (!document) {
    return new NextResponse('# Page introuvable\n', {
      status: 404,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
        'Cache-Control': 'no-store',
        'x-markdown-tokens': '4',
      },
    });
  }

  return new NextResponse(`${document.body.trim()}\n`, {
    status: document.status ?? 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'x-markdown-tokens': String(estimateMarkdownTokens(document.body)),
      'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
    },
  });
}
