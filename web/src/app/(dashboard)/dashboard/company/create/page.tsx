'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/toast';

interface FormData {
  name: string;
  tinNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  sdcId: string;
  mrcNumber: string;
}

export default function CreateCompanyPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    tinNumber: '',
    phoneNumber: '',
    email: '',
    address: '',
    sdcId: '',
    mrcNumber: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required';
    }

    if (!formData.tinNumber.trim()) {
      newErrors.tinNumber = 'TIN number is required';
    } else if (!/^\d{9}$/.test(formData.tinNumber)) {
      newErrors.tinNumber = 'TIN number must be exactly 9 digits';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.sdcId.trim()) {
      newErrors.sdcId = 'SDC ID is required';
    }

    if (!formData.mrcNumber.trim()) {
      newErrors.mrcNumber = 'MRC number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/desktop-applications/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create company');
      }

      success('Company application submitted successfully');
      router.push('/dashboard/company');
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to create company');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-semibold text-white"
        >
          Create Company Profile
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-1 text-sm text-gray-400"
        >
          Fill in your company details to apply for desktop application access
        </motion.p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700/50 border ${
                  errors.name ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400`}
                placeholder="Enter company name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                TIN Number (9 digits)
              </label>
              <input
                type="text"
                name="tinNumber"
                value={formData.tinNumber}
                onChange={handleChange}
                maxLength={9}
                className={`w-full px-4 py-2 bg-gray-700/50 border ${
                  errors.tinNumber ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400`}
                placeholder="Enter TIN number"
              />
              {errors.tinNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.tinNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700/50 border ${
                  errors.phoneNumber ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400`}
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700/50 border ${
                  errors.email ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400`}
                placeholder="Enter company email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-2 bg-gray-700/50 border ${
                  errors.address ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400`}
                placeholder="Enter company address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                SDC ID
              </label>
              <input
                type="text"
                name="sdcId"
                value={formData.sdcId}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700/50 border ${
                  errors.sdcId ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400`}
                placeholder="Enter SDC ID"
              />
              {errors.sdcId && (
                <p className="mt-1 text-sm text-red-500">{errors.sdcId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                MRC Number
              </label>
              <input
                type="text"
                name="mrcNumber"
                value={formData.mrcNumber}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-gray-700/50 border ${
                  errors.mrcNumber ? 'border-red-500' : 'border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400`}
                placeholder="Enter MRC number"
              />
              {errors.mrcNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.mrcNumber}</p>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Building2 className="w-4 h-4" />
                Create Company
              </>
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
} 