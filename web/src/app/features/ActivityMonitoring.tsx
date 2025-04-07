import { motion } from 'framer-motion';
import { Activity, BarChart2, LineChart, PieChart, Timer, Zap } from 'lucide-react';

export function ActivityMonitoring() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Activity Monitoring
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive real-time tracking and analytics for your business operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg w-fit mb-4">
              <BarChart2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Real-time Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your business metrics in real-time with interactive dashboards and instant updates.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg w-fit mb-4">
              <LineChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Performance Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track system performance, response times, and resource utilization with detailed graphs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
              <PieChart className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Usage Statistics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Analyze user behavior, feature adoption, and system usage patterns with visual reports.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg w-fit mb-4">
              <Timer className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Response Time Monitoring</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track and optimize system response times to ensure optimal performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg w-fit mb-4">
              <Activity className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">System Health</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor system health metrics and receive alerts for potential issues.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-lg w-fit mb-4">
              <Zap className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">QR Code Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Track QR code usage, scan patterns, and engagement metrics in real-time.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}