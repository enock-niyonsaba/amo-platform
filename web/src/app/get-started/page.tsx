'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type FormStep = 'userType' | 'existingUser' | 'newUser' | 'companyInfo' | 'success';

interface FormData {
  // User Type
  userType: string;
  // Existing User
  existingEmail: string;
  existingPassword: string;
  // New User
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Company Info
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  companySize: string;
  industry: string;
  tinNumber: string;
  sdcId: string;
  mrcNumber: string;
}

export default function GetStartedPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>('userType');
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    // User Type
    userType: '',
    // Existing User
    existingEmail: '',
    existingPassword: '',
    // New User
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Company Info
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    companySize: '',
    industry: '',
    tinNumber: '',
    sdcId: '',
    mrcNumber: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleUserTypeSelect = (isExisting: boolean) => {
    setIsExistingUser(isExisting);
    setCurrentStep(isExisting ? 'existingUser' : 'newUser');
  };

  const validateForm = () => {
    if (currentStep === 'newUser') {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    } else if (currentStep === 'companyInfo') {
      if (!formData.companyName || !formData.companyEmail || !formData.companyPhone || 
          !formData.companyAddress || !formData.tinNumber || !formData.sdcId || !formData.mrcNumber) {
        setError('Please fill in all required fields');
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    if (currentStep === 'newUser' || currentStep === 'existingUser') {
      setCurrentStep('companyInfo');
    } else if (currentStep === 'companyInfo') {
      setIsLoading(true);
      try {
        // First, register the user
        const userResponse = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phone,
          }),
        });

        if (!userResponse.ok) {
          const errorData = await userResponse.json();
          throw new Error(errorData.error || 'Failed to register user');
        }

        // Then, create the company and application
        const applicationResponse = await fetch('/api/desktop-applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phoneNumber: formData.phone,
            },
            company: {
              name: formData.companyName,
              tinNumber: formData.tinNumber,
              phoneNumber: formData.companyPhone,
              email: formData.companyEmail,
              address: formData.companyAddress,
              sdcId: formData.sdcId,
              mrcNumber: formData.mrcNumber,
              size: formData.companySize,
              industry: formData.industry,
            },
          }),
        });

        if (!applicationResponse.ok) {
          const errorData = await applicationResponse.json();
          throw new Error(errorData.error || 'Failed to submit application');
        }

        setCurrentStep('success');
      } catch (error) {
        console.error('Error:', error);
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    setError(null);
    if (currentStep === 'companyInfo') {
      setCurrentStep(isExistingUser ? 'existingUser' : 'newUser');
    } else if (currentStep === 'existingUser' || currentStep === 'newUser') {
      setCurrentStep('userType');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'userType':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Get Started with AMO</h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Are you an existing AMO user or new to our platform?
            </p>
            <div className="grid gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUserTypeSelect(true)}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <h3 className="font-semibold">Existing User</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I already have an AMO account
                    </p>
                  </div>
                </div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUserTypeSelect(false)}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <XCircle className="w-6 h-6 text-purple-500" />
                  <div className="text-left">
                    <h3 className="font-semibold">New User</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I&apos;m new to AMO platform
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        );

      case 'existingUser':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Verify Your Account</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="existingEmail"
                  value={formData.existingEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="existingPassword"
                  value={formData.existingPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-2 text-gray-600 dark:text-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            </div>
          </motion.div>
        );

      case 'newUser':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Personal Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="+1 (234) 567-890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-2 text-gray-600 dark:text-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            </div>
          </motion.div>
        );

      case 'companyInfo':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto space-y-6"
          >
            <h2 className="text-2xl font-bold text-center">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Email</label>
                <input
                  type="email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="company@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Phone</label>
                <input
                  type="tel"
                  name="companyPhone"
                  value={formData.companyPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="+1 (234) 567-890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Address</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="123 Business St, City, Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">TIN Number</label>
                <input
                  type="text"
                  name="tinNumber"
                  value={formData.tinNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter TIN Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">SDC ID</label>
                <input
                  type="text"
                  name="sdcId"
                  value={formData.sdcId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter SDC ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">MRC Number</label>
                <input
                  type="text"
                  name="mrcNumber"
                  value={formData.mrcNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter MRC Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Size</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  aria-label="Select company size"
                >
                  <option value="">Select company size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Industry</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  aria-label="Select industry"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="px-4 py-2 text-gray-600 dark:text-gray-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center space-y-6"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Application Submitted!</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Thank you for your application. Our team will review it and get back to you shortly.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Go to Dashboard
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Get Started with AMO</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete the form below to apply for the AMO desktop application
          </p>
        </div>
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {renderStep()}
      </div>
    </div>
  );
} 