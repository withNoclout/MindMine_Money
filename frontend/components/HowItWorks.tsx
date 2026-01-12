'use client';

import { motion } from 'framer-motion';
import { Upload, Brain, Wallet, ArrowRight } from 'lucide-react';
import { useRef } from 'react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Content',
    description: 'Share your knowledge by uploading videos, PDFs, or teaching materials. Our platform supports multiple formats for maximum flexibility.',
    delay: 0.2,
  },
  {
    icon: Brain,
    title: 'AI Valuation',
    description: 'Our advanced AI analyzes your content against curriculum standards using Whisper transcription, OCR, and semantic matching.',
    delay: 0.4,
  },
  {
    icon: Wallet,
    title: 'Earn Credits',
    description: 'Get fair compensation based on content quality and curriculum alignment. Withdraw earnings directly to your Thai bank account.',
    delay: 0.6,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      {/* Connection line background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" aria-hidden="true">
        <motion.path
          d="M33.33% 50% L66.66% 50%"
          stroke="#E5E5E5"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ pathLength: { duration: 1, ease: "easeOut" }, delay: 0.5 }}
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three simple steps to transform education and earn fair compensation
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -20 : index === 2 ? 20 : 0, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: step.delay }}
              whileHover={{ y: -8 }}
              className="relative"
            >
              {/* Step Number */}
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center text-xl font-bold rounded"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {index + 1}
              </motion.div>

              {/* Card */}
              <div className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 p-8 h-full shadow-sm hover:shadow-lg hover:border-black transition-all duration-300 rounded-lg">
                {/* Icon */}
                <div className="mb-6">
                  <step.icon className="w-12 h-12 text-black" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-black mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow (not for last item) - animated */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: step.delay + 0.3 }}
                >
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  >
                    <ArrowRight className="w-8 h-8 text-gray-400" strokeWidth={2} />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.a
            href="#educator"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-black text-white rounded"
            whileHover={{ scale: 1.05, backgroundColor: "#262626" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Get Started Today
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
