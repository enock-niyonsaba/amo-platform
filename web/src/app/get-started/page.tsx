'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useToast } from '@/components/toast';

type FormStep = 'userType' | 'existingUser' | 'newUser' | 'success';

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
}

export default function GetStartedPage() {
  const router = useRouter();
  const { success, error } = useToast();
  const [currentStep, setCurrentStep] = useState<FormStep>('userType');
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
  });

  const validateForm = () => {
    if (currentStep === 'newUser') {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
        error('Please fill in all fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        error('Passwords do not match');
        return false;
      }
    } else if (currentStep === 'existingUser') {
      if (!formData.existingEmail || !formData.existingPassword) {
        error('Please fill in all fields');
        return false;
      }
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    if (currentStep === 'newUser') {
      setIsLoading(true);
      try {
        // Register the user
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

        const data = await userResponse.json();

        if (!userResponse.ok) {
          error(data.error || 'Failed to register user');
          return;
        }

        success('Account created successfully!');
        setCurrentStep('success');
      } catch (err) {
        console.error('Error:', err);
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep === 'existingUser') {
      setIsLoading(true);
      try {
        // Sign in the user
        const signInResponse = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.existingEmail,
            password: formData.existingPassword,
          }),
        });

        const data = await signInResponse.json();

        if (!signInResponse.ok) {
          // Handle specific error cases
          if (signInResponse.status === 401) {
            error('Invalid credentials. Please check your email and password and try again.');
            // Clear password field for security
            setFormData(prev => ({ ...prev, existingPassword: '' }));
          } else if (signInResponse.status === 400) {
            error('Please provide both email and password');
          } else {
            error(data.error || 'Failed to sign in. Please try again later.');
          }
          return;
        }

        success('Signed in successfully! Redirecting to dashboard...');
        // Add a small delay before redirect to show the success message
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } catch (err) {
        console.error('Error:', err);
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while signing in';
        error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 'existingUser' || currentStep === 'newUser') {
      setCurrentStep('userType');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeSelect = (isExisting: boolean) => {
    setCurrentStep(isExisting ? 'existingUser' : 'newUser');
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
            <h2 className="text-2xl font-bold text-center">Sign In</h2>
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
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
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
            <h2 className="text-2xl font-bold text-center">Create Account</h2>
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
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
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
            <h2 className="text-2xl font-bold">Account Created!</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your account has been created successfully. You can now sign in and apply for the AMO desktop application.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Sign In
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
            Create an account or sign in to apply for the AMO desktop application
          </p>
        </div>
        {renderStep()}
      </div>
    </div>
  );
} 