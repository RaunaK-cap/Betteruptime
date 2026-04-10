'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BentoItemProps {
  className?: string;
  delay?: number;
  children: React.ReactNode;
  onClick?: () => void;
}

export function BentoItem({
  className = '',
  delay = 0,
  children,
  onClick,
}: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      onClick={onClick}
      className={`glass rounded-xl p-8 transition-all duration-300 cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function BentoGrid({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
}
