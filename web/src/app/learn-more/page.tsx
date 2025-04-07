'use client';

import { motion } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  Settings, 
  Clock, 
  Database, 
  FileText,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Enterprise-grade security with end-to-end encryption and multi-factor authentication."
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Monitor your application's performance in real-time with detailed metrics and insights."
  },
  {
    icon: Settings,
    title: "Easy Configuration",
    description: "Simple and intuitive configuration options to get you started quickly."
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Track time spent on tasks and projects with detailed reporting."
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Efficiently manage and organize your data with powerful tools."
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Generate comprehensive reports with actionable insights."
  }
];

const benefits = [
  "Increased productivity and efficiency",
  "Reduced operational costs",
  "Improved data security",
  "Better decision-making with analytics",
  "Streamlined business processes",
  "Enhanced customer satisfaction"
];

export default function LearnMorePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Learn More About AMO Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover how AMO can transform your business operations with powerful monitoring and optimization tools.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                <p className="text-gray-700 dark:text-gray-300">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of businesses already using AMO to optimize their operations.
          </p>
          <Link href="/get-started">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 mx-auto hover:shadow-lg transition-shadow"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 