// components/Footer.tsx
'use client';

import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <footer>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Léo JEGO — Développeur web
        </Typography>
      </Container>
    </footer>
  );
}
