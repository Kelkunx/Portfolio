// components/AnimatedSection.tsx
'use client';

import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function AnimatedSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const variants = reduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : baseVariants;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // <-- rejoue à chaque scroll
      variants={variants}
      className={className}
    >
      {children}
    </motion.section>
  );
}
