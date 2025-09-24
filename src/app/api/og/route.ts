import { ImageResponse } from 'next/og';
import React from 'react';

export const runtime = 'edge';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get('title') ?? 'Léo JEGO';
  const subtitle = url.searchParams.get('subtitle') ?? 'Portfolio — Développeur Fullstack';

  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          width: '1200px',
          height: '630px',
          padding: 48,
          background: '#eef2ff',
          fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
        },
      },
      React.createElement('h1', { style: { fontSize: 52, fontWeight: 800, color: '#1f2937' } }, title),
      React.createElement('p', { style: { fontSize: 20, color: '#1f2937' } }, subtitle)
    ),
    { width: 1200, height: 630 }
  );
}
