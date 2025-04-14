import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const {
      name,
      tinNumber,
      phoneNumber,
      email,
      address,
      sdcId,
      mrcNumber,
    } = data;

    // Validate TIN number format
    if (!/^\d{9}$/.test(tinNumber)) {
      return NextResponse.json(
        { error: 'TIN number must be exactly 9 digits' },
        { status: 400 }
      );
    }

    // Check if company with same TIN number exists
    const existingCompany = await prisma.company.findUnique({
      where: { tinNumber },
    });

    if (existingCompany) {
      return NextResponse.json(
        { error: 'Company with this TIN number already exists' },
        { status: 400 }
      );
    }

    // Create company
    const company = await prisma.company.create({
      data: {
        name,
        tinNumber,
        phoneNumber,
        email,
        address,
        sdcId,
        mrcNumber,
        userId: session.user.id,
      },
    });

    // Create desktop application
    const desktopApplication = await prisma.desktopApplication.create({
      data: {
        status: 'PENDING',
        userId: session.user.id,
        companyId: company.id,
      },
    });

    return NextResponse.json({
      message: 'Company application submitted successfully',
      company,
      desktopApplication,
    });
  } catch (error) {
    console.error('Error creating company:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const application = await prisma.desktopApplication.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!application) {
      return NextResponse.json(null);
    }

    return NextResponse.json({
      id: application.id,
      name: application.company.name,
      tinNumber: application.company.tinNumber,
      phoneNumber: application.company.phoneNumber,
      email: application.company.email,
      address: application.company.address,
      applicationStatus: application.status,
      createdAt: application.createdAt,
    });
  } catch (error) {
    console.error('Error fetching company data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 