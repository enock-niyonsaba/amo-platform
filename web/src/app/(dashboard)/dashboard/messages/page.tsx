'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface Message {
  id: string;
  subject: string;
  content: string;
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  sender: {
    name: string;
    email: string;
    phone?: string;
  };
  createdAt: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
  });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'READ' }),
      });

      if (response.ok) {
        setMessages(messages.map(message =>
          message.id === id ? { ...message, status: 'READ' } : message
        ));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'ARCHIVED' }),
      });

      if (response.ok) {
        setMessages(messages.map(message =>
          message.id === id ? { ...message, status: 'ARCHIVED' } : message
        ));
      }
    } catch (error) {
      console.error('Error archiving message:', error);
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'all' || message.status === filters.status;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'UNREAD':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'READ':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'ARCHIVED':
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
      default:
        return 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'UNREAD':
        return <AlertCircle className="w-4 h-4" />;
      case 'READ':
        return <CheckCircle className="w-4 h-4" />;
      case 'ARCHIVED':
        return <XCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Messages
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage your messages
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
                placeholder="Search messages..."
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
                  aria-label="Filter by message status"
                >
                  <option value="all">All Messages</option>
                  <option value="UNREAD">Unread</option>
                  <option value="READ">Read</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>

        <div className="overflow-x-auto">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              <div className="p-6 text-center">
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No messages found
              </div>
            ) : (
              filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {message.sender.name}
                          </h3>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(message.status)}`}>
                            {getStatusIcon(message.status)}
                            <span className="ml-1">{message.status}</span>
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-900 dark:text-white font-medium">
                          {message.subject}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {message.content}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {message.sender.email}
                          </div>
                          {message.sender.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {message.sender.phone}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(message.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {message.status === 'UNREAD' && (
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark as Read
                        </button>
                      )}
                      {message.status !== 'ARCHIVED' && (
                        <button
                          onClick={() => handleArchive(message.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg"
                        >
                          <XCircle className="w-4 h-4" />
                          Archive
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
    </div>
  );
} 