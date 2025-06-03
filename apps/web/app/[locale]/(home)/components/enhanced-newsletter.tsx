'use client';

import type { Dictionary } from '@repo/internationalization';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Sparkles, 
  ArrowRight, 
  Check,
  Heart,
  Users,
  Star
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@repo/design-system/components/ui/button';
import { Input } from '@repo/design-system/components/ui/input';

type EnhancedNewsletterProps = {
  dictionary: Dictionary;
};

export const EnhancedNewsletter = ({ dictionary }: EnhancedNewsletterProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail('');
      // You can add your actual newsletter subscription logic here
    } catch (error) {
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-l from-blue-500/10 to-green-400/10 rounded-full blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        {/* Section badge */}
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Mail className="w-4 h-4 text-purple-500" />
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Stay Connected
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Join Our Journey
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p 
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Get exclusive updates on Ki's development, relationship insights, and be the first to know about new features that enhance emotional connections.
        </motion.p>

        {/* Newsletter form */}
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative group">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-full focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors bg-white dark:bg-gray-800 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  required
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="relative group bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 disabled:opacity-50 overflow-hidden"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Subscribing...</span>
                    </div>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
                </Button>
              </motion.div>
            </form>
          ) : (
            <motion.div
              className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-full border border-green-200 dark:border-green-800"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 500 }}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="text-green-700 dark:text-green-300 font-medium">Thank you for subscribing!</span>
            </motion.div>
          )}
        </motion.div>

        {/* Features/Benefits */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: Sparkles,
              title: "Exclusive Insights",
              description: "Get early access to relationship tips and emotional intelligence content",
              gradient: "from-purple-500 to-blue-500"
            },
            {
              icon: Heart,
              title: "Product Updates",
              description: "Be the first to know about new Ki features and improvements",
              gradient: "from-pink-500 to-purple-500"
            },
            {
              icon: Users,
              title: "Community Access",
              description: "Join our community of people building healthier relationships",
              gradient: "from-blue-500 to-green-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${feature.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-gray-700 dark:text-gray-300" strokeWidth={1.5} />
                </div>
              </motion.div>
              
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Privacy note */}
        <motion.p 
          className="text-xs text-gray-500 dark:text-gray-400 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          We respect your privacy. Unsubscribe at any time. No spam, ever.
        </motion.p>
      </div>
    </section>
  );
};