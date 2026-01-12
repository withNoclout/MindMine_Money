'use client';

import { motion } from 'framer-motion';
import { Upload, FileText, Target, Award, ArrowRight, Zap } from 'lucide-react';

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
                {/* Step Card with Pulsing Effect */}
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-6 rounded-xl hover:bg-white/90 transition-colors duration-300 h-full"
                >
                  {/* Icon with Pulsing Animation */}
                  <div className="mb-4 relative inline-block">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [1, 0.8, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="absolute inset-0 bg-black/10 rounded-lg"
                    />
                    <div className="relative w-12 h-12 bg-black text-white flex items-center justify-center rounded-lg">
                      <step.icon className="w-6 h-6" strokeWidth={2} />
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-black mb-2">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-gray-600">
                    {step.description}
                  </p>
                </motion.div>

                {/* Animated Arrow with Connected Line */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: step.delay + 0.2 }}
                    className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2"
                  >
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6 text-black" strokeWidth={3} />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack with Enhanced Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
              whileHover={{ 
                y: -8, 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-br from-black to-gray-800 text-white p-8 rounded-xl cursor-pointer relative overflow-hidden group"
            >
              {/* Pulsing background effect on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                className="absolute inset-0 bg-white"
              />
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {tech.icon}
                </motion.div>
                <h4 className="text-xl font-bold mb-3 group-hover:translate-x-1 transition-transform duration-300">
                  {tech.title}
                </h4>
                <p className="text-gray-300 text-sm group-hover:text-gray-100 transition-colors duration-300">
                  {tech.description}
                </p>
              </div>

              {/* Animated accent line */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badge with Pulsing Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="inline-block bg-white/80 backdrop-blur-sm border-2 border-black px-8 py-6 rounded-xl relative group"
          >
            {/* Pulsing background */}
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 0 0 rgba(0, 0, 0, 0.3)',
                  '0 0 0 10px rgba(0, 0, 0, 0)',
                  '0 0 0 0 rgba(0, 0, 0, 0)'
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: 'easeOut'
              }}
              className="absolute inset-0"
            />
            
            {/* Content */}
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="inline-block mb-2"
              >
                <Zap className="w-5 h-5 text-black" />
              </motion.div>
              <p className="text-sm text-gray-600 mb-2">
                AI-POWERED CONTENT VALUATION
              </p>
              <p className="text-lg font-bold text-black">
                Fair • Transparent • Fast
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
