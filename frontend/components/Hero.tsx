'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Circle, Plus, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center grid-background pt-16 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center">
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="mb-8"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black leading-[1.1] mb-4">
              Transform Education with
              <br />
              <span className="text-gray-600">AI-Powered Content Valuation</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Fair compensation for educators. Affordable learning for students.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="#student"
              className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold bg-black text-white w-full sm:w-auto rounded"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.a
              href="#educator"
              className="px-8 py-4 text-base font-semibold text-black border-2 border-black w-full sm:w-auto rounded"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Start Teaching
            </motion.a>
          </motion.div>

          {/* Stats/Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div 
              className="text-center p-6 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg"
              whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-4xl font-bold text-black mb-2">70%</div>
              <div className="text-sm font-medium text-gray-600">Revenue Share</div>
            </motion.div>
            <motion.div 
              className="text-center p-6 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg"
              whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-4xl font-bold text-black mb-2">AI-Powered</div>
              <div className="text-sm font-medium text-gray-600">Content Valuation</div>
            </motion.div>
            <motion.div 
              className="text-center p-6 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg"
              whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-4xl font-bold text-black mb-2">Thai-Friendly</div>
              <div className="text-sm font-medium text-gray-600">Payments & Support</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-1/4 left-10 w-16 h-16 border-2 border-gray-300 rotate-12 opacity-40 hidden lg:block z-0"
          animate={{ y: [0, -20, 0], rotate: [12, 24, 12] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-12 h-12 border-2 border-gray-300 -rotate-12 opacity-40 hidden lg:block z-0"
          animate={{ y: [0, -15, 0], rotate: [-12, -24, -12] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-8 h-8 bg-black/10 rotate-45 opacity-30 hidden lg:block z-0"
          animate={{ y: [0, -10, 0], rotate: [45, 90, 45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Circle icon */}
        <motion.div
          className="absolute top-20 right-20 hidden lg:block z-0"
          animate={{ 
            y: [0, -20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Circle className="w-12 h-12 text-gray-300" strokeWidth={2} />
        </motion.div>
        
        {/* Plus icon */}
        <motion.div
          className="absolute bottom-1/3 left-20 hidden lg:block z-0"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <Plus className="w-10 h-10 text-gray-300" strokeWidth={2} />
        </motion.div>
        
        {/* Zap icon */}
        <motion.div
          className="absolute top-1/3 right-1/3 hidden lg:block z-0"
          animate={{ 
            y: [0, -18, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          <Zap className="w-8 h-8 text-gray-300" strokeWidth={2} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
