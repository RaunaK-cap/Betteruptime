'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const API_BASE_URL = 'http://localhost:4000';

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (formData.username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        username: formData.username,
        password: formData.password,
      };

      const res = await fetch(`${API_BASE_URL}/api/v1/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors({ submit: data.message || 'Unable to create account.' });
        return;
      }

      router.push('/auth/login');
    } catch (error) {
      setErrors({ submit: 'Unable to reach the server. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-slate-50 flex items-center justify-center px-6 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Link href="/" className="inline-block mb-8">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 justify-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5a2.121 2.121 0 0 0-2.828 2.828l2.121-2.121z" />
                </svg>
              </div>
              <span className="text-sm font-light text-slate-900">PulseWatch</span>
            </motion.div>
          </Link>
          <h1 className="text-3xl md:text-4xl font-light text-slate-900 mb-2">Create Account</h1>
          <p className="text-slate-600 font-light">Join thousands monitoring their systems</p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} variants={itemVariants} className="space-y-4">
          {errors.submit && <p className="text-sm text-red-500 font-light">{errors.submit}</p>}
          {/* First Name */}
          <div>
            <label className="block text-xs font-light text-slate-700 mb-2">First Name</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-lg font-light text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors ${
                errors.firstName ? 'border-red-500' : ''
              }`}
            />
            {errors.firstName && <p className="text-xs text-red-500 mt-1 font-light">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-xs font-light text-slate-700 mb-2">Last Name</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-lg font-light text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors ${
                errors.lastName ? 'border-red-500' : ''
              }`}
            />
            {errors.lastName && <p className="text-xs text-red-500 mt-1 font-light">{errors.lastName}</p>}
          </div>

          {/* Username */}
          <div>
            <label className="block text-xs font-light text-slate-700 mb-2">Username</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-lg font-light text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && <p className="text-xs text-red-500 mt-1 font-light">{errors.username}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-light text-slate-700 mb-2">Password</label>
            <div className="relative">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-lg font-light text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-700 text-sm"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1 font-light">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-light text-slate-700 mb-2">Confirm Password</label>
            <div className="relative">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-lg font-light text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-700 text-sm"
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 font-light">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 px-4 py-3 bg-emerald-500 text-white rounded-lg text-sm font-light hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </motion.form>

        {/* Login Link */}
        <motion.p variants={itemVariants} className="text-center mt-6 text-sm text-slate-600 font-light">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-700 font-normal transition-colors">
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </main>
  );
}
