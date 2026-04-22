'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PulseIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function PulseIcon({
  size = 24,
  color = '#10B981',
  className = '',
}: PulseIconProps) {
  return (
    <motion.svg
      className={`animate-heart-pulse ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9H9l-3-9H2" />
      <circle cx={12} cy={13} r={1} fill={color} />
    </motion.svg>
  );
}

export function AnimatedPulseRings() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Center dot */}
      <motion.div
        className="absolute w-2 h-2 bg-foreground rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute border-2 border-foreground rounded-full"
          style={{
            width: 12 + ring * 12,
            height: 12 + ring * 12,
          }}
          animate={{
            opacity: [1, 0],
            scale: [0.5, 1.5],
          }}
          transition={{
            duration: 1.5,
            delay: -ring * 0.4,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
