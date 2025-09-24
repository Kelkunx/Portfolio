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
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import LanguageIcon from '@mui/icons-material/Language';
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
  const img = imageSrc && imageSrc.trim() !== '' ? imageSrc : 'https://placehold.co/600x400?text=No+Image';

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
        }}
        role="group"
        aria-label={`Projet ${title}`}
      >
        <Box sx={{ aspectRatio: '16/9', overflow: 'hidden', width: '100%' }}>
          <CardMedia
            component="img"
            image={img}
            alt={imageAlt || title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Box>

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
                />
              ))}
            </Stack>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end', flexWrap: 'wrap', gap: 1, px: 2, pb: 2 }}>
          <Button
            component={Link}
            href={`/projets/${slug}`}
            size="small"
            variant="text"
            startIcon={<LaunchIcon />}
            sx={{ textTransform: 'none', '&:hover': { transform: 'translateY(-3px)' } }}
            aria-label={`Voir les détails du projet ${title}`}
          >
            Détails
          </Button>

          {demoUrl && (
            <Button
              size="small"
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<LaunchIcon />}
              sx={{ textTransform: 'none', '&:hover': { transform: 'translateY(-3px)' } }}
            >
              Démo
            </Button>
          )}

          {repoUrl && (
            <Button
              size="small"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon />}
              sx={{ textTransform: 'none', '&:hover': { transform: 'translateY(-3px)' } }}
            >
              Code
            </Button>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
}
