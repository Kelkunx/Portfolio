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
import { ArrowOutward, GitHub } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useLocale } from '../context/LocaleContext';
import type { Project } from '../../lib/content-types';
import { projectPlaceholderDataUrl } from '../../lib/project-placeholder';

type ProjectCardProps = Project & {
  revealDelay?: number;
  compact?: boolean;
};

const MotionCard = motion(Card);

function formatDate(date?: string, locale = 'fr') {
  if (!date) return undefined;
  const value = new Date(date);
  if (Number.isNaN(value.getTime())) return date;

  return value.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export default function ProjectCard({
  slug,
  title,
  short,
  imageSrc,
  imageAlt,
  tech,
  date,
  status,
  results,
  links,
  revealDelay = 0,
  compact = false,
}: ProjectCardProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const ease: Easing = [0.22, 1, 0.36, 1];

  const animationVariants: Variants = prefersReducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
        hover: { y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 18 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease, delay: revealDelay },
        },
        hover: {
          y: -3,
          transition: { duration: 0.2, ease },
        },
      };

  const externalLinks = links.filter((item) => item.type === 'demo' || item.type === 'repo');
  const highlightedResults = results.slice(0, compact ? 1 : 2);
  const dateLabel = formatDate(date, locale);
  const cardImageSrc = imageSrc && imageSrc.trim() !== '' ? imageSrc : projectPlaceholderDataUrl(title, locale);
  const cardImageAlt = imageAlt || title;
  const stackTone = compact ? 'rgba(187, 154, 247, 0.1)' : 'rgba(125, 207, 255, 0.1)';
  const stackBorder = compact ? 'rgba(187, 154, 247, 0.3)' : 'rgba(125, 207, 255, 0.3)';

  const handleActivate = (event: React.MouseEvent | React.KeyboardEvent) => {
    const target = event.target as HTMLElement | null;
    // Let buttons and links keep their native behaviour inside the clickable card.
    if (target?.closest('a,button')) return;
    router.push(`/projets/${slug}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleActivate(event);
    }
  };

  return (
    <MotionCard
      variants={animationVariants}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      whileHover={prefersReducedMotion ? undefined : 'hover'}
      viewport={prefersReducedMotion ? undefined : { once: true, amount: 0.25 }}
      role="link"
      tabIndex={0}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      aria-label={`${locale === 'fr' ? 'Ouvrir le projet' : 'Open project'} ${title}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-soft)',
        transition: 'border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease',
        '&:hover': {
          borderColor: 'rgba(121, 168, 255, 0.42)',
          boxShadow: '0 8px 18px rgba(10, 15, 30, 0.22)',
        },
        '&:hover img': {
          transform: 'scale(1.015)',
        },
      }}
    >
      <Box
        sx={{
          aspectRatio: compact ? '16 / 9' : '16 / 10',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'var(--surface-2)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <CardMedia
          component="img"
          image={cardImageSrc}
          alt={cardImageAlt}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 220ms ease',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'var(--text-2)', fontWeight: 600 }}>
              {dateLabel ? `${status} • ${dateLabel}` : status}
            </Typography>
          </Box>

          <Box>
            <Typography component="h3" variant="h5" sx={{ color: 'var(--text)', mb: 0.75 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
              {short}
            </Typography>
          </Box>

          <Stack spacing={1}>
            {highlightedResults.map((item) => (
              <Box
                key={`${item.value}-${item.label}`}
                sx={{
                  borderLeft: '2px solid var(--cyan)',
                  pl: 1.5,
                }}
              >
                <Typography variant="body2" sx={{ color: 'var(--text)', fontWeight: 600, mb: 0.35 }}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {tech.slice(0, compact ? 3 : 4).map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                variant="outlined"
                sx={{
                  color: 'var(--text)',
                  borderColor: stackBorder,
                  backgroundColor: stackTone,
                }}
              />
            ))}
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 3, pb: 3, pt: 0, gap: 1, flexWrap: 'wrap' }}>
        <Button
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            router.push(`/projets/${slug}`);
          }}
          endIcon={<ArrowOutward />}
        >
          {locale === 'fr' ? 'Détails' : 'Details'}
        </Button>

        {externalLinks.slice(0, compact ? 1 : 2).map((link) => (
          <Button
            key={link.url}
            size="small"
            component={Link}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            startIcon={link.type === 'repo' ? <GitHub fontSize="small" /> : undefined}
          >
            {link.label}
          </Button>
        ))}
      </CardActions>
    </MotionCard>
  );
}
