'use client';

import { User, Mail, Phone, MapPin } from 'lucide-react';

export function AboutContent() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
            <User className="w-12 h-12 text-blue-600" />
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-2 text-center">Enock NIYONSABA</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">AMO Founder</p>
      
      <div className="flex justify-center gap-4 text-gray-600 dark:text-gray-300 mb-8">
        <a href="mailto:contact@amo.com" className="flex items-center gap-2 hover:text-blue-600">
          <Mail className="w-5 h-5" />
          contact@amo.com
        </a>
        <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-blue-600">
          <Phone className="w-5 h-5" />
          +1 (234) 567-890
        </a>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Kigali, Rwanda
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Our Mission</h2>
        <p>
          AMO Platform is dedicated to revolutionizing the way applications are monitored and optimized.
          We believe in providing powerful, yet simple-to-use tools that help businesses thrive in the
          digital age.
        </p>

        <h2>Our Vision</h2>
        <p>
          To become the leading platform for application monitoring and optimization, helping businesses
          worldwide achieve their full potential through data-driven insights and powerful tools.
        </p>

        <h2>Our Values</h2>
        <ul>
          <li>Innovation: Constantly pushing boundaries to deliver cutting-edge solutions</li>
          <li>Reliability: Providing stable and dependable services</li>
          <li>Simplicity: Making complex tasks simple and accessible</li>
          <li>Customer Focus: Putting our users at the center of everything we do</li>
        </ul>
      </div>
    </div>
  );
} 