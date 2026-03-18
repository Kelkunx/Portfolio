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
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          backgroundColor: scrolled ? 'var(--surface-glass)' : 'transparent',
          boxShadow: 'none',
          transition: 'background-color 180ms ease, border-color 180ms ease',
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

                return (
                  <Button
                    key={link.key}
                    component={Link}
                    href={link.href}
                    variant="text"
                    sx={{
                      position: 'relative',
                      color: active ? 'var(--text)' : 'var(--text-2)',
                      px: 1,
                      minWidth: 'auto',
                      borderRadius: 0,
                      '&:hover': {
                        color: 'var(--text)',
                        backgroundColor: 'transparent',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 8,
                        right: 8,
                        bottom: 6,
                        height: 2,
                        backgroundColor: active ? 'var(--cyan)' : 'transparent',
                        transition: 'background-color 160ms ease',
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
