'use client';

import { useSession } from 'next-auth/react';
import { AuthProvider } from './auth-provider';

function SessionCheck({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const isLoading = status === 'loading';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c]">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SessionCheck>{children}</SessionCheck>
    </AuthProvider>
  );
} 