// app/page.tsx
'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';

export default function HomePage() {
  return (
    <section>
      <Box sx={{ py: 12, display: 'flex', justifyContent: 'center' }}>
        <Avatar
          alt="Léo Jégo"
          src="https://media.licdn.com/dms/image/v2/D4D03AQHgpRK0z1HYeQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708890693729?e=1759968000&v=beta&t=ZJWHjR9n7B2-uSAJSjIFbHspRRpp8L_e4JiBtTCaNJM" // Remplace par le chemin de ta photo
          sx={{ width: 120, height: 120, mb: 2 }}
        />
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bonjour, je suis Léo Jégo
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Développeur web fullstack passionné par la création d'applications modernes et performantes.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Spécialisé dans les technologies React, Next.js, NestJS et TypeScript, j'aime concevoir des solutions innovantes qui répondent aux besoins des utilisateurs.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Je suis à la recherche de nouveaux défis et opportunités pour évoluer dans le domaine du développement web.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
          <Button variant="contained" href="/projets">
            Voir mes projets
          </Button>
          <Button variant="outlined" href="/contact">
            Me contacter
          </Button>
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            Retrouvez-moi également sur :
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="text"
              href="https://www.linkedin.com/in/leo-jego"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<LinkedIn />}
            >
              LinkedIn
            </Button>
            <Button
              variant="text"
              href="https://github.com/Kelkunx"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHub />}
            >
              GitHub
            </Button>
          </Stack>
        </Box>
      </Box>
    </section>
  );
}
