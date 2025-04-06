'use client';

import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    description: 'Perfect for small businesses and startups',
    features: [
      'Real-time monitoring',
      'Basic analytics',
      'Email support',
      'Up to 5 applications',
      '24/7 system monitoring',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    price: '$79',
    period: '/month',
    description: 'Ideal for growing businesses',
    features: [
      'Everything in Starter',
      'Advanced analytics',
      'Priority support',
      'Up to 20 applications',
      'Custom dashboards',
      'API access',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with specific needs',
    features: [
      'Everything in Professional',
      'Custom solutions',
      'Dedicated support',
      'Unlimited applications',
      'Advanced security',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export function PricingPlans() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${
            plan.popular ? 'ring-2 ring-blue-600' : ''
          }`}
        >
          {plan.popular && (
            <div className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
              Most Popular
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-bold">{plan.price}</span>
            <span className="text-gray-600 dark:text-gray-300 ml-1">{plan.period}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button
            className={`w-full py-3 px-6 rounded-lg font-semibold ${
              plan.popular
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {plan.cta}
          </button>
        </div>
      ))}
    </div>
  );
} 