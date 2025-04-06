'use client';

import { Activity, Shield, Settings, Clock, Database, FileText } from 'lucide-react';

const features = [
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: 'Monitor your application\'s performance in real-time with detailed metrics and insights.',
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Keep your application secure with our advanced security features and threat detection.',
  },
  {
    icon: Settings,
    title: 'Easy Configuration',
    description: 'Simple and intuitive configuration options to get you started quickly.',
  },
  {
    icon: Clock,
    title: 'Time Tracking',
    description: 'Track time spent on tasks and projects with detailed reporting.',
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Efficiently manage and organize your data with powerful tools.',
  },
  {
    icon: FileText,
    title: 'Detailed Reports',
    description: 'Generate comprehensive reports with actionable insights.',
  },
];

export function FeaturesList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.1)] transition-all duration-300 hover:-translate-y-1 group"
        >
          <feature.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:text-blue-500 transition-colors" />
          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
} 