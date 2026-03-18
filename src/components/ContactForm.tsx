'use client';

import React, { useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from '../context/LocaleContext';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  hp?: string;
};

function getErrorMessage(error: unknown, locale: 'fr' | 'en'): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return locale === 'fr' ? 'Erreur inconnue' : 'Unknown error';
}

export default function ContactForm() {
  const { locale } = useLocale();
  const statusRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const copy =
    locale === 'fr'
      ? {
          success: 'Message envoyé. Je reviens vers vous rapidement.',
          spam: 'Spam détecté.',
          server: 'Erreur serveur',
          submit: 'Envoyer',
          reset: 'Réinitialiser',
          labels: {
            name: 'Nom',
            email: 'Email',
            subject: 'Sujet',
            message: 'Message',
          },
        }
      : {
          success: 'Message sent. I will get back to you quickly.',
          spam: 'Spam detected.',
          server: 'Server error',
          submit: 'Send',
          reset: 'Reset',
          labels: {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message',
          },
        };

  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, locale === 'fr' ? 'Le nom doit contenir au moins 2 caractères.' : 'Name must contain at least 2 characters.'),
        email: z.string().email(locale === 'fr' ? 'Adresse email invalide.' : 'Invalid email address.'),
        subject: z
          .string()
          .min(2, locale === 'fr' ? 'Le sujet doit contenir au moins 2 caractères.' : 'Subject must contain at least 2 characters.'),
        message: z
          .string()
          .min(10, locale === 'fr' ? 'Le message doit contenir au moins 10 caractères.' : 'Message must contain at least 10 characters.'),
        hp: z.string().optional(),
      }),
    [locale]
  );

  const { register, handleSubmit, reset, formState } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ContactFormData) => {
    if (data.hp) {
      setStatus('error');
      setErrorMessage(copy.spam);
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error || copy.server);
      setStatus('success');
      reset();
      statusRef.current?.focus();
    } catch (error: unknown) {
      setStatus('error');
      setErrorMessage(getErrorMessage(error, locale));
      statusRef.current?.focus();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate aria-live="polite">
      <Stack spacing={2}>
        <div tabIndex={-1} ref={statusRef} aria-live="polite" style={{ outline: 'none' }} />

        {status === 'success' && <Alert severity="success">{copy.success}</Alert>}
        {status === 'error' && errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <input
          type="text"
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }}
          {...register('hp')}
          tabIndex={-1}
          aria-hidden
        />

        <TextField
          label={copy.labels.name}
          {...register('name')}
          error={!!formState.errors.name}
          helperText={formState.errors.name?.message}
          required
        />
        <TextField
          label={copy.labels.email}
          {...register('email')}
          error={!!formState.errors.email}
          helperText={formState.errors.email?.message}
          required
        />
        <TextField
          label={copy.labels.subject}
          {...register('subject')}
          error={!!formState.errors.subject}
          helperText={formState.errors.subject?.message}
          required
        />
        <TextField
          label={copy.labels.message}
          {...register('message')}
          error={!!formState.errors.message}
          helperText={formState.errors.message?.message}
          multiline
          minRows={6}
          required
        />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button type="submit" variant="contained" disabled={status === 'loading'}>
            {status === 'loading' ? <CircularProgress size={20} color="inherit" /> : copy.submit}
          </Button>
          <Button
            type="button"
            color="inherit"
            onClick={() => {
              reset();
              setStatus('idle');
              setErrorMessage(null);
            }}
          >
            {copy.reset}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
