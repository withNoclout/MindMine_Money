'use client';

import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, Wallet, ArrowRight, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

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

const studentTestimonials = [
  {
    name: 'Lisa Wong',
    role: 'Grade 11 Student',
    quote: 'The AI-vetted content is amazing. I know the material is actually good before I spend credits.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
  },
  {
    name: 'Marcus Johnson',
    role: 'University Student',
    quote: 'PromptPay support is perfect for Thai students like me. Makes top-ups super easy.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
  },
  {
    name: 'Nida Sukara',
    role: 'Grade 10 Student',
    quote: 'Found exactly what I needed for my math class. The credit system is so flexible.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nida',
  },
  {
    name: 'Amara Osei',
    role: 'High School Learner',
    quote: 'Quality content at affordable prices. This platform actually respects students.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara',
  },
  {
    name: 'Kai Tanaka',
    role: 'University Sophomore',
    quote: 'Coverage from Grade 1 to University is incredible. Everything is in one place.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kai',
  },
  {
    name: 'Sophia Martinez',
    role: 'Grade 12 Student',
    quote: 'I trust the content because I know AI has already verified it. No more wasting credits.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
  },
];

// Counter Animation Component
function CounterAnimation({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref as any, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    const increment = value / 30;
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        return next >= value ? value : next;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {Math.round(count).toLocaleString()}{suffix}
    </span>
  );
}

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: benefit.delay }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)' }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl hover:bg-white/90 transition-colors duration-300 h-full"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-lg flex-shrink-0">
                    <benefit.icon className="w-5 h-5" strokeWidth={2} />
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

        {/* Features Highlight with Counter Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 text-center p-8 rounded-xl">
            <div className="text-4xl font-bold text-black mb-2">
              <CounterAnimation value={10000} suffix="+" />
            </div>
            <div className="text-sm text-gray-600">Content Pieces</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 text-center p-8 rounded-xl">
            <div className="text-4xl font-bold text-black mb-2">
              <CounterAnimation value={100} suffix="%" />
            </div>
            <div className="text-sm text-gray-600">AI-Powered Quality</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 text-center p-8 rounded-xl">
            <div className="text-4xl font-bold text-black mb-2">24/7</div>
            <div className="text-sm text-gray-600">Access Anytime</div>
          </div>
        </motion.div>

        {/* Student Testimonials Section */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-black text-center mb-12"
          >
            What Our Students Say
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {studentTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.08)' }}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-4 sm:p-5 md:p-6 rounded-lg flex flex-col h-full"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-xs sm:text-sm mb-4 flex-grow leading-relaxed line-clamp-3">"{testimonial.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200/50">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs sm:text-sm text-black truncate">{testimonial.name}</div>
                    <div className="text-xs text-gray-600 truncate">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

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
