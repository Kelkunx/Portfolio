// src/components/ProjectCard.tsx
'use client';

import React from 'react';
import { motion, useReducedMotion, type Easing, type Variants } from 'framer-motion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from 'next/link';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useRouter } from 'next/navigation';
import { useLocale } from '../context/LocaleContext';
import type { Project } from '../../lib/locales/fr/projects';

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '"':
        return '&quot;';
      case "'":
        return '&apos;';
      default:
        return char;
    }
  });
}

function wrapText(value: string, maxChars: number) {
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';

  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= maxChars) {
      line = next;
      return;
    }
    if (line) lines.push(line);
    line = word;
  });

  if (line) lines.push(line);
  return lines;
}

function truncateLine(value: string, maxChars: number) {
  if (value.length <= maxChars) return value;
  return `${value.slice(0, Math.max(0, maxChars - 3)).trimEnd()}...`;
}

function placeholderDataUrl(title: string, locale: 'fr' | 'en', w = 1200, h = 675) {
  const rawTitle = title.trim();
  const subtitle = locale === 'fr' ? 'Apercu indisponible' : 'Preview unavailable';
  const maxChars = rawTitle.length > 42 ? 20 : 26;
  const lines = wrapText(rawTitle, maxChars);
  const titleLines = lines.slice(0, 2);
  if (lines.length > 2) {
    titleLines[1] = truncateLine(lines.slice(1).join(' '), maxChars);
  }
  const baseTitleSize = Math.round(Math.max(40, Math.min(72, Math.min(w * 0.06, h * 0.12))));
  const titleSize = titleLines.length > 1 ? Math.round(baseTitleSize * 0.82) : baseTitleSize;
  const lineHeight = Math.round(titleSize * 1.2);
  const titleY = Math.round(h * 0.5);
  const firstDy = titleLines.length > 1 ? -Math.round(lineHeight / 2) : 0;
  const titleTspans = titleLines
    .map((line, index) => `<tspan x='50%' dy='${index === 0 ? firstDy : lineHeight}'>${escapeXml(line)}</tspan>`)
    .join('');
  const subtitleSize = Math.round(Math.max(16, Math.min(30, Math.min(w * 0.03, h * 0.06))));
  const subtitleY = Math.round(titleY + (titleLines.length > 1 ? lineHeight : lineHeight * 0.9));
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
    <defs>
      <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#1a1b26'/>
        <stop offset='100%' stop-color='#16161e'/>
      </linearGradient>
      <radialGradient id='glow1' cx='85%' cy='10%' r='60%'>
        <stop offset='0%' stop-color='#7dcfff' stop-opacity='0.25'/>
        <stop offset='100%' stop-color='#7dcfff' stop-opacity='0'/>
      </radialGradient>
      <radialGradient id='glow2' cx='15%' cy='90%' r='55%'>
        <stop offset='0%' stop-color='#bb9af7' stop-opacity='0.2'/>
        <stop offset='100%' stop-color='#bb9af7' stop-opacity='0'/>
      </radialGradient>
      <pattern id='grid' width='64' height='64' patternUnits='userSpaceOnUse'>
        <path d='M 64 0 L 0 0 0 64' fill='none' stroke='#3b4261' stroke-width='1' opacity='0.35'/>
      </pattern>
    </defs>
    <rect width='100%' height='100%' fill='url(#bg)'/>
    <rect width='100%' height='100%' fill='url(#grid)'/>
    <rect width='100%' height='100%' fill='url(#glow1)'/>
    <rect width='100%' height='100%' fill='url(#glow2)'/>
    <rect x='72' y='72' width='${w - 144}' height='${h - 144}' rx='28' fill='#24283b' fill-opacity='0.6' stroke='#3b4261'/>
    <text x='50%' y='${titleY}' text-anchor='middle' dominant-baseline='middle' fill='#c0caf5' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${titleSize}' font-weight='600'>${titleTspans}</text>
    <text x='50%' y='${subtitleY}' text-anchor='middle' dominant-baseline='middle' fill='#a9b1d6' font-family='IBM Plex Sans, Arial, sans-serif' font-size='${subtitleSize}'>${subtitle}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

type ProjectCardProps = Project & { revealDelay?: number };

export default function ProjectCard({
  slug,
  title,
  short,
  imageSrc,
  imageAlt,
  tech,
  demoUrl,
  repoUrl,
  revealDelay = 0,
}: ProjectCardProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const reduce = useReducedMotion();

  const img = imageSrc && imageSrc.trim() !== '' ? imageSrc : placeholderDataUrl(title, locale);
  const chipColors = ['info', 'secondary', 'success', 'warning'] as const;

  const handleCardActivate = (e: React.MouseEvent | React.KeyboardEvent) => {
    // If the event originated from a button/link inside the card, ignore it.
    const target = (e.target as HTMLElement) || null;
    if (target && target.closest('a,button')) return;

    // Navigate to internal project page
    router.push(`/projets/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardActivate(e);
    }
  };

  const ease: Easing = [0.22, 1, 0.36, 1];
  const baseVariants: Variants = {
    hidden: { opacity: 0, y: 18, scale: 0.98, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease, delay: revealDelay },
    },
    hover: { y: -6, scale: 1.02, transition: { type: 'spring' as const, stiffness: 280, damping: 26 } },
  };
  const reducedVariants: Variants = {
    hidden: { opacity: 1, y: 0, scale: 1, filter: 'none' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'none' },
    hover: { y: 0, scale: 1 },
  };
  const variants = reduce ? reducedVariants : baseVariants;

  return (
    <motion.div
      variants={variants}
      initial={reduce ? false : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      whileHover={reduce ? undefined : 'hover'}
      viewport={reduce ? undefined : { once: true, amount: 0.3 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          cursor: 'pointer',
          position: 'relative',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          transition: 'box-shadow 220ms ease, transform 220ms ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-120% -60%',
            background: 'linear-gradient(120deg, transparent 40%, var(--ring) 50%, transparent 60%)',
            transform: 'translateX(-55%)',
            opacity: 0,
            transition: 'transform 800ms ease, opacity 500ms ease',
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '2px',
            background: 'var(--grad-border)',
            opacity: 0.65,
            pointerEvents: 'none',
          },
          '&:focus-visible': {
            outline: (theme) => `3px solid ${theme.palette.primary.main}`,
            outlineOffset: 4,
          },
          '&:hover': {
            boxShadow: 'var(--shadow-glow)',
            borderColor: 'var(--ring)',
          },
          '&:hover::before': {
            transform: 'translateX(55%)',
            opacity: 1,
          },
          '&:hover img': {
            transform: 'scale(1.03)',
          },
        }}
        role="link"
        tabIndex={0}
        aria-label={`${locale === 'en' ? 'Open project' : 'Ouvrir le projet'}: ${title}`}
        onClick={handleCardActivate}
        onKeyDown={handleKeyDown}
      >
        {/* Image */}
        <Box
          sx={{
            aspectRatio: '16/9',
            overflow: 'hidden',
            width: '100%',
            backgroundColor: 'var(--surface-2)',
          }}
        >
          <CardMedia
            component="img"
            image={img}
            alt={imageAlt || title}
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 260ms ease',
            }}
          />
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1, pt: 3 }}>
          <Typography component="h3" variant="h6" gutterBottom>
            {title}
          </Typography>

          {short && (
            <Typography variant="body2" color="text.secondary" paragraph>
              {short}
            </Typography>
          )}

          {tech && tech.length > 0 && (
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 1 }}>
              {tech.map((t, idx) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  variant="outlined"
                  color={chipColors[idx % chipColors.length]}
                  aria-label={`${locale === 'en' ? 'Technology' : 'Technologie'} ${t}`}
                />
              ))}
            </Stack>
          )}
        </CardContent>

        {/* Actions (buttons are real anchors so they won't trigger the card navigation) */}
        <CardActions sx={{ justifyContent: 'flex-end', flexWrap: 'wrap', gap: 1, px: 2, pb: 2 }}>
          <Button
            size="small"
            onClick={(e) => {
              // stop propagation so the card onClick doesn't activate
              e.stopPropagation();
              router.push(`/projets/${slug}`);
            }}
            startIcon={<LaunchIcon />}
            sx={{ textTransform: 'none', '&:hover': { transform: 'translateY(-3px)' } }}
            aria-label={locale === 'en' ? `View details for ${title}` : `Voir les détails de ${title}`}
          >
            {locale === 'en' ? 'Details' : 'Détails'}
          </Button>

          {demoUrl && (
            <Button
              size="small"
              component={Link}
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<LaunchIcon />}
              onClick={(e) => e.stopPropagation()}
              sx={{ textTransform: 'none', '&:hover': { transform: 'translateY(-3px)' } }}
              aria-label={locale === 'en' ? `Open demo for ${title}` : `Ouvrir la démo de ${title}`}
            >
              {locale === 'en' ? 'Demo' : 'Démo'}
            </Button>
          )}

          {repoUrl && (
            <Button
              size="small"
              component={Link}
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
              onClick={(e) => e.stopPropagation()}
              sx={{ textTransform: 'none', '&:hover': { transform: 'translateY(-3px)' } }}
              aria-label={locale === 'en' ? `View source code for ${title}` : `Voir le code de ${title}`}
            >
              {locale === 'en' ? 'Code' : 'Code'}
            </Button>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
}
