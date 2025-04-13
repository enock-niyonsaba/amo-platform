import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email },
    });

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { action } = await req.json();
    const { id } = params;

    const validActions = ['APPROVE', 'REJECT', 'SUSPEND'];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    const application = await prisma.desktopApplication.update({
      where: { id },
      data: {
        status: action === 'APPROVE' ? 'APPROVED' :
               action === 'REJECT' ? 'REJECTED' : 'SUSPENDED',
        updatedAt: new Date(),
      },
      include: {
        user: true,
        company: true,
      },
    });

    // If approved, update user role to COMPANY_ADMIN
    if (action === 'APPROVE') {
      await prisma.user.update({
        where: { id: application.userId },
        data: { role: 'COMPANY_ADMIN' },
      });
    }

    return NextResponse.json({ success: true, application });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
} 