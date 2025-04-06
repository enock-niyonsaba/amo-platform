'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Database,
  Server,
  Cloud,
} from 'lucide-react';

interface SyncStatus {
  status: 'IDLE' | 'SYNCING' | 'SUCCESS' | 'ERROR';
  lastSync?: string;
  error?: string;
  stats?: {
    totalRecords: number;
    syncedRecords: number;
    failedRecords: number;
  };
}

export default function Sync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ status: 'IDLE' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSync = async () => {
    setIsLoading(true);
    setSyncStatus({ status: 'SYNCING' });

    try {
      const response = await fetch('/api/sync', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Sync failed');
      }

      const data = await response.json();
      setSyncStatus({
        status: 'SUCCESS',
        lastSync: new Date().toISOString(),
        stats: data.stats,
      });
    } catch (error) {
      setSyncStatus({
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: SyncStatus['status']) => {
    switch (status) {
      case 'SUCCESS':
        return 'text-green-600 dark:text-green-400';
      case 'ERROR':
        return 'text-red-600 dark:text-red-400';
      case 'SYNCING':
        return 'text-blue-600 dark:text-blue-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: SyncStatus['status']) => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="w-5 h-5" />;
      case 'ERROR':
        return <XCircle className="w-5 h-5" />;
      case 'SYNCING':
        return <RefreshCw className="w-5 h-5 animate-spin" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Data Synchronization
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and monitor data synchronization between systems
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={isLoading || syncStatus.status === 'SYNCING'}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Syncing...' : 'Start Sync'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Local Database
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Primary data storage
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Server className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Remote Server
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Secondary storage
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Cloud Backup
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Backup storage
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Sync Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(syncStatus.status)}`}>
                {getStatusIcon(syncStatus.status)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {syncStatus.status.charAt(0) + syncStatus.status.slice(1).toLowerCase()}
                </p>
                {syncStatus.lastSync && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Last sync: {new Date(syncStatus.lastSync).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {syncStatus.error && (
              <div className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  {syncStatus.error}
                </p>
              </div>
            )}

            {syncStatus.stats && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Records</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {syncStatus.stats.totalRecords}
                  </p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400">Synced Records</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {syncStatus.stats.syncedRecords}
                  </p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <p className="text-sm text-red-600 dark:text-red-400">Failed Records</p>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {syncStatus.stats.failedRecords}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 