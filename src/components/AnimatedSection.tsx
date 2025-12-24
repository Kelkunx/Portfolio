// src/components/AnimatedSection.tsx
'use client';

import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

const MotionBox = motion(Box);
const MotionItem = motion.div;

type Intent = 'soft' | 'showcase';
type VariantState = Record<string, string | number>;
type VariantConfig = { hidden: VariantState; visible: VariantState; transition: Record<string, unknown> };

const baseVariants: Record<Intent, VariantConfig> = {
  soft: {
    hidden: { opacity: 0, y: 20, scale: 0.98, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    transition: { duration: 0.65, ease: 'easeOut' },
  },
  showcase: {
    hidden: { opacity: 0, y: 30, scale: 0.96, filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

const childVariants: Record<Intent, Variants> = {
  soft: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  },
  showcase: {
    hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: 'easeOut' } },
  },
};

export default function AnimatedSection({
  children,
  sx,
  className,
  intent = 'soft',
  stagger = false,
  delay = 0,
  viewportOnce,
  amount,
}: {
  children: React.ReactNode;
  sx?: SxProps<Theme>; // permet d'overrider facilement le spacing si besoin
  className?: string;
  intent?: Intent;
  stagger?: boolean;
  delay?: number;
  viewportOnce?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();

  const variants = (() => {
    if (reduce) {
      return { hidden: { opacity: 1, y: 0, scale: 1, filter: 'none' }, visible: { opacity: 1, y: 0, scale: 1, filter: 'none' } };
    }

    const base = baseVariants[intent];
    const transition = {
      ...base.transition,
      delay,
      ...(stagger
        ? {
            staggerChildren: intent === 'showcase' ? 0.09 : 0.06,
            delayChildren: intent === 'showcase' ? 0.08 : 0.02,
            when: 'beforeChildren',
          }
        : {}),
    };
    return { hidden: base.hidden, visible: { ...base.visible, transition } };
  })();

  const content =
    stagger && !reduce
      ? React.Children.map(children, (child, index) => (
          <MotionItem key={index} variants={childVariants[intent]}>
            {child}
          </MotionItem>
        ))
      : children;

  const viewport = {
    once: viewportOnce ?? intent === 'showcase',
    amount: amount ?? (intent === 'showcase' ? 0.3 : 0.2),
  };

  return (
    <MotionBox
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      sx={{ ...sx }}
      className={className}
    >
      {content}
    </MotionBox>
  );
}
