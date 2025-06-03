"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, Brain, Smartphone, Code, TrendingUp, Sparkles, MapPin, Clock, Users, Zap, Heart, Star, CheckCircle, Mail, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const jobOpenings = [
  {
    id: "ai-ml-engineer",
    category: "Engineering",
    title: "AI/ML Engineer",
    type: "Full-time",
    location: "Remote",
    description: "Shape the future of emotional AI by developing cutting-edge ML models for voice analysis and natural language understanding.",
    requirements: [
      "5+ years in ML/AI development",
      "Experience with voice processing & NLP",
      "Python, TensorFlow/PyTorch expertise",
      "Published research is a plus"
    ],
    icon: Brain,
    gradient: "from-purple-500 to-purple-600",
    bgGradient: "from-purple-50 to-purple-100",
  },
  {
    id: "flutter-developer",
    category: "Engineering",
    title: "Senior Flutter Developer",
    type: "Full-time",
    location: "Remote",
    description: "Build beautiful, performant mobile experiences that help millions connect more deeply in their relationships.",
    requirements: [
      "4+ years Flutter development",
      "iOS & Android deployment experience",
      "State management (Riverpod/Bloc)",
      "UI/UX design sensibility"
    ],
    icon: Smartphone,
    gradient: "from-blue-500 to-blue-600",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    id: "nextjs-developer",
    category: "Engineering",
    title: "Next.js Full Stack Developer",
    type: "Full-time",
    location: "Remote",
    description: "Create responsive web applications that deliver Ki's emotional intelligence to users worldwide.",
    requirements: [
      "3+ years Next.js/React experience",
      "TypeScript proficiency",
      "API design & integration",
      "Performance optimization skills"
    ],
    icon: Code,
    gradient: "from-green-400 to-green-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    id: "growth-hacker",
    category: "Marketing",
    title: "Growth Hacker",
    type: "Full-time",
    location: "Remote",
    description: "Drive exponential user growth through data-driven experiments and creative marketing strategies.",
    requirements: [
      "Proven track record of scaling startups",
      "A/B testing & analytics expertise",
      "Content marketing & SEO skills",
      "Community building experience"
    ],
    icon: TrendingUp,
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 to-orange-50",
  }
]

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health coverage plus mental health support"
  },
  {
    icon: Users,
    title: "Remote First",
    description: "Work from anywhere with flexible hours"
  },
  {
    icon: TrendingUp,
    title: "Equity Package",
    description: "Meaningful ownership in Ki's success"
  },
  {
    icon: Sparkles,
    title: "Learning Budget",
    description: "$5k annual budget for courses and conferences"
  }
]

const values = [
  "Build technology that truly helps people",
  "Work with a world-class, mission-driven team",
  "Shape the future of AI-powered emotional intelligence",
  "Make a real difference in millions of relationships"
]

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<typeof jobOpenings[0] | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-green-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
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
              <Zap className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-semibold text-gray-700">
                Join Our Team
              </span>
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gray-800">Build the Future of</span>
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
                Human Connection
              </motion.span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Join a passionate team revolutionizing how people understand and nurture 
              their relationships through cutting-edge AI technology.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-700">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400/10 to-blue-500/10 rounded-full mb-6"
            >
              <Star className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-gray-700">
                Open Positions
              </span>
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Find Your Role at Ki
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re looking for talented individuals who share our vision
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`h-full bg-gradient-to-br ${job.bgGradient} rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-300`}>
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-r ${job.gradient} p-0.5`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                          <job.icon className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                        </div>
                      </motion.div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">{job.category}</span>
                        <h3 className="text-2xl font-bold text-gray-800">{job.title}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Requirements:</h4>
                    <ul className="space-y-2">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${job.gradient} mt-1.5`} />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Apply Button */}
                  <motion.button
                    onClick={() => setSelectedJob(job)}
                    className="w-full relative group/btn font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-500 text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="max-w-7xl mx-auto px-6 relative">
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
                Benefits & Perks
              </span>
            </motion.div>
            
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Why You&apos;ll Love Working Here
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in taking care of our team so they can take care of our users
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-0.5"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <benefit.icon className="w-10 h-10 text-gray-700" strokeWidth={1.5} />
                  </div>
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
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
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              Don&apos;t See Your Role?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for exceptional talent. Send us your resume and 
              tell us how you can contribute to Ki&apos;s mission.
            </p>
            
            <motion.a
              href="mailto:careers@askki.org"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get in Touch</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Modal content */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Mail className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Apply for {selectedJob.title}
                </h3>

                <div className="text-left bg-gray-50 rounded-xl p-6 mb-6">
                  <p className="text-gray-700 mb-4">
                    To apply for this position, please send your application to:
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                    <p className="text-lg font-mono text-blue-600">
                      apply@askki.org
                    </p>
                  </div>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="font-semibold text-gray-700">Please include:</p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                        <span>Your resume/CV in PDF format</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                        <span>Cover letter explaining why you're passionate about Ki's mission</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                        <span>Subject line: "{selectedJob.title} Application - [Your Name]"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                        <span>Links to relevant portfolio/GitHub projects (if applicable)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedJob(null)}
                  className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                >
                  Got it!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}