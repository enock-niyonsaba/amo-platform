import type { Metadata } from 'next';
import { AboutContent } from '@/components/about-content';

export const metadata: Metadata = {
  title: 'About - AMO Platform',
  description: 'Learn more about AMO Platform and our mission to revolutionize application monitoring',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">About AMO</h1>
      <AboutContent />
    </div>
  );
} 