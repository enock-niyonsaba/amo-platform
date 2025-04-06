import type { Metadata } from 'next';
import { FeaturesList } from '@/components/features-list';

export const metadata: Metadata = {
  title: 'Features - AMO Platform',
  description: 'Discover the powerful features of AMO Platform for application monitoring and optimization',
};

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Features</h1>
      <FeaturesList />
    </div>
  );
} 