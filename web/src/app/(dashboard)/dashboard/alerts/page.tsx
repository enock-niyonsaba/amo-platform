'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Trash2,
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS';
  title: string;
  message: string;
  status: 'ACTIVE' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
  user?: {
    name: string;
    email: string;
  };
}

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts');
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = async (id: string) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'DISMISSED' }),
      });

      if (response.ok) {
        setAlerts(alerts.map(alert =>
          alert.id === id ? { ...alert, status: 'DISMISSED' } : alert
        ));
      }
    } catch (error) {
      console.error('Error dismissing alert:', error);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      const response = await fetch(`/api/alerts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'RESOLVED' }),
      });

      if (response.ok) {
        setAlerts(alerts.map(alert =>
          alert.id === id ? { ...alert, status: 'RESOLVED' } : alert
        ));
      }
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type === 'all' || alert.type === filters.type;
    const matchesStatus = filters.status === 'all' || alert.status === filters.status;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type: Alert['type']) => {
    switch (type) {
      case 'INFO':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'WARNING':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'ERROR':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'SUCCESS':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: Alert['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'RESOLVED':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'DISMISSED':
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'INFO':
        return <AlertCircle className="w-4 h-4" />;
      case 'WARNING':
        return <AlertCircle className="w-4 h-4" />;
      case 'ERROR':
        return <XCircle className="w-4 h-4" />;
      case 'SUCCESS':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Alerts
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Monitor and manage system alerts
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Filter by alert type"
                >
                  <option value="all">All Types</option>
                  <option value="INFO">Info</option>
                  <option value="WARNING">Warning</option>
                  <option value="ERROR">Error</option>
                  <option value="SUCCESS">Success</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Filter by alert status"
                >
                  <option value="all">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="DISMISSED">Dismissed</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <div className="p-6 text-center">
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No alerts found
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full ${getTypeColor(alert.type)} flex items-center justify-center`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {alert.title}
                        </h3>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {alert.message}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        {alert.user && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {alert.user.name}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(alert.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {alert.status === 'ACTIVE' && (
                      <>
                        <button
                          onClick={() => handleResolve(alert.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Resolve
                        </button>
                        <button
                          onClick={() => handleDismiss(alert.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                          Dismiss
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 