'use client';

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
  variant?: 'standard' | 'spotlight' | 'compact';
  imagePriority?: boolean;
};

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
  variant = 'standard',
  imagePriority = false,
}: ProjectCardProps) {
  const { locale } = useLocale();
  const isSpotlight = variant === 'spotlight';
  const isCompact = variant === 'compact';

  const externalLinks = links.filter((item) => item.type === 'demo' || item.type === 'repo');
  const highlightedItems = isCompact ? [] : highlights.slice(0, isSpotlight ? 3 : 2);
  const metadataLabel = [
    getProjectCategoryLabel(category, locale),
    getProjectStatusLabel(status, locale),
    formatProjectPeriod(period, locale),
  ].join(' • ');
  const cardImageSrc = imageSrc && imageSrc.trim() !== '' ? imageSrc : projectPlaceholderDataUrl(title, locale);
  const cardImageAlt = imageAlt || title;
  const shouldSkipOptimization = cardImageSrc.startsWith('data:') || cardImageSrc.startsWith('blob:');
  const imageSizes = isSpotlight
    ? '(max-width: 900px) 100vw, 56vw'
    : '(max-width: 900px) 100vw, 50vw';

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: isSpotlight ? 'row' : 'column' },
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-soft)',
        transition: 'border-color 180ms ease',
        '&:hover': {
          borderColor: 'rgba(121, 168, 255, 0.42)',
        },
        '@media (prefers-reduced-motion: no-preference)': {
          transition: 'transform 180ms ease, border-color 180ms ease',
          '&:hover': {
            transform: 'translateY(-3px)',
          },
        },
      }}
    >
      <Box
        sx={{
          aspectRatio: {
            xs: '16 / 9',
            md: isSpotlight ? 'auto' : isCompact ? '2 / 1' : '16 / 10',
          },
          width: { xs: '100%', md: isSpotlight ? '56%' : '100%' },
          minHeight: { md: isSpotlight ? 380 : 'auto' },
          flexShrink: 0,
          overflow: 'hidden',
          backgroundColor: 'var(--surface-2)',
          borderBottom: { xs: '1px solid var(--border)', md: isSpotlight ? 'none' : '1px solid var(--border)' },
          borderRight: { md: isSpotlight ? '1px solid var(--border)' : 'none' },
          position: 'relative',
        }}
      >
        <Image
          src={cardImageSrc}
          alt={cardImageAlt}
          fill
          priority={imagePriority}
          sizes={imageSizes}
          unoptimized={shouldSkipOptimization}
          style={{
            objectFit: 'cover',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, minWidth: 0 }}>
        <CardContent sx={{ flexGrow: 1, p: isSpotlight ? { xs: 3, md: 4 } : isCompact ? 2.5 : 3 }}>
          <Stack spacing={isCompact ? 1.5 : 2}>
            <Typography variant="body2" sx={{ color: 'var(--text-2)', fontWeight: 600 }}>
              {metadataLabel}
            </Typography>

            <Box>
              <Typography
                component="h3"
                variant={isSpotlight ? 'h3' : isCompact ? 'h6' : 'h5'}
                sx={{ color: 'var(--text)', mb: 0.75 }}
              >
                {title}
              </Typography>
              <Typography
                variant={isSpotlight ? 'body1' : 'body2'}
                color="text.secondary"
                sx={{ lineHeight: 1.75 }}
              >
                {short}
              </Typography>
            </Box>

            {highlightedItems.length > 0 && (
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
            )}

            <TechStackChips items={tech} limit={isSpotlight ? 6 : isCompact ? 3 : 4} />
          </Stack>
        </CardContent>

        <CardActions
          sx={{
            px: isSpotlight ? { xs: 3, md: 4 } : isCompact ? 2.5 : 3,
            pb: isSpotlight ? { xs: 3, md: 4 } : isCompact ? 2.5 : 3,
            pt: 0,
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Button size="small" component={Link} href={`/projets/${slug}`} endIcon={<ArrowOutward />}>
            {locale === 'fr' ? 'Détails' : 'Details'}
          </Button>

          {externalLinks.slice(0, isCompact ? 1 : 2).map((link) => (
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
      </Box>
    </Card>
  );
}
