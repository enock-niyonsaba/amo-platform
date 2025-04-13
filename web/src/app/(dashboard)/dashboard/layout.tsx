'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

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

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    // Check if user is trying to access admin paths
    if (session.user.role !== 'ADMIN' && ADMIN_PATHS.some(path => pathname.startsWith(path))) {
      router.push('/dashboard');
      return;
    }

    setIsLoading(false);
  }, [session, status, router, pathname]);

  if (isLoading || status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  // Determine which layout to show based on user role
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-screen bg-gray-900"
    >
      <div className="hidden w-64 flex-col md:flex">
        {isAdmin ? <AdminSidebar /> : <UserSidebar />}
      </div>
      <main className="flex-1 overflow-y-auto bg-gray-800 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>
    </motion.div>
  );
} 