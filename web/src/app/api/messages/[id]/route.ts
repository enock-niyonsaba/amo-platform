import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const { status } = await request.json();

    if (!status || !['READ', 'UNREAD', 'ARCHIVED'].includes(status)) {
      return new NextResponse('Invalid status', { status: 400 });
    }

    // For now, we'll just return success
    // In a real implementation, you would update the message in your database
    return NextResponse.json({
      id: params.id,
      status,
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 