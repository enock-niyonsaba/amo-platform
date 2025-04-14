import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's application status if exists
    const application = await prisma.desktopApplication.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Get user's stats with fallback to 0 for empty results
    const [receiptsCount, vatTotal, scansCount, activities] = await Promise.all([
      prisma.receipt.count({
        where: {
          userId: session.user.id,
        },
      }).catch(() => 0),
      prisma.receipt.aggregate({
        where: {
          userId: session.user.id,
        },
        _sum: {
          amount: true, // Changed from vatAmount to amount
        },
      }).catch(() => ({ _sum: { amount: 0 } })),
      prisma.scan?.count({
        where: {
          userId: session.user.id,
        },
      }).catch(() => 0),
      prisma.activity.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
        select: {
          id: true,
          type: true,
          description: true,
          createdAt: true,
        },
      }).catch(() => []),
    ]);

    return NextResponse.json({
      totalReceipts: receiptsCount || 0,
      totalVAT: vatTotal._sum.amount || 0,
      totalScans: scansCount || 0,
      applicationStatus: application?.status || null,
      recentActivities: (activities || []).map(activity => ({
        id: activity.id,
        type: activity.type,
        description: activity.description,
        date: activity.createdAt,
      })),
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 