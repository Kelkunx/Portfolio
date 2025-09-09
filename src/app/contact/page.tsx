'use client';

import React from 'react';
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  Paper,
} from '@mui/material';
import {
  Email,
  Phone,
  LinkedIn,
  GitHub,
  PictureAsPdf,
} from '@mui/icons-material';

export default function ContactPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" component="h1" gutterBottom>
            Me contacter
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Vous pouvez me joindre facilement par email, téléphone ou via mes
            réseaux pro.
          </Typography>
        </Box>

        <Stack spacing={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Email />}
            href="mailto:leo.jego56@gmail.com"
            fullWidth
          >
            leo.jego56@gmail.com
          </Button>

          <Button
            variant="outlined"
            startIcon={<Phone />}
            href="tel:+33755648201"
            fullWidth
          >
            +33 7 55 64 82 01
          </Button>

          <Button
            variant="outlined"
            startIcon={<LinkedIn />}
            href="https://www.linkedin.com/in/leo-jego"
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
          >
            LinkedIn
          </Button>

          <Button
            variant="outlined"
            startIcon={<GitHub />}
            href="https://github.com/Kelkunx"
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
          >
            GitHub
          </Button>

          <Button
            variant="outlined"
            startIcon={<PictureAsPdf />}
            href="/cv-leo-jego.pdf"
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
          >
            Télécharger mon CV (PDF)
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
