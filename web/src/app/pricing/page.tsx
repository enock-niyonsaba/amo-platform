'use client';

import { motion } from 'framer-motion';
import { Check, Zap, Shield, Database, Users, Settings } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    name: 'Starter',
    price: '$29',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 5 users',
      'Basic monitoring',
      'Standard support',
      '1GB storage',
      'Email notifications',
      'Basic analytics'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Professional',
    price: '$99',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 20 users',
      'Advanced monitoring',
      'Priority support',
      '10GB storage',
      'SMS & Email notifications',
      'Advanced analytics',
      'Custom integrations',
      'API access'
    ],
    cta: 'Get Started',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations with custom needs',
    features: [
      'Unlimited users',
      'Full monitoring suite',
      '24/7 dedicated support',
      'Unlimited storage',
      'Multi-channel notifications',
      'Custom analytics',
      'Advanced integrations',
      'Dedicated API access',
      'Custom development',
      'SLA guarantee'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 ${
                tier.popular
                  ? 'ring-2 ring-blue-600 dark:ring-blue-400 transform scale-105'
                  : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h2>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {tier.price}
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Check className="w-5 h-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={tier.cta === 'Contact Sales' ? '/contact' : '/get-started'}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-lg font-medium ${
                    tier.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tier.cta}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            All Plans Include
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-600" />
              <span className="text-gray-600 dark:text-gray-300">Real-time monitoring</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-gray-600 dark:text-gray-300">Security features</span>
            </div>
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-600" />
              <span className="text-gray-600 dark:text-gray-300">Data backup</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="text-gray-600 dark:text-gray-300">User management</span>
            </div>
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-600" />
              <span className="text-gray-600 dark:text-gray-300">Custom settings</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 