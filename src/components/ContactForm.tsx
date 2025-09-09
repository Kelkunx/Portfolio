// components/ContactForm.tsx
'use client';
import React, { useRef } from 'react';
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
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
  hp: z.string().optional(),
});
type ContactFormData = z.infer<typeof ContactSchema>;

export default function ContactForm() {
  const statusRef = useRef<HTMLDivElement | null>(null);
  const { register, handleSubmit, reset, formState } = useForm<ContactFormData>({ resolver: zodResolver(ContactSchema) });
  const [status, setStatus] = React.useState<'idle'|'loading'|'success'|'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    if (data.hp) { setStatus('error'); setErrorMessage('Spam détecté'); return; }
    setStatus('loading'); setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || 'Erreur serveur');
      setStatus('success');
      reset();
      statusRef.current?.focus();
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Erreur inconnue');
      statusRef.current?.focus();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate aria-live="polite">
      <Stack spacing={2}>
        <div tabIndex={-1} ref={statusRef} aria-live="polite" style={{ outline: 'none' }} />
        {status === 'success' && <Alert severity="success">Message envoyé — je reviens vers vous rapidement.</Alert>}
        {status === 'error' && errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <input type="text" autoComplete="off" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0 }} {...register('hp')} tabIndex={-1} aria-hidden />

        <TextField label="Nom" {...register('name')} error={!!formState.errors.name} helperText={formState.errors.name?.message} required />
        <TextField label="Email" {...register('email')} error={!!formState.errors.email} helperText={formState.errors.email?.message} required />
        <TextField label="Sujet" {...register('subject')} error={!!formState.errors.subject} helperText={formState.errors.subject?.message} required />
        <TextField label="Message" {...register('message')} error={!!formState.errors.message} helperText={formState.errors.message?.message} multiline minRows={6} required />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button type="submit" variant="contained" disabled={status === 'loading'}>{status === 'loading' ? <CircularProgress size={20} /> : 'Envoyer'}</Button>
          <Button type="button" color="inherit" onClick={() => { reset(); setStatus('idle'); setErrorMessage(null); }}>Réinitialiser</Button>
        </Box>
      </Stack>
    </Box>
  );
}
