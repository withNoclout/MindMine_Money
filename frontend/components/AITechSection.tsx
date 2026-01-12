'use client';

import { motion } from 'framer-motion';
import { Upload, FileText, Target, Award, ArrowRight } from 'lucide-react';

const processSteps = [
  {
    icon: Upload,
    title: 'Upload',
    description: 'Video lectures, PDFs, or teaching materials',
    delay: 0.1,
  },
  {
    icon: FileText,
    title: 'Extract',
    description: 'Whisper transcription & OCR analysis',
    delay: 0.2,
  },
  {
    icon: Target,
    title: 'Match',
    description: 'Curriculum alignment & semantic similarity',
    delay: 0.3,
  },
  {
    icon: Award,
    title: 'Score',
    description: 'AI-powered credit valuation',
    delay: 0.4,
  },
];

const techStack = [
  {
    title: 'OpenAI Whisper',
    description: 'State-of-the-art speech recognition for video transcription',
    icon: '🎤',
  },
  {
    title: 'Tesseract OCR',
    description: 'Advanced optical character recognition for documents',
    icon: '📄',
  },
  {
    title: 'Semantic Matching',
    description: 'Vector embeddings for intelligent content scoring',
    icon: '🧠',
  },
];

export default function AITechSection() {
  return (
    <section id="technology" className="py-24 bg-gray-50">
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
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cutting-edge technology ensures fair, transparent, and efficient content valuation
          </p>
        </motion.div>

        {/* Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-black text-center mb-12">
            AI Valuation Process
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: step.delay }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white border-2 border-gray-200 p-6 hover:border-black transition-colors duration-300">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center">
                      <step.icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-black mb-2">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </div>

                {/* Arrow */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
              className="bg-black text-white p-8 hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{tech.icon}</div>
              <h4 className="text-xl font-bold mb-3">
                {tech.title}
              </h4>
              <p className="text-gray-300 text-sm">
                {tech.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-white border-2 border-black px-8 py-6">
            <p className="text-sm text-gray-600 mb-2">
              AI-POWERED CONTENT VALUATION
            </p>
            <p className="text-lg font-bold text-black">
              Fair • Transparent • Fast
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
