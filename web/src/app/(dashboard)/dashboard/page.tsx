'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, FileText, Scan, Activity, User, Users, AlertCircle, MessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface UserDashboardStats {
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

interface AdminDashboardStats {
  totalUsers: number;
  activeLicenses: number;
  pendingAlerts: number;
  unreadMessages: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
  }>;
}

type DashboardStats = UserDashboardStats | AdminDashboardStats;

const userStatCards = [
  {
    title: 'Total Receipts',
    icon: Receipt,
    color: 'bg-blue-500/10 text-blue-500',
    value: (stats: UserDashboardStats) => stats.totalReceipts.toString(),
  },
  {
    title: 'Total VAT',
    icon: FileText,
    color: 'bg-green-500/10 text-green-500',
    value: (stats: UserDashboardStats) => `$${stats.totalVAT.toFixed(2)}`,
  },
  {
    title: 'Scanned Codes',
    icon: Scan,
    color: 'bg-purple-500/10 text-purple-500',
    value: (stats: UserDashboardStats) => stats.totalScans.toString(),
  },
];

const adminStatCards = [
  {
    title: 'Total Users',
    icon: Users,
    color: 'bg-blue-500/10 text-blue-500',
    value: (stats: AdminDashboardStats) => stats.totalUsers.toString(),
  },
  {
    title: 'Active Licenses',
    icon: FileText,
    color: 'bg-green-500/10 text-green-500',
    value: (stats: AdminDashboardStats) => stats.activeLicenses.toString(),
  },
  {
    title: 'Pending Alerts',
    icon: AlertCircle,
    color: 'bg-yellow-500/10 text-yellow-500',
    value: (stats: AdminDashboardStats) => stats.pendingAlerts.toString(),
  },
  {
    title: 'Unread Messages',
    icon: MessageSquare,
    color: 'bg-purple-500/10 text-purple-500',
    value: (stats: AdminDashboardStats) => stats.unreadMessages.toString(),
  },
];

const defaultUserStats: UserDashboardStats = {
  totalReceipts: 0,
  totalVAT: 0,
  totalScans: 0,
  recentActivities: [],
};

const defaultAdminStats: AdminDashboardStats = {
  totalUsers: 0,
  activeLicenses: 0,
  pendingAlerts: 0,
  unreadMessages: 0,
  recentActivity: [],
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats>(defaultUserStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const endpoint = session?.user?.role === 'ADMIN' 
          ? '/api/dashboard/stats' 
          : '/api/user/dashboard';
        
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await response.json();
        setStats(data || (session?.user?.role === 'ADMIN' ? defaultAdminStats : defaultUserStats));
        setError(null);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data');
        setStats(session?.user?.role === 'ADMIN' ? defaultAdminStats : defaultUserStats);
      } finally {
        setIsLoading(false);
      }
    }

    if (session) {
      fetchDashboardData();
    }
  }, [session]);

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

  const isAdmin = session?.user?.role === 'ADMIN';
  const statCards = isAdmin ? adminStatCards : userStatCards;
  const currentStats = isAdmin ? (stats as AdminDashboardStats) : (stats as UserDashboardStats);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-3 text-gray-300">
          <User className="h-5 w-5" />
          <span>Welcome back, {session?.user?.name}</span>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-red-500/10 p-4 text-red-400 border border-red-500/20"
        >
          {error}
        </motion.div>
      )}

      {!isAdmin && 'applicationStatus' in stats && stats.applicationStatus && (
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
            <p className="mt-4 text-3xl font-bold text-white">
              {card.value(currentStats)}
            </p>
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
          {(isAdmin ? (stats as AdminDashboardStats).recentActivity : (stats as UserDashboardStats).recentActivities).map((activity, index) => (
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
                {new Date('timestamp' in activity ? activity.timestamp : activity.date).toLocaleDateString()}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 