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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AMO
                </span>
              </motion.div>
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Features
              </Link>
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                About
              </Link>
              <Link href="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Pricing
              </Link>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Contact
              </Link>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.section
            className="text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to AMO Platform
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your all-in-one solution for modern application monitoring and optimization.
              Experience seamless tracking, real-time analytics, and powerful insights.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/get-started">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-shadow"
                >
                  Get Started
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/learn-more">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-200 dark:bg-gray-700 px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-[0_0_15px_rgba(156,163,175,0.5)] dark:hover:shadow-[0_0_15px_rgba(55,65,81,0.5)] transition-shadow"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.2)] dark:hover:shadow-[0_0_25px_rgba(37,99,235,0.1)] transition-all duration-300 hover:-translate-y-1 group"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:text-blue-500 transition-colors" />
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.section>

          {/* About Section */}
          <motion.section
            className="text-center mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-8">About AMO</h2>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <User className="w-12 h-12 text-blue-600" />
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Enock NIYONSABA</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">AMO Founder</p>
              <div className="flex justify-center gap-4 text-gray-600 dark:text-gray-300">
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
            </div>
          </motion.section>

          {/* Contact Form Section */}
          <motion.section
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 transition-shadow"
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-shadow"
              >
                Send Message
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  );
}