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

type Props = {
  src: string;
  alt?: string;
  // taille du thumbnail (hauteur en px), sinon on utilise un ratio responsive
  thumbHeight?: number;
  // ratio (ex: "16/9") si aucun thumbHeight n'est fourni
  aspectRatio?: string;
  // optionnel : priorité next/image
  priority?: boolean;
};

/**
 * ImageLightbox
 * - affiche un thumbnail (button) ; au clic ouvre une Dialog avec l'image en grand (fill).
 * - accessible : bouton focusable, aria-label, Esc pour fermer.
 */
export default function ImageLightbox({
  src,
  alt = 'Image',
  thumbHeight,
  aspectRatio = '16/9',
  priority = false,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const sizeSx = thumbHeight ? { height: thumbHeight } : { aspectRatio };

  return (
    <>
      {/* Thumbnail clickable */}
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
        aria-label={`Agrandir l'image : ${alt}`}
      >
        <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
          <Image src={src} alt={alt} fill style={{ objectFit: 'cover' }} priority={priority}/>
        </Box>
      </ButtonBase>

      {/* Lightbox Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="lg"
        aria-labelledby="image-lightbox"
        PaperProps={{
          sx: {
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-soft)',
          },
        }}
      >
        <IconButton
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          color='warning'
          sx={{ position: 'absolute', right: 8, top: 8, zIndex: 10 }}
        >
          <Close />
        </IconButton>

        <DialogContent sx={{ p: 0, bgcolor: 'transparent' }}>
          <Box sx={{ width: '100%', height: { xs: '60vh', md: '80vh' }, position: 'relative' }}>
            <Image src={src} alt={alt} fill style={{ objectFit: 'contain', background: 'var(--bg)' }} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
