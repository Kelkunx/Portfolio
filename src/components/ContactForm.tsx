// components/ContactForm.tsx
'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const ContactSchema = z.object({
  name: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(2, 'Sujet trop court'),
  message: z.string().min(10, 'Message trop court'),
  hp: z.string().optional(), // honeypot
});

type ContactFormData = z.infer<typeof ContactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // honeypot check client-side (extra)
    if (data.hp) {
      setStatus('error');
      setErrorMessage('Requête bloquée (spam détecté).');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, subject: data.subject, message: data.message }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg = body?.error || `Erreur serveur : ${res.status}`;
        throw new Error(msg);
      }

      setStatus('success');
      reset();
    } catch (err: any) {
      console.error('Contact send error', err);
      setErrorMessage(err.message || 'Erreur inconnue');
      setStatus('error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate aria-live="polite">
      <Stack spacing={2}>
        {status === 'success' && <Alert severity="success">Message envoyé — je te réponds rapidement !</Alert>}
        {status === 'error' && errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        {/* Honeypot: champ invisible aux humains */}
        <input
          type="text"
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
          {...register('hp')}
          tabIndex={-1}
          aria-hidden
        />

        <TextField label="Nom" {...register('name')} error={!!formState.errors.name} helperText={formState.errors.name?.message} required />
        <TextField label="Email" {...register('email')} error={!!formState.errors.email} helperText={formState.errors.email?.message} required />
        <TextField label="Sujet" {...register('subject')} error={!!formState.errors.subject} helperText={formState.errors.subject?.message} required />
        <TextField
          label="Message"
          {...register('message')}
          error={!!formState.errors.message}
          helperText={formState.errors.message?.message}
          multiline
          minRows={6}
          required
        />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button type="submit" variant="contained" disabled={status === 'loading'}>
            {status === 'loading' ? <CircularProgress size={20} /> : 'Envoyer'}
          </Button>

          <Button type="button" color="inherit" onClick={() => { reset(); setStatus('idle'); setErrorMessage(null); }}>
            Réinitialiser
          </Button>
        </Box>

        <Box sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
          En envoyant ce message, vous acceptez que je réponde par e-mail. Pas de spam — uniquement des réponses utiles.
        </Box>
      </Stack>
    </Box>
  );
}
