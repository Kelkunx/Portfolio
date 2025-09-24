// src/components/AnimatedSection.tsx
'use client';

import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

const MotionBox = motion(Box);

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

export default function AnimatedSection({
  children,
  sx,
  className,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>; // permet d'overrider facilement le spacing si besoin
  className?: string;
}) {
  const reduce = useReducedMotion();

  const variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : baseVariants;

  // Par défaut on applique un padding vertical cohérent (responsive).
  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={variants}
      sx={{ ...sx }}
      className={className}
    >
      {children}
    </MotionBox>
  );
}
