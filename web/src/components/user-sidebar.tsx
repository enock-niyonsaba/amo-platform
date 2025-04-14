'use client';
import { motion } from 'framer-motion';
import { 
  Home,
  Receipt,
  QrCode,
  FileText,
  Settings,
  LogOut,
  User,
  RefreshCcw
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
    name: 'Sync',
    href: '/dashboard/sync',
    icon: RefreshCcw,
    color: 'text-cyan-500',
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

export function UserSidebar() {
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
            <User className="h-6 w-6 text-blue-500" />
          </motion.div>
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            User Panel
          </motion.span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {userLinks.map((link, index) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <motion.div
              key={link.name}
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
                <span>{link.name}</span>
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
        <LogOut className="h-5 w-5" />
        <span>Sign Out</span>
      </motion.button>
    </motion.div>
  );
} 