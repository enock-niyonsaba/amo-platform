import { motion } from 'framer-motion';
import { Key, Clock, CreditCard, RefreshCcw, Shield, FileText } from 'lucide-react';

export function LicenseManagement() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            License Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Flexible licensing options with automated renewals and comprehensive management
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
              <Key className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">License Types</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Choose from monthly, annual, or lifetime licenses with flexible terms and conditions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg w-fit mb-4">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Automated Renewals</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Set up automatic license renewals to ensure uninterrupted service for your business.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
              <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Payment Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Secure payment processing and billing management for all license types.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg w-fit mb-4">
              <RefreshCcw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">License Updates</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easily upgrade or modify licenses as your business needs change.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg w-fit mb-4">
              <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Security Features</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Advanced security measures to protect license information and prevent unauthorized use.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-lg w-fit mb-4">
              <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Usage Reports</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Detailed reports on license usage, status, and upcoming renewals.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}