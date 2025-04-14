import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch dashboard statistics with fallback to 0 for empty results
    const [totalUsers, activeLicenses, pendingAlerts, unreadMessages, recentActivity] = await Promise.all([
      prisma.user.count().catch(() => 0),
      prisma.license?.count({
        where: {
          status: 'ACTIVE',
        },
      }).catch(() => 0),
      prisma.alert?.count({
        where: {
          status: 'PENDING',
        },
      }).catch(() => 0),
      prisma.message?.count({
        where: {
          read: false,
        },
      }).catch(() => 0),
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
      }).catch(() => []),
    ]);

    // Format recent activity
    const formattedActivity = (recentActivity || []).map((activity) => ({
      id: activity.id,
      type: activity.type,
      description: activity.description,
      timestamp: new Date(activity.createdAt).toLocaleString(),
    }));

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      activeLicenses: activeLicenses || 0,
      pendingAlerts: pendingAlerts || 0,
      unreadMessages: unreadMessages || 0,
      recentActivity: formattedActivity,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 