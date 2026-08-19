'use client';

import { motion, useReducedMotion, type Easing } from 'framer-motion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowOutward, GitHub } from '@mui/icons-material';
import { useLocale } from '../context/LocaleContext';
import {
  formatProjectPeriod,
  getProjectCategoryLabel,
  getProjectStatusLabel,
} from '../../lib/content';
import type { Project } from '../../lib/content-types';
import { projectPlaceholderDataUrl } from '../../lib/project-placeholder';
import TechStackChips from './TechStackChips';

type ProjectCardProps = Project & {
  compact?: boolean;
};

const MotionCard = motion(Card);

export default function ProjectCard({
  slug,
  title,
  short,
  imageSrc,
  imageAlt,
  tech,
  period,
  status,
  category,
  highlights,
  links,
  compact = false,
}: ProjectCardProps) {
  const { locale } = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const ease: Easing = [0.22, 1, 0.36, 1];

  const externalLinks = links.filter((item) => item.type === 'demo' || item.type === 'repo');
  const highlightedItems = highlights.slice(0, compact ? 1 : 2);
  const metadataLabel = [
    getProjectCategoryLabel(category, locale),
    getProjectStatusLabel(status, locale),
    formatProjectPeriod(period, locale),
  ].join(' • ');
  const cardImageSrc = imageSrc && imageSrc.trim() !== '' ? imageSrc : projectPlaceholderDataUrl(title, locale);
  const cardImageAlt = imageAlt || title;
  const shouldSkipOptimization = cardImageSrc.startsWith('data:') || cardImageSrc.startsWith('blob:');
  const imageSizes = compact ? '(max-width: 900px) 100vw, 50vw' : '(max-width: 900px) 100vw, 33vw';

  return (
    <MotionCard
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -3,
              transition: { duration: 0.2, ease },
            }
      }
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
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
          position: 'relative',
        }}
      >
        <Image
          src={cardImageSrc}
          alt={cardImageAlt}
          fill
          loading="lazy"
          sizes={imageSizes}
          unoptimized={shouldSkipOptimization}
          style={{
            objectFit: 'cover',
            transition: 'transform 220ms ease',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: 'var(--text-2)', fontWeight: 600 }}>
              {metadataLabel}
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
            {highlightedItems.map((item) => (
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

          <TechStackChips items={tech} limit={compact ? 3 : 4} />
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 3, pb: 3, pt: 0, gap: 1, flexWrap: 'wrap' }}>
        <Button
          size="small"
          component={Link}
          href={`/projets/${slug}`}
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
            startIcon={link.type === 'repo' ? <GitHub fontSize="small" /> : undefined}
          >
            {link.label}
          </Button>
        ))}
      </CardActions>
    </MotionCard>
  );
}
