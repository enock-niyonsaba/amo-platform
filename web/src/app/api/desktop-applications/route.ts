import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { user, company } = data;

    // Create or update user
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
      create: {
        email: user.email,
        name: user.name,
        phoneNumber: user.phoneNumber,
        role: 'USER',
      },
    });

    // Create company
    const createdCompany = await prisma.company.create({
      data: {
        name: company.name,
        tinNumber: company.tinNumber,
        phoneNumber: company.phoneNumber,
        email: company.email,
        address: company.address,
        sdcId: company.sdcId,
        mrcNumber: company.mrcNumber,
        userId: createdUser.id,
      },
    });

    // Create desktop application
    const application = await prisma.desktopApplication.create({
      data: {
        userId: createdUser.id,
        companyId: createdCompany.id,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ 
      success: true, 
      application,
      user: createdUser,
      company: createdCompany
    });
  } catch (error) {
    console.error('Error creating desktop application:', error);
    return NextResponse.json(
      { error: 'Failed to create desktop application' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
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

    const applications = await prisma.desktopApplication.findMany({
      include: {
        user: true,
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching desktop applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch desktop applications' },
      { status: 500 }
    );
  }
} 