// src/app/contact/page.tsx (extrait)
import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ContactForm from '../../components/ContactForm';
import Link from 'next/link';

export const metadata = {
  title: 'Contact — Léo JEGO',
  description: 'Me contacter — Développeur web fullstack',
};

export default function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Contact
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Tu peux m&apos;envoyer un message via ce formulaire ou m&apos;écrire directement par email :
        <Link href="mailto:leo.jego56@gmail.com" style={{ marginLeft: 8 }}>leo.jego56@gmail.com</Link>.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <ContactForm />
      </Box>
    </Container>
  );
}
