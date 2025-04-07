'use client';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Target, Eye, Heart, Users } from 'lucide-react';

export function AboutContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75"></div>
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 p-1">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <User className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Enock NIYONSABA
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">AMO Founder</p>
        
        <div className="flex justify-center gap-6 text-gray-600 dark:text-gray-300">
          <motion.a 
            whileHover={{ scale: 1.05 }}
            href="mailto:contact@amo.com" 
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <Mail className="w-5 h-5" />
            contact@amo.com
          </motion.a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            href="tel:+250 784 638 694" 
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            <Phone className="w-5 h-5" />
            +250 784 638 694
          </motion.a>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            Kigali, Rwanda
          </motion.div>
        </div>
      </motion.div>

      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Our Mission</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            AMO Platform is dedicated to revolutionizing the way applications are monitored and optimized.
            We believe in providing powerful, yet simple-to-use tools that help businesses thrive in the
            digital age.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold">Our Vision</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            To become the leading platform for application monitoring and optimization, helping businesses
            worldwide achieve their full potential through data-driven insights and powerful tools.
          </p>
        </motion.div>
      </div>

      {/* Values Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-semibold">Our Values</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Constantly pushing boundaries to deliver cutting-edge solutions
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Reliability</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Providing stable and dependable services
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Heart className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Simplicity</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Making complex tasks simple and accessible
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <Users className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Customer Focus</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Putting our users at the center of everything we do
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 