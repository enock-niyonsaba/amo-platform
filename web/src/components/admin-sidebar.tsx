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
  FolderSync,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    icon: FolderSync,
    color: 'text-gray-500',
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
    color: 'text-gray-500',
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex h-full flex-col gap-2 bg-gray-900 text-white"
    >
      <div className="flex h-16 items-center border-b border-gray-800 px-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-500/10 p-2">
            <Shield className="h-6 w-6 text-blue-500" />
          </div>
          <span className="font-semibold text-lg">Admin Dashboard</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start gap-2 px-4">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors',
                    pathname === link.href
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  )}
                >
                  <div className={cn('rounded p-1', link.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span>{link.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.div>
  );
} 