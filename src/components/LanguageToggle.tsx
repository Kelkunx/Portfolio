// components/LanguageToggle.tsx
'use client';

import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import { useLocale } from '../context/LocaleContext';

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleChange = (lang: 'fr' | 'en') => {
    setLocale(lang);
    handleClose();
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={handleOpen}
        aria-controls={anchorEl ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        aria-label="Changer la langue"
        size="small"
      >
        <LanguageIcon />
      </IconButton>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-soft)',
          },
        }}
      >
        <MenuItem
          selected={locale === 'fr'}
          onClick={() => handleChange('fr')}
        >
          🇫🇷 Français
        </MenuItem>
        <MenuItem
          selected={locale === 'en'}
          onClick={() => handleChange('en')}
        >
          🇬🇧 English
        </MenuItem>
      </Menu>
    </>
  );
}
