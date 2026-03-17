'use client';

import React, { useEffect, useState } from 'react';
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
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { useLocale } from '../context/LocaleContext';
import LanguageToggle from './LanguageToggle';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { key: 'home', label: t.nav.home, href: '/' },
    { key: 'projects', label: t.nav.projects, href: '/projets' },
    { key: 'cv', label: t.nav.cv, href: '/cv' },
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
          transition: 'background-color 220ms ease, box-shadow 220ms ease',
          '&::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '1px',
            background: scrolled ? 'var(--grad-border)' : 'transparent',
            opacity: 0.6,
          },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: scrolled ? 66 : 80,
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
              }}
            >
              Léo JEGO
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              {navLinks.map((link) => {
                const active = pathname === link.href;
                const isContact = link.key === 'contact';

                return (
                  <Button
                    key={link.key}
                    component={Link}
                    href={link.href}
                    variant={isContact ? 'outlined' : 'text'}
                    sx={{
                      color: active || isContact ? 'var(--text)' : 'var(--text-2)',
                      borderColor: isContact ? 'var(--border)' : undefined,
                      backgroundColor: active ? 'rgba(121, 168, 255, 0.08)' : 'transparent',
                      '&:hover': {
                        color: 'var(--text)',
                        backgroundColor: 'rgba(121, 168, 255, 0.08)',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageToggle />
                <ThemeToggle />
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              <LanguageToggle />
              <ThemeToggle />
              <IconButton onClick={() => setMobileOpen((open) => !open)} aria-label="open menu">
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: 'var(--surface)',
            color: 'var(--text)',
            borderLeft: '1px solid var(--border)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
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
