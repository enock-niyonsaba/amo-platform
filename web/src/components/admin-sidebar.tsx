'use client';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Key,
  FileText,
  AlertTriangle,
  MessageSquare,
  Settings,
  Shield,
  Activity,
  RefreshCcw,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

import { cn } from '@/lib/utils';

const adminLinks = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboard,
    color: 'text-blue-500',
  },
  {
    href: '/dashboard/users',
    label: 'Users',
    icon: Users,
    color: 'text-green-500',
  },
  {
    href: '/dashboard/applications',
    label: 'Applications',
    icon: FileText,
    color: 'text-purple-500',
  },
  {
    href: '/dashboard/licenses',
    label: 'Licenses',
    icon: Key,
    color: 'text-yellow-500',
  },
  {
    href: '/dashboard/alerts',
    label: 'Alerts',
    icon: AlertTriangle,
    color: 'text-red-500',
  },
  {
    href: '/dashboard/messages',
    label: 'Messages',
    icon: MessageSquare,
    color: 'text-pink-500',
  },
  {
    href: '/dashboard/logs',
    label: 'Activity Log',
    icon: Activity,
    color: 'text-indigo-500',
  },
  {
    href: '/dashboard/sync',
    label: 'System Sync',
    icon: RefreshCcw,
    color: 'text-cyan-500',
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
    color: 'text-gray-400',
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      bounce: 0.3
    }
  })
};

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full flex-col bg-gray-900 text-white"
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <motion.div 
            className="rounded-lg bg-blue-500/10 p-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Shield className="h-6 w-6 text-blue-500" />
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Admin Panel
          </motion.span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {adminLinks.map((link, index) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <motion.div
              key={link.href}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-800/80 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <motion.div 
                  className={`rounded-lg p-2 ${isActive ? 'bg-gray-700' : 'bg-gray-800/30'}`}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={`h-5 w-5 ${link.color}`} />
                </motion.div>
                <span>{link.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex items-center gap-3 m-4 rounded-lg px-4 py-3 text-gray-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Settings className="h-5 w-5" />
        <span>Sign Out</span>
      </motion.button>
    </motion.div>
  );
} 