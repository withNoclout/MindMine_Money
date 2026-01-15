'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfileButton } from "@/components/auth/UserProfileButton";
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-sm' : 'bg-white/80'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-2xl font-bold tracking-tight">
              <span className="text-black">MINDMINE</span>
              <span className="text-gray-400 font-normal">MONEY</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('educators')}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              For Educators
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('students')}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              For Students
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('technology')}
              className="text-sm font-medium text-gray-600 hover:text-black transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Technology
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
            </motion.button>
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="#student"
              className="px-6 py-2 text-sm font-semibold text-black border-2 border-black rounded"
              whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Get Started
            </motion.a>
            <motion.a
              href="#educator"
              className="px-6 py-2 text-sm font-semibold bg-black text-white rounded"
              whileHover={{ scale: 1.02, backgroundColor: "#262626" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              Become Educator
            </motion.a>
            <UserProfileButton variant="light" />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300
              }}
              className="md:hidden py-4 space-y-4 border-t border-gray-200 bg-white"
            >
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left text-sm font-medium text-gray-600 hover:text-black py-2"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('educators')}
                className="block w-full text-left text-sm font-medium text-gray-600 hover:text-black py-2"
              >
                For Educators
              </button>
              <button
                onClick={() => scrollToSection('students')}
                className="block w-full text-left text-sm font-medium text-gray-600 hover:text-black py-2"
              >
                For Students
              </button>
              <button
                onClick={() => scrollToSection('technology')}
                className="block w-full text-left text-sm font-medium text-gray-600 hover:text-black py-2"
              >
                Technology
              </button>
              <div className="pt-4 space-y-3">
                <motion.a
                  href="#student"
                  className="block w-full px-6 py-3 text-center text-sm font-semibold text-black border-2 border-black rounded"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  Get Started
                </motion.a>
                <motion.a
                  href="#educator"
                  className="block w-full px-6 py-3 text-center text-sm font-semibold bg-black text-white rounded"
                  whileHover={{ scale: 1.02, backgroundColor: "#262626" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  Become Educator
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
