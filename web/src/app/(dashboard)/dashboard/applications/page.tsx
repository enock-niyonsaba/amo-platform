'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface DesktopApplication {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  createdAt: string;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  company: {
    name: string;
    tinNumber: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
}

export default function ApplicationsPage() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<DesktopApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/desktop-applications');
      if (!response.ok) throw new Error('Failed to fetch applications');
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError('Failed to load applications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (applicationId: string, action: 'APPROVE' | 'REJECT' | 'SUSPEND') => {
    try {
      const response = await fetch(`/api/desktop-applications/${applicationId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) throw new Error('Failed to update application');
      await fetchApplications();
    } catch (err) {
      setError('Failed to update application');
      console.error(err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'REJECTED':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'SUSPENDED':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1c] p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Desktop Applications</h1>
      
      <div className="grid gap-6">
        {applications.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#151b2b] rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getStatusIcon(app.status)}
                <span className="text-white font-semibold">{app.status}</span>
              </div>
              <span className="text-gray-400 text-sm">
                {new Date(app.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">User Information</h3>
                <div className="space-y-2 text-gray-400">
                  <p>Name: {app.user.name}</p>
                  <p>Email: {app.user.email}</p>
                  <p>Phone: {app.user.phoneNumber}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Company Information</h3>
                <div className="space-y-2 text-gray-400">
                  <p>Name: {app.company.name}</p>
                  <p>TIN: {app.company.tinNumber}</p>
                  <p>Email: {app.company.email}</p>
                  <p>Phone: {app.company.phoneNumber}</p>
                  <p>Address: {app.company.address}</p>
                </div>
              </div>
            </div>

            {app.status === 'PENDING' && (
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => handleAction(app.id, 'APPROVE')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(app.id, 'REJECT')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleAction(app.id, 'SUSPEND')}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Suspend
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 