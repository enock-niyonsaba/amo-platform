'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/components/admin-sidebar';
import { UserSidebar } from '@/components/user-sidebar';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session) {
      router.push('/login');
      return;
    }

    setIsLoading(false);
  }, [session, status, router]);

  if (isLoading || status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        {session?.user?.role === 'ADMIN' ? (
          <AdminSidebar />
        ) : (
          <UserSidebar />
        )}
      </div>
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
} 