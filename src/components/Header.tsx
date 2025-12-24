'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ThemeToggle from './ThemeToggle';
import { useLocale } from '../context/LocaleContext';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { key: 'home', label: t.nav.home, href: '/' },
    { key: 'projects', label: t.nav.projects, href: '/projets' },
    { key: 'contact', label: t.nav.contact, href: '/contact' },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: '1px solid transparent',
          backdropFilter: 'blur(var(--blur-glass))',
          backgroundColor: scrolled ? 'var(--surface-glass)' : 'transparent',
          boxShadow: scrolled ? 'var(--shadow-soft)' : 'none',
          transition: 'background-color 250ms ease, box-shadow 250ms ease',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '1px',
            background: scrolled ? 'var(--grad-border)' : 'transparent',
            opacity: 0.8,
          },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: scrolled ? 60 : 78,
              transition: 'min-height 200ms ease',
              px: { xs: 2, md: 0 },
            }}
          >
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                textDecoration: 'none',
                color: 'var(--text)',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                fontFamily: 'var(--font-display)',
                transition: 'color 180ms ease',
                '&:hover': { color: 'var(--accent)' },
              }}
            >
              Léo JEGO
            </Typography>

            {/* Desktop nav */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 2 }}>
              {navLinks.map((link) => {
                const isCta = link.key === 'contact';
                return (
                  <Button
                    key={link.key}
                    component={Link}
                    href={link.href}
                    sx={{
                      fontWeight: 500,
                      color: isCta ? 'var(--text)' : 'var(--text-2)',
                      '&:hover': {
                        color: 'var(--text)',
                        backgroundColor: isCta ? 'rgba(187, 154, 247, 0.12)' : 'rgba(125, 207, 255, 0.08)',
                      },
                    }}
                    variant={isCta ? 'outlined' : 'text'}
                    color={isCta ? 'secondary' : 'primary'}
                  >
                    {link.label}
                  </Button>
                );
              })}

              {/* Language selector + ThemeToggle */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageToggle />
                <ThemeToggle />
              </Box>
            </Box>

            {/* Mobile nav */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              <LanguageToggle />
              <ThemeToggle />
              <IconButton onClick={() => setMobileOpen((o) => !o)} color="primary" aria-label="ouvrir le menu">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            borderLeft: '1px solid var(--border)',
          },
        }}
      >
        <Box sx={{ width: 240, p: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.key} disablePadding>
                <ListItemButton component={Link} href={link.href} onClick={() => setMobileOpen(false)}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
