import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch dashboard statistics
    const [totalUsers, activeLicenses, pendingAlerts, unreadMessages, recentActivity] = await Promise.all([
      prisma.user.count(),
      prisma.license.count({
        where: {
          status: 'ACTIVE',
        },
      }),
      prisma.alert.count({
        where: {
          status: 'PENDING',
        },
      }),
      prisma.message.count({
        where: {
          read: false,
        },
      }),
      prisma.activity.findMany({
        take: 5,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          type: true,
          description: true,
          createdAt: true,
        },
      }),
    ]);

    // Format recent activity
    const formattedActivity = recentActivity.map((activity) => ({
      id: activity.id,
      type: activity.type,
      description: activity.description,
      timestamp: new Date(activity.createdAt).toLocaleString(),
    }));

    return NextResponse.json({
      totalUsers,
      activeLicenses,
      pendingAlerts,
      unreadMessages,
      recentActivity: formattedActivity,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 