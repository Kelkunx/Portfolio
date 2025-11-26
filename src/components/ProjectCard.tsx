// src/components/ProjectCard.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
import type { Project } from '../../lib/projects';

export default function ProjectCard({
  slug,
  title,
  short,
  imageSrc,
  imageAlt,
  tech,
  demoUrl,
  repoUrl,
}: Project) {
  const router = useRouter();
  const { locale } = useLocale();

  const img = imageSrc && imageSrc.trim() !== '' ? imageSrc : 'https://placehold.co/600x400?text=No+Image';

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

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -6 }}
      whileFocus={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      style={{ height: '100%' }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          cursor: 'pointer',
          '&:focus-visible': {
            outline: (theme) => `3px solid ${theme.palette.primary.main}`,
            outlineOffset: 4,
          },
        }}
        role="link"
        tabIndex={0}
        aria-label={`${locale === 'en' ? 'Open project' : 'Ouvrir le projet'}: ${title}`}
        onClick={handleCardActivate}
        onKeyDown={handleKeyDown}
      >
        {/* Image */}
        <Box sx={{ aspectRatio: '16/9', overflow: 'hidden', width: '100%', backgroundColor: 'background.paper' }}>
          <CardMedia
            component="img"
            image={img}
            alt={imageAlt || title}
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1 }}>
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
              {tech.map((t) => (
                <Chip
                  key={t}
                  label={t}
                  size="small"
                  variant="outlined"
                  color="secondary"
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
