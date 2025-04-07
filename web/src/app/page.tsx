'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {  Moon,  Sun,  LogIn,  Zap,  Activity,  Settings,  Shield,  ChevronRight,  Clock,  Database,  FileText,  Send,  User,  Mail,  Phone,  MapPin} from 'lucide-react';
import Link from 'next/link';

import { Footer } from '@/footer/Footer';
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { isDark, toggleTheme, mounted } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Show success message
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c]">
      {/* Navigation */}
      <nav className="fixed w-full bg-[#0a0f1c]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AMO</span>
            </Link>

            <div className="flex items-center gap-8">
              <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-300" />
                )}
              </button>

              <Link href="/login">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors">
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <h1 className="text-6xl font-bold mb-6 text-blue-600">
              Welcome to AMO Platform
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Your all-in-one solution for modern application monitoring and optimization.
              Experience seamless tracking, real-time analytics, and powerful insights.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/get-started">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
                  Get Started
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/learn-more">
                <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-colors">
                  Learn More
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {[
              {
                icon: Activity,
                title: "Real-time Monitoring",
                description: "Monitor your application's performance in real-time with detailed metrics and insights."
              },
              {
                icon: Shield,
                title: "Advanced Security",
                description: "Keep your application secure with our advanced security features and threat detection."
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
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-[#151b2b] p-6 rounded-xl hover:bg-[#1a2137] transition-colors"
              >
                <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="text-center mb-32">
            <h2 className="text-4xl font-bold mb-12 text-white">About AMO</h2>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-75"></div>
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <User className="w-16 h-16 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-semibold mb-3 text-white">Enock NIYONSABA</h3>
              <p className="text-gray-400 mb-8 text-lg">AMO Founder</p>
              <div className="flex justify-center gap-8 text-gray-400">
                <a href="mailto:contact@amo.com" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                  <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  contact@amo.com
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                  <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  +1 (234) 567-890
                </a>
                <div className="flex items-center gap-3 group">
                  <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  Kigali, Rwanda
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-white">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-400">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow resize-none"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-shadow font-medium"
              >
                Send Message
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}