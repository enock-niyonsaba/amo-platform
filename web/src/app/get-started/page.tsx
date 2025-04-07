'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, User, Mail, Phone, MapPin, CheckCircle2, XCircle } from 'lucide-react';

type FormStep = 'userType' | 'existingUser' | 'newUser' | 'companyInfo' | 'success';

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState<FormStep>('userType');
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false);
  const [formData, setFormData] = useState({
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
    // Company Info
    companyName: '',
    companyEmail: '',
    companyPhone: '',
    companyAddress: '',
    companySize: '',
    industry: '',
  });

  const handleUserTypeSelect = (isExisting: boolean) => {
    setIsExistingUser(isExisting);
    setCurrentStep(isExisting ? 'existingUser' : 'newUser');
  };

  const handleNext = () => {
    if (currentStep === 'newUser' || currentStep === 'existingUser') {
      setCurrentStep('companyInfo');
    } else if (currentStep === 'companyInfo') {
      setCurrentStep('success');
    }
  };

  const handleBack = () => {
    if (currentStep === 'companyInfo') {
      setCurrentStep(isExistingUser ? 'existingUser' : 'newUser');
    } else if (currentStep === 'existingUser' || currentStep === 'newUser') {
      setCurrentStep('userType');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                      I'm new to AMO platform
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
                <label className="block text-sm font-medium mb-1">Company Size</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
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
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Submit Application
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
              onClick={() => setCurrentStep('userType')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Start New Application
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
        {renderStep()}
      </div>
    </div>
  );
} 