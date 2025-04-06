import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // For now, we'll return mock data
    // In a real implementation, you would fetch this from your database
    const messages = [
      {
        id: '1',
        subject: 'License Expiring Soon',
        content: 'Your license will expire in 7 days. Please renew to continue using the service.',
        status: 'UNREAD',
        sender: {
          name: 'System Notification',
          email: 'system@example.com',
        },
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        subject: 'New User Registration',
        content: 'A new user has registered and is awaiting license assignment.',
        status: 'READ',
        sender: {
          name: 'User Management',
          email: 'users@example.com',
        },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        subject: 'Support Request',
        content: 'I need help with configuring my license settings.',
        status: 'UNREAD',
        sender: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 