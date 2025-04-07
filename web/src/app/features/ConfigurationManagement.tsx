import { motion } from 'framer-motion';
import { Settings, Sliders, Users, Shield, Workflow, Database } from 'lucide-react';

export function ConfigurationManagement() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Configuration Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Centralized control and management of your application settings and preferences
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
              <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">System Settings</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Manage core system configurations and preferences through an intuitive interface.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg w-fit mb-4">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">User Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Control user access, roles, and permissions with granular configuration options.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg w-fit mb-4">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Security Settings</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Configure security policies, authentication methods, and access controls.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg w-fit mb-4">
              <Workflow className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Workflow Configuration</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Customize business processes and automation workflows to match your needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg w-fit mb-4">
              <Database className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Data Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Configure data retention policies, backup settings, and storage options.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-lg w-fit mb-4">
              <Sliders className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Interface Customization</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Personalize the user interface and customize display preferences.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}