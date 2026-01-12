'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Zap, Shield, FileVideo, ArrowRight, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

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

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'High School Math Educator',
    quote: 'The fair AI valuation finally gives my work the recognition it deserves. I earned 3x more in 3 months.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  },
  {
    name: 'James Rodriguez',
    role: 'University Physics Professor',
    quote: 'Love the 70% revenue share. Transparent, fair, and the payout is always on time.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
  },
  {
    name: 'Priya Patel',
    role: 'Biology Content Creator',
    quote: 'Finally a platform that respects educators. The withdrawal process to my Thai bank is seamless.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
  {
    name: 'David Lee',
    role: 'English Language Specialist',
    quote: 'The platform accepted my video lectures and PDFs without any hassle. Best teaching platform yet.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
  },
  {
    name: 'Emma Watson',
    role: 'Chemistry Instructor',
    quote: 'What impressed me most is the transparency. I know exactly how my content is being valued.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
  },
  {
    name: 'Ahmed Hassan',
    role: 'STEM Education Expert',
    quote: 'MindMine Money changed how I teach. Now my quality work is properly rewarded.',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
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
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-8 rounded-xl hover:bg-white/90 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-lg">
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

        {/* Stats Section with Counter Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm border border-gray-200/50 text-black p-12 mb-16 rounded-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">
                <CounterAnimation value={70} suffix="%" />
              </div>
              <div className="text-gray-600">Revenue Share</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">
                <CounterAnimation value={5} suffix=" min" />
              </div>
              <div className="text-gray-600">Valuation Time</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">
                <CounterAnimation value={500} suffix="+" />
              </div>
              <div className="text-gray-600">Active Educators</div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-black text-center mb-12"
          >
            What Our Educators Say
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.08)' }}
                className="bg-white/80 backdrop-blur-sm border border-gray-200/50 p-6 rounded-lg flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-sm mb-4 flex-grow">"{testimonial.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200/50">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-sm text-black">{testimonial.name}</div>
                    <div className="text-xs text-gray-600">{testimonial.role}</div>
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
