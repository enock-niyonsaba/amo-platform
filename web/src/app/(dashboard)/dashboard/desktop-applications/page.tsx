'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Building2,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  AlertCircle,
} from 'lucide-react';

interface DesktopApplication {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  createdAt: string;
  approvedAt: string | null;
  lastSyncAt: string | null;
  totalVat: number;
  qrCodesScanned: number;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  company: {
    name: string;
    tinNumber: string;
    phoneNumber: string;
    email: string;
    address: string;
    sdcId: string;
    mrcNumber: string;
  };
}

export default function DesktopApplications() {
  const [applications, setApplications] = useState<DesktopApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
  });

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/desktop-applications');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: DesktopApplication['status']) => {
    try {
      const response = await fetch(`/api/desktop-applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setApplications(applications.map(app =>
          app.id === id ? { ...app, status, approvedAt: status === 'APPROVED' ? new Date().toISOString() : app.approvedAt } : app
        ));
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.tinNumber.includes(searchQuery);
    const matchesStatus = filters.status === 'all' || app.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: DesktopApplication['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'APPROVED':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'REJECTED':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'SUSPENDED':
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Desktop Applications
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage desktop application requests
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="w-4 h-4" />
              Filters
              {showFilters ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  aria-label="Filter by application status"
                >
                  <option value="all">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <div className="p-6 text-center">
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              No applications found
            </div>
          ) : (
            filteredApplications.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {app.company.name}
                        </h3>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {app.user.name}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(app.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div>
                          <div className="font-medium">Company Details</div>
                          <div>TIN: {app.company.tinNumber}</div>
                          <div>Phone: {app.company.phoneNumber}</div>
                          <div>Email: {app.company.email}</div>
                          <div>Address: {app.company.address}</div>
                          <div>SDC ID: {app.company.sdcId}</div>
                          <div>MRC Number: {app.company.mrcNumber}</div>
                        </div>
                        <div>
                          <div className="font-medium">Application Stats</div>
                          <div>Total VAT: {app.totalVat.toFixed(2)}</div>
                          <div>QR Codes Scanned: {app.qrCodesScanned}</div>
                          <div>Last Sync: {app.lastSyncAt ? new Date(app.lastSyncAt).toLocaleString() : 'Never'}</div>
                          {app.approvedAt && (
                            <div>Approved: {new Date(app.approvedAt).toLocaleString()}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {app.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(app.id, 'APPROVED')}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </>
                    )}
                    {app.status === 'APPROVED' && (
                      <button
                        onClick={() => handleStatusUpdate(app.id, 'SUSPENDED')}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                      >
                        <AlertCircle className="w-4 h-4" />
                        Suspend
                      </button>
                    )}
                    {app.status === 'SUSPENDED' && (
                      <button
                        onClick={() => handleStatusUpdate(app.id, 'APPROVED')}
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 