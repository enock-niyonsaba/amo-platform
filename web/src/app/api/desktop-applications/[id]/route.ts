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

    if (!status || !['PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED'].includes(status)) {
      return new NextResponse('Invalid status', { status: 400 });
    }

    const application = await prisma.desktopApplication.findUnique({
      where: { id: params.id },
      include: {
        user: true,
        company: true,
      },
    });

    if (!application) {
      return new NextResponse('Application not found', { status: 404 });
    }

    const updatedApplication = await prisma.desktopApplication.update({
      where: { id: params.id },
      data: {
        status,
        approvedAt: status === 'APPROVED' ? new Date() : application.approvedAt,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        type: status === 'APPROVED' ? 'DESKTOP_APP_APPROVED' :
               status === 'REJECTED' ? 'DESKTOP_APP_REJECTED' :
               status === 'SUSPENDED' ? 'DESKTOP_APP_SUSPENDED' : 'DESKTOP_APP_REQUESTED',
        description: `Desktop application status updated to ${status}`,
        userId: user.id,
        companyId: application.companyId,
        desktopAppId: application.id,
        oldValue: application.status,
        newValue: status,
      },
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error('Error updating desktop application:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 