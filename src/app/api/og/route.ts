import { ImageResponse } from 'next/og';
import React from 'react';

export const runtime = 'edge';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get('title') ?? 'Léo JEGO';
  const subtitle = url.searchParams.get('subtitle') ?? 'Portfolio — Développeur full-stack';

  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          width: '1200px',
          height: '630px',
          padding: 56,
          background: 'linear-gradient(135deg, #0b1118 0%, #101925 100%)',
          color: '#e7eef7',
          fontFamily: '"Space Grotesk", "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", Arial',
          position: 'relative',
        },
      },
      React.createElement('div', {
        style: {
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 85% 10%, rgba(121,168,255,0.22), transparent 36%), radial-gradient(circle at 10% 12%, rgba(199,164,106,0.16), transparent 28%)',
        },
      }),
      React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            border: '1px solid rgba(121,168,255,0.18)',
            borderRadius: 30,
            padding: 40,
            background: 'rgba(19,29,41,0.72)',
          },
        },
        React.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column', gap: 16 } },
          React.createElement(
            'div',
            {
              style: {
                fontSize: 22,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#b8c4d4',
              },
            },
            'Portfolio / CV dynamique'
          ),
          React.createElement(
            'h1',
            {
              style: {
                margin: 0,
                maxWidth: 820,
                fontSize: 64,
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: '-0.04em',
              },
            },
            title
          ),
          React.createElement(
            'p',
            {
              style: {
                margin: 0,
                maxWidth: 820,
                fontSize: 28,
                lineHeight: 1.4,
                color: '#b8c4d4',
              },
            },
            subtitle
          )
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              gap: 16,
              alignItems: 'center',
            },
          },
          ['React / Next.js / NestJS', 'Outils métier', 'TOEIC 990 / 990'].map((label) =>
            React.createElement(
              'div',
              {
                key: label,
                style: {
                  border: '1px solid rgba(121,168,255,0.18)',
                  borderRadius: 999,
                  padding: '12px 18px',
                  fontSize: 20,
                  color: '#e7eef7',
                  background: 'rgba(255,255,255,0.03)',
                },
              },
              label
            )
          )
        )
      )
    ),
    { width: 1200, height: 630 }
  );
}
