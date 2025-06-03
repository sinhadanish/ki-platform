"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, Heart, Brain, Shield, Users, Sparkles, Globe, Zap, Star, Target, Settings, UserCheck, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-blue-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-semibold text-gray-700">
                About Us
              </span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-800">Building Bridges Between</span>
              <br />
              <motion.span 
                className="inline-block"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "linear-gradient(to right, #9333EA, #3B82F6, #10B981, #9333EA)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Hearts and Technology
              </motion.span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ki is more than an AI companion—it&apos;s a revolution in how we understand, 
              express, and nurture human connections in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full mb-6"
              >
                <Star className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-gray-700">
                  Our Mission
                </span>
              </motion.div>
              
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
                Empowering Every Voice
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
                We believe that everyone deserves to feel heard and understood in their 
                relationships. Ki was created to bridge the gap between technology and 
                human emotion, providing 24/7 support for couples and individuals seeking 
                deeper connection and understanding.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Our mission is to democratize access to emotional intelligence tools, 
                making relationship support available to everyone, everywhere, at any time.
              </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full mb-6"
            >
              <Heart className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-semibold text-gray-700">
                Our Values
              </span>
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values shape every interaction and innovation at Ki
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: Heart,
                title: "Empathy First",
                description: "We approach every interaction with compassion and understanding.",
                gradient: "from-pink-500 to-rose-600",
                bgGradient: "from-pink-50 to-rose-50",
              },
              {
                icon: Shield,
                title: "Privacy Protected",
                description: "Your conversations are completely private and never stored.",
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-50 to-indigo-50",
              },
              {
                icon: Brain,
                title: "Science-Based",
                description: "Our approach is grounded in relationship research and psychology.",
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-50 to-purple-100",
              },
              {
                icon: Users,
                title: "Inclusive Design",
                description: "Ki is designed to support all types of relationships and people.",
                gradient: "from-green-400 to-green-500",
                bgGradient: "from-green-50 to-emerald-50",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`relative h-full bg-gradient-to-br ${value.bgGradient} rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300`}>
                  <motion.div
                    className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${value.gradient} p-0.5`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-6"
            >
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700">
                Technology
              </span>
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              The Science Behind Ki
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge AI meets proven relationship psychology
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Voice Analysis",
                description: "Real-time emotional detection through advanced voice processing",
                features: ["Tone recognition", "Emotion mapping", "Pattern analysis"],
                icon: Brain,
                gradient: "from-purple-500 to-purple-600",
              },
              {
                title: "AI Understanding",
                description: "Natural language processing that truly comprehends context",
                features: ["Contextual awareness", "Nuanced responses", "Memory integration"],
                icon: Sparkles,
                gradient: "from-blue-500 to-blue-600",
              },
              {
                title: "Personalized Guidance",
                description: "Tailored insights based on your unique relationship dynamics",
                features: ["Custom strategies", "Progress tracking", "Adaptive learning"],
                icon: UserCheck,
                gradient: "from-green-400 to-green-500",
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${tech.gradient} flex items-center justify-center`}>
                    <tech.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-800">
                    {tech.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {tech.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {tech.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tech.gradient}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl p-12 border border-blue-500/20"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-0.5">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Privacy is Sacred
                </h2>
              </div>
              
              <div className="space-y-4 text-lg text-gray-600">
                <p className="leading-relaxed">
                  Ki operates on a fundamental principle: <span className="font-semibold text-gray-800">your conversations belong to you alone</span>. 
                  We never record, store, or analyze your sessions beyond the moment they occur.
                </p>
                <p className="leading-relaxed">
                  All processing happens in real-time, and once your session ends, no trace of 
                  your conversation remains. We believe that true emotional safety requires 
                  complete privacy—and we&apos;ve built Ki from the ground up to honor that belief.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  "Zero Data Storage",
                  "Real-Time Processing",
                  "End-to-End Privacy",
                  "HIPAA Compliant",
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="px-4 py-2 bg-white rounded-full border border-gray-200 text-sm font-medium text-gray-700"
                  >
                    {feature}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-green-400/5" />
        
        <div className="max-w-7xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-transparent">
                Ready to Transform Your Relationships?
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands who are discovering deeper connections and lasting harmony with Ki.
            </p>
            
            <Link
              href="/"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <span>Experience Ki Now</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}