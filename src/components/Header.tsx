// components/Header.tsx
'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters className="flex justify-between">
          <Typography variant="h6" component="div">
            Léo JEGO
          </Typography>

          <Box>
            <Button href="/" component={Link} sx={{ mr: 1 }}>
              Accueil
            </Button>
            <Button href="/projets" component={Link} sx={{ mr: 1 }}>
              Projets
            </Button>
            <Button href="/contact" component={Link} variant="outlined">
              Contact
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
