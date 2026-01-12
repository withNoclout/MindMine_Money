'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-white">MINDMINE</span>
              <span className="text-gray-400 font-normal">MONEY</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered educational marketplace for fair educator compensation and affordable student learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="#how-it-works"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  How It Works
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#educators"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  For Educators
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#students"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  For Students
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#technology"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  Technology
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  Privacy Policy
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  Terms of Service
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  Cookie Policy
                </motion.a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  href="mailto:support@mindminemoney.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  support@mindminemoney.com
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  Bangkok, Thailand
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} MindMine Money. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <motion.a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-4.997 5.238a8.8 8.8 0 00-6.098 6.098l-4.997-5.238a8.8 8.8 0 00-6.098-6.098z"/>
              </svg>
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white transition-colors"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-3.466h3.554v3.466h-3.554v-3.466z"/>
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
