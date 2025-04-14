'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Loader2, 
  Menu, 
  X,
  User,
  Settings,
  Key,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

import { AdminSidebar } from '@/components/admin-sidebar';
import { UserSidebar } from '@/components/user-sidebar';

// Admin-only paths
const ADMIN_PATHS = [
  '/dashboard/users',
  '/dashboard/applications',
  '/dashboard/licenses',
  '/dashboard/alerts',
  '/dashboard/activity',
  '/dashboard/systemlogs',
  '/dashboard/sync'
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    // Check if user is trying to access admin paths
    if (session?.user?.role !== 'ADMIN' && ADMIN_PATHS.some(path => pathname.startsWith(path))) {
      router.push('/dashboard');
      return;
    }

    setIsLoading(false);
  }, [session, status, router, pathname]);

  if (isLoading || status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut",
          }}
        >
          <Loader2 className="h-10 w-10 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="fixed inset-y-0 left-0 z-30 w-64 md:hidden"
          >
            {isAdmin ? <AdminSidebar /> : <UserSidebar />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden w-64 md:block">
        {isAdmin ? <AdminSidebar /> : <UserSidebar />}
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-40 backdrop-blur-md bg-gray-900/70 border-b border-gray-800"
        >
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-800 md:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* User profile dropdown */}
            <div className="relative ml-auto">
              <motion.button
                onClick={() => setProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 hover:bg-gray-800/50 hover:text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-800">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-200">
                    {session?.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isAdmin ? 'Administrator' : 'User'}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-gray-800 shadow-lg ring-1 ring-gray-700"
                  >
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile/update"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        Update Profile
                      </Link>
                      <Link
                        href="/dashboard/profile/change-password"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Key className="h-4 w-4" />
                        Change Password
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-800 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              bounce: 0.3
            }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
} 