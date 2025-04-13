'use client';
import { motion } from 'framer-motion';
import { 
  Home,
  Receipt,
  QrCode,
  FileText,
  Settings,
  LogOut,
  User
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const userLinks = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: Home,
    color: 'text-blue-500',
  },
  {
    name: 'Receipts',
    href: '/dashboard/receipts',
    icon: Receipt,
    color: 'text-green-500',
  },
  {
    name: 'Scan Code',
    href: '/dashboard/scan',
    icon: QrCode,
    color: 'text-purple-500',
  },
  {
    name: 'Reports',
    href: '/dashboard/reports',
    icon: FileText,
    color: 'text-yellow-500',
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    color: 'text-pink-500',
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    color: 'text-gray-400',
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex h-full flex-col bg-gray-900 p-4"
    >
      <div className="mb-8 flex items-center justify-center">
        <Link href="/dashboard">
        <div className="rounded-lg bg-blue-500/10 p-3 flex items-center gap-2">
            <User className="h-6 w-6 text-blue-500" />
            <span className="font-semibold text-lg">User Account</span>
          </div>
          
        
        </Link>
      </div>

      <nav className="flex-1 space-y-2">
        {userLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className={`h-5 w-5 ${link.color}`} />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
      >
        <LogOut className="h-5 w-5 text-red-500" />
        <span>Sign Out</span>
      </button>
    </motion.div>
  );
} 