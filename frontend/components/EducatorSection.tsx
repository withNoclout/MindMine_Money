'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Zap, Shield, FileVideo, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Fair AI Valuation',
    description: 'Transparent scoring based on curriculum alignment and content quality. No more subjective evaluations.',
    delay: 0.2,
  },
  {
    icon: Zap,
    title: '70% Revenue Share',
    description: 'Industry-leading revenue split. You keep the majority of what you earn from your content.',
    delay: 0.3,
  },
  {
    icon: Shield,
    title: 'Thai Bank Withdrawals',
    description: 'Direct withdrawals to Thai bank accounts via Omise. PromptPay support for maximum convenience.',
    delay: 0.4,
  },
  {
    icon: FileVideo,
    title: 'Video & PDF Support',
    description: 'Upload teaching materials in multiple formats. Video lectures, PDFs, and GoodNotes files.',
    delay: 0.5,
  },
];

export default function EducatorSection() {
  return (
    <section id="educators" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            For Educators
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Teach What You Know. Earn What You Deserve.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: benefit.delay }}
              className="bg-white border-2 border-gray-200 p-8 hover:border-black transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                    <benefit.icon className="w-6 h-6" strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-black text-white p-12 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">70%</div>
              <div className="text-gray-300">Revenue Share</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Under 5 min</div>
              <div className="text-gray-300">Valuation Time</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-gray-300">Fair & Transparent</div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <a
            href="#educator"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-black text-white hover:bg-gray-800 transition-all duration-300"
          >
            Become an Educator
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-gray-600">
            No hidden fees. Start earning today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
