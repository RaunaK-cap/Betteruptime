"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function Success() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(currentColor 1px,transparent 1px),linear-gradient(90deg,currentColor 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      
      <motion.div 
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }} 
            className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center border border-border"
          >
            <CheckCircle2 className="w-10 h-10 text-foreground" />
          </motion.div>
        </div>

        <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-3">
          You're all set!
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-sm text-muted-foreground text-center mb-8 leading-relaxed">
          Your account has been successfully created. You can now access your dashboard and start monitoring your services.
        </motion.p>

        <motion.div variants={itemVariants} className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="font-semibold text-sm mb-4">What's next?</h3>
          <ul className="space-y-3">
            {[
              "Go to your dashboard",
              "Add your first website to monitor",
              "Set up alert preferences",
              "View real-time status"
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5 mr-3" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <Link href="/auth/login" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
            Go to login
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/" className="w-full flex items-center justify-center px-4 py-2.5 border border-border bg-background text-foreground rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            Back to home
          </Link>
        </motion.div>
        
        <motion.p variants={itemVariants} className="text-xs text-muted-foreground text-center mt-8">
          Need help? <Link href="#" className="underline underline-offset-2 hover:text-foreground">Contact Support</Link>
        </motion.p>
      </motion.div>
    </main>
  );
}
