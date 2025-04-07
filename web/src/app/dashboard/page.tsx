'use client';

import { useSession } from 'next-auth/react';
import { Activity, Settings, Shield } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#0a0f1c]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/activity">
            <div className="bg-[#151b2b] p-6 rounded-xl hover:bg-[#1a2137] transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Activity Monitoring</h3>
              <p className="text-gray-400">Monitor real-time activity and performance metrics.</p>
            </div>
          </Link>

          <Link href="/dashboard/configuration">
            <div className="bg-[#151b2b] p-6 rounded-xl hover:bg-[#1a2137] transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Configuration</h3>
              <p className="text-gray-400">Manage system settings and configurations.</p>
            </div>
          </Link>

          <Link href="/dashboard/license">
            <div className="bg-[#151b2b] p-6 rounded-xl hover:bg-[#1a2137] transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">License Management</h3>
              <p className="text-gray-400">View and manage your licenses and subscriptions.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
} 