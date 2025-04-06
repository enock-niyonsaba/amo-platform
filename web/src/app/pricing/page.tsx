import type { Metadata } from 'next';
import { PricingPlans } from '@/components/pricing-plans';

export const metadata: Metadata = {
  title: 'Pricing - AMO Platform',
  description: 'Choose the perfect plan for your application monitoring needs',
};

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans</h1>
      <PricingPlans />
    </div>
  );
} 