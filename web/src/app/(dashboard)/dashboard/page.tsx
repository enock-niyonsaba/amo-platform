'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Key,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  Activity,
  Clock,
  Settings,
  Shield,
} from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalUsers: number;
  activeLicenses: number;
  pendingAlerts: number;
  unreadMessages: number;
  recentActivity: {
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeLicenses: 0,
    pendingAlerts: 0,
    unreadMessages: 0,
    recentActivity: [],
  });

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Active Licenses',
      value: stats.activeLicenses,
      icon: Key,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Pending Alerts',
      value: stats.pendingAlerts,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'Unread Messages',
      value: stats.unreadMessages,
      icon: MessageSquare,
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your system.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 px-4 py-5 shadow sm:px-6 sm:py-6"
          >
            <dt>
              <div className="absolute rounded-md bg-gradient-to-r p-3">
                <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                {card.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {card.value}
              </p>
            </dd>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {stats.recentActivity.map((activity) => (
              <motion.li
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-4 py-4 sm:px-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Activity className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-900 dark:text-white">
                      {activity.description}
                    </p>
                  </div>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:text-gray-200">
                      {activity.type}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <p>{activity.timestamp}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/activity">
          <div className="bg-[#151b2b] p-6 rounded-xl hover:bg-[#1a2137] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Activity Monitoring</h3>
            <p className="text-gray-400">Monitor real-time activity and performance metrics.</p>
          </div>
        </Link>

        <Link href="/dashboard/configuration">
          <div className="bg-[#151b2b] p-6 rounded-xl hover:bg-[#1a2137] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Configuration</h3>
            <p className="text-gray-400">Manage system settings and configurations.</p>
          </div>
        </Link>

        <Link href="/dashboard/license">
          <div className="bg-[#151b2b] p-6 rounded-xl hover:bg-[#1a2137] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">License Management</h3>
            <p className="text-gray-400">View and manage your licenses and subscriptions.</p>
          </div>
        </Link>
      </div>
    </div>
  );
} 