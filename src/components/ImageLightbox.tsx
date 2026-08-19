// src/components/ImageLightbox.tsx
'use client';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Image from 'next/image';
import ButtonBase from '@mui/material/ButtonBase';
import { useLocale } from '../context/LocaleContext';

type Props = {
  src: string;
  alt?: string;
  thumbHeight?: number;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
};

export default function ImageLightbox({
  src,
  alt = 'Image',
  thumbHeight,
  aspectRatio = '16/9',
  priority = false,
  sizes = '(max-width: 900px) 100vw, 66vw',
}: Props) {
  const { locale } = useLocale();
  const [open, setOpen] = React.useState(false);
  const sizeSx = thumbHeight ? { height: thumbHeight } : { aspectRatio };
  const shouldSkipOptimization = src.startsWith('data:') || src.startsWith('blob:');

  return (
    <>
      <ButtonBase
        onClick={() => setOpen(true)}
        sx={{
          display: 'block',
          width: '100%',
          ...sizeSx,
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          border: '1px solid var(--border)',
        }}
        aria-label={`${locale === 'fr' ? "Agrandir l'image" : 'Open image'} : ${alt}`}
      >
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            unoptimized={shouldSkipOptimization}
            style={{ objectFit: 'cover' }}
            priority={priority}
          />
        </Box>
      </ButtonBase>

      {/* Lightbox Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          'aria-label': `${locale === 'fr' ? 'Aperçu agrandi' : 'Enlarged preview'} : ${alt}`,
          sx: {
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-soft)',
          },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          aria-label={locale === 'fr' ? 'Fermer' : 'Close'}
          color="inherit"
          sx={{ position: 'absolute', right: 8, top: 8, zIndex: 10 }}
        >
          <Close />
        </IconButton>

        <DialogContent sx={{ p: 0, bgcolor: 'transparent' }}>
          <Box sx={{ width: '100%', height: { xs: '60vh', md: '80vh' }, position: 'relative' }}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              unoptimized={shouldSkipOptimization}
              style={{ objectFit: 'contain', background: 'var(--bg)' }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
