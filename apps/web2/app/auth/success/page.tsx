'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center px-6 py-12">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md text-center">
        {/* Success Icon */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
            <motion.svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ pathLength: [0, 1] }} transition={{ duration: 1, delay: 0.3 }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </motion.svg>
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-light text-slate-900 mb-2">
          Welcome to PulseWatch!
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={itemVariants} className="text-slate-600 font-light mb-8">
          Your account has been successfully created. Get ready to monitor your systems with confidence.
        </motion.p>

        {/* Features List */}
        <motion.div variants={itemVariants} className="space-y-3 mb-8">
          {['Real-time monitoring', 'Instant alerts', 'Beautiful dashboards'].map((feature, index) => (
            <motion.div key={index} animate={{ x: [0, 4, 0] }} transition={{ duration: 1, delay: index * 0.2, repeat: Infinity }} className="flex items-center gap-3 text-left">
              <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-slate-700 font-light">{feature}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Link href="/">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full px-4 py-3 bg-emerald-500 text-white rounded-lg text-sm font-light hover:bg-emerald-600 transition-colors">
              Go to Dashboard
            </motion.button>
          </Link>
        </motion.div>

        {/* Redirect Message */}
        <motion.p variants={itemVariants} className="text-xs text-slate-500 font-light mt-6">
          Redirecting in a few seconds...
        </motion.p>
      </motion.div>
    </main>
  );
}
