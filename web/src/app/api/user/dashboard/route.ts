import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
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

    // Get user's stats
    const [receiptsCount, vatTotal, scansCount, activities] = await Promise.all([
      prisma.receipt.count({
        where: {
          userId: session.user.id,
        },
      }),
      prisma.receipt.aggregate({
        where: {
          userId: session.user.id,
        },
        _sum: {
          vatAmount: true,
        },
      }),
      prisma.scan.count({
        where: {
          userId: session.user.id,
        },
      }),
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
      }),
    ]);

    return NextResponse.json({
      totalReceipts: receiptsCount,
      totalVAT: vatTotal._sum.vatAmount || 0,
      totalScans: scansCount,
      applicationStatus: application?.status,
      recentActivities: activities.map(activity => ({
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