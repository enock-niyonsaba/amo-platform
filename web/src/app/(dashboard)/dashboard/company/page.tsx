'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Edit2,
  Loader2
} from 'lucide-react';
import { useSession } from 'next-auth/react';

import { useToast } from '@/components/toast';

interface CompanyData {
  id: string;
  name: string;
  tinNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  applicationStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED' | 'LICENSE_EXPIRED';
  createdAt: string;
}

export default function CompanyPage() {
  const { data: session } = useSession();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await fetch('/api/desktop-applications/request');
      if (!response.ok) throw new Error('Failed to fetch company data');
      const data = await response.json();
      setCompanyData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load company information');
      useToast({
        title: 'Error',
        description: 'Failed to load company information',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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
      case 'LICENSE_EXPIRED':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-500/10 text-green-500';
      case 'REJECTED':
        return 'bg-red-500/10 text-red-500';
      case 'SUSPENDED':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'LICENSE_EXPIRED':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-blue-500/10 text-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="h-8 w-8 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full items-center justify-center"
      >
        <div className="text-red-500">{error}</div>
      </motion.div>
    );
  }

  if (!companyData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full items-center justify-center"
      >
        <div className="text-center space-y-4">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-semibold text-white">No Company Found</h2>
          <p className="text-gray-400">You haven't created a company profile yet.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => window.location.href = '/dashboard/company/create'}
          >
            Create Company
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Company Profile</h1>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${getStatusColor(companyData.applicationStatus)}`}>
          {getStatusIcon(companyData.applicationStatus)}
          <span className="capitalize">{companyData.applicationStatus.toLowerCase()}</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 md:grid-cols-2"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Company Name</label>
              <p className="text-white">{companyData.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">TIN Number</label>
              <p className="text-white">{companyData.tinNumber}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Phone Number</label>
              <p className="text-white">{companyData.phoneNumber}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <p className="text-white">{companyData.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Address</label>
              <p className="text-white">{companyData.address}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Application Details</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">Application Date</label>
              <p className="text-white">
                {new Date(companyData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Status</label>
              <div className="flex items-center gap-2">
                {getStatusIcon(companyData.applicationStatus)}
                <span className="text-white capitalize">
                  {companyData.applicationStatus.toLowerCase()}
                </span>
              </div>
            </div>
          </div>

          {companyData.applicationStatus === 'PENDING' && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => window.location.href = '/get-started'}
            >
              <Edit2 className="h-4 w-4" />
              Update Application
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
} 