'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, FileText, Scan, Activity, User } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface DashboardStats {
  totalReceipts: number;
  totalVAT: number;
  totalScans: number;
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    date: string;
  }>;
  applicationStatus?: string;
}

const statCards = [
  {
    title: 'Total Receipts',
    icon: Receipt,
    color: 'bg-blue-500/10 text-blue-500',
    value: (stats: DashboardStats) => stats.totalReceipts.toString(),
  },
  {
    title: 'Total VAT',
    icon: FileText,
    color: 'bg-green-500/10 text-green-500',
    value: (stats: DashboardStats) => `$${stats.totalVAT.toFixed(2)}`,
  },
  {
    title: 'Scanned Codes',
    icon: Scan,
    color: 'bg-purple-500/10 text-purple-500',
    value: (stats: DashboardStats) => stats.totalScans.toString(),
  },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalReceipts: 0,
    totalVAT: 0,
    totalScans: 0,
    recentActivities: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('/api/user/dashboard');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <div className="h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-3 text-gray-300">
          <User className="h-5 w-5" />
          <span>Welcome back, {session?.user?.name}</span>
        </div>
      </div>

      {stats.applicationStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-gray-800 p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Application Status</h2>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="capitalize text-gray-300">{stats.applicationStatus}</span>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-lg bg-gray-800 p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-400">{card.title}</h3>
              <div className={`rounded-full p-2 ${card.color}`}>
                <card.icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-white">{card.value(stats)}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-lg bg-gray-800 p-6 border border-gray-700"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activities</h2>
        <div className="space-y-4">
          {stats.recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between py-3 border-b border-gray-700"
            >
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-blue-500" />
                <span className="text-gray-300">{activity.description}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(activity.date).toLocaleDateString()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 