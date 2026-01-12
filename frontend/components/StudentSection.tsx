'use client';

import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, Wallet, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: CheckCircle,
    title: 'AI-Vetted Content',
    description: 'Quality guaranteed. All content is analyzed and scored against curriculum standards before publication.',
    delay: 0.2,
  },
  {
    icon: Wallet,
    title: 'Credit System',
    description: 'Flexible payments using credits. Purchase what you need, when you need it, with competitive pricing.',
    delay: 0.3,
  },
  {
    icon: BookOpen,
    title: 'All Grade Levels',
    description: 'From Grade 1 to University level. Comprehensive coverage of subjects and topics.',
    delay: 0.4,
  },
  {
    icon: Wallet,
    title: 'PromptPay Support',
    description: 'Thai-friendly payment option. Use PromptPay QR codes for quick and easy top-ups.',
    delay: 0.5,
  },
];

export default function StudentSection() {
  return (
    <section id="students" className="py-24 bg-white">
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
            For Students
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quality Education, Affordable Prices.
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
              className="bg-gray-50 border-2 border-gray-200 p-8 hover:border-black transition-colors duration-300"
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

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-black mb-2">10,000+</div>
            <div className="text-sm text-gray-600">Content Pieces</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-black mb-2">AI-Powered</div>
            <div className="text-sm text-gray-600">Quality Scoring</div>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-black mb-2">24/7</div>
            <div className="text-sm text-gray-600">Access Anytime</div>
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
            href="#student"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-black text-white hover:bg-gray-800 transition-all duration-300"
          >
            Start Learning
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-gray-600">
            Browse quality content today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
