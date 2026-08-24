'use client';

import { useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { useLocale } from '../context/LocaleContext';
import LanguageToggle from './LanguageToggle';
import SiteContainer from './SiteContainer';

export default function Header() {
  const mobileMenuRef = useRef<HTMLDialogElement>(null);
  const { t } = useLocale();
  const pathname = usePathname();

  const navLinks = [
    { key: 'home', label: t.nav.home, href: '/' },
    { key: 'projects', label: t.nav.projects, href: '/projets' },
    { key: 'cv', label: t.nav.cv, href: '/cv' },
    { key: 'contact', label: t.nav.contact, href: '/contact' },
  ];

  const isActiveLink = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: '1px solid transparent',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          transition: 'background-color 180ms ease, border-color 180ms ease',
        }}
      >
        <SiteContainer>
          <Toolbar
            className="site-header-toolbar"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box
                className="site-header-surface"
                sx={{
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  backgroundColor: 'var(--surface)',
                  px: 1.5,
                  py: 1,
                  transition: 'box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease',
                  '&:hover': {
                    borderColor: 'rgba(125, 207, 255, 0.24)',
                    backgroundColor: 'var(--surface-2)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component={Link}
                  href="/"
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'var(--text)',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    fontFamily: 'var(--font-display)',
                    transition: 'color 160ms ease',
                    '&:hover': {
                      color: 'var(--cyan)',
                    },
                  }}
                >
                  Léo JEGO
                </Typography>
              </Box>
            </Box>

            <Box
              className="site-header-surface"
              component="nav"
              aria-label="Primary navigation"
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1.5,
                border: '1px solid var(--border)',
                borderRadius: '10px',
                backgroundColor: 'var(--surface)',
                px: 1.25,
                transition: 'box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease',
              }}
            >
              {navLinks.map((link, index) => {
                const active = isActiveLink(link.href);
                const tone =
                  index === 0
                    ? 'var(--cyan)'
                    : index === 1
                      ? 'var(--purple)'
                      : index === 2
                        ? 'var(--green)'
                        : 'var(--yellow)';
                const background =
                  index === 0
                    ? 'rgba(125, 207, 255, 0.08)'
                    : index === 1
                      ? 'rgba(187, 154, 247, 0.08)'
                      : index === 2
                        ? 'rgba(158, 206, 106, 0.08)'
                        : 'rgba(224, 175, 104, 0.1)';

                return (
                  <Button
                    key={link.key}
                    component={Link}
                    href={link.href}
                    variant="text"
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      color: active ? 'var(--text)' : 'var(--text-2)',
                      px: 1.5,
                      py: 0.85,
                      minWidth: 'auto',
                      borderRadius: '8px',
                      fontWeight: active ? 600 : 500,
                      letterSpacing: '-0.01em',
                      transition: 'color 160ms ease, background-color 160ms ease',
                      '&:hover': {
                        color: tone,
                        backgroundColor: background,
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 10,
                        right: 10,
                        top: 6,
                        height: 2,
                        borderRadius: '999px',
                        backgroundColor: active ? tone : 'transparent',
                        transition: 'background-color 160ms ease',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 10,
                        right: 10,
                        bottom: 6,
                        height: 2,
                        borderRadius: '999px',
                        backgroundColor: tone,
                        opacity: active ? 1 : 0,
                        transition: 'opacity 160ms ease',
                      },
                      '&:hover::after': {
                        opacity: 1,
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                );
              })}

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  pl: 1.25,
                  ml: 0.25,
                  borderLeft: '1px solid var(--border)',
                }}
              >
                <LanguageToggle />
                <ThemeToggle />
              </Box>
            </Box>

            <Box
              className="site-header-surface"
              sx={{
                display: { xs: 'flex', md: 'none' },
                alignItems: 'center',
                gap: 0.75,
                border: '1px solid var(--border)',
                borderRadius: '10px',
                backgroundColor: 'var(--surface)',
                p: 0.5,
                transition: 'box-shadow 160ms ease, border-color 160ms ease, background-color 160ms ease',
              }}
            >
              <LanguageToggle />
              <ThemeToggle />
              <IconButton
                onClick={() => mobileMenuRef.current?.showModal()}
                aria-label={t.nav.home === 'Accueil' ? 'Ouvrir le menu' : 'Open menu'}
                aria-haspopup="dialog"
                sx={{
                  width: 44,
                  height: 44,
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text)',
                  transition: 'background-color 160ms ease, border-color 160ms ease, color 160ms ease',
                  '&:hover': {
                    backgroundColor: 'rgba(125, 207, 255, 0.08)',
                    borderColor: 'rgba(125, 207, 255, 0.28)',
                    color: 'var(--cyan)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </SiteContainer>
      </AppBar>

      <dialog
        ref={mobileMenuRef}
        className="mobile-nav-dialog"
        aria-label={t.nav.home === 'Accueil' ? 'Navigation principale' : 'Primary navigation'}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <button
          type="button"
          className="mobile-nav-close"
          onClick={() => mobileMenuRef.current?.close()}
          aria-label={t.nav.home === 'Accueil' ? 'Fermer le menu' : 'Close menu'}
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <nav>
          <ul className="mobile-nav-list">
            {navLinks.map((link, index) => {
              const active = isActiveLink(link.href);
              const tone =
                index === 0
                  ? 'var(--cyan)'
                  : index === 1
                    ? 'var(--purple)'
                    : index === 2
                      ? 'var(--green)'
                      : 'var(--yellow)';

              return (
                <li key={link.key}>
                  <Link
                  href={link.href}
                  onClick={() => mobileMenuRef.current?.close()}
                  className={`mobile-nav-link${active ? ' mobile-nav-link-active' : ''}`}
                  style={{
                    borderLeftColor: active ? tone : 'transparent',
                  }}
                >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </dialog>
    </>
  );
}
