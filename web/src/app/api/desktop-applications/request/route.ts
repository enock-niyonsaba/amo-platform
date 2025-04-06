import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await request.formData();
    
    // Validate required fields
    const requiredFields = [
      'name',
      'phoneNumber',
      'email',
      'companyName',
      'tinNumber',
      'companyPhoneNumber',
      'companyEmail',
      'address',
      'sdcId',
      'mrcNumber',
    ];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return new NextResponse(`Missing required field: ${field}`, { status: 400 });
      }
    }

    // Validate TIN number format
    const tinNumber = formData.get('tinNumber') as string;
    if (!/^\d{9}$/.test(tinNumber)) {
      return new NextResponse('Invalid TIN number format. Must be 9 digits.', { status: 400 });
    }

    // Check if TIN number already exists
    const existingCompany = await prisma.company.findUnique({
      where: { tinNumber },
    });

    if (existingCompany) {
      return new NextResponse('Company with this TIN number already exists', { status: 400 });
    }

    // Handle profile picture upload
    const profilePicture = formData.get('profilePicture') as File;
    let profilePictureUrl = null;

    if (profilePicture) {
      // In a real implementation, you would upload this to a storage service
      // For now, we'll just store the filename
      profilePictureUrl = `uploads/${profilePicture.name}`;
    }

    // Create user if they don't exist
    const user = await prisma.user.upsert({
      where: { email: session.user.email },
      update: {
        name: formData.get('name') as string,
        phoneNumber: formData.get('phoneNumber') as string,
        profilePicture: profilePictureUrl,
      },
      create: {
        email: session.user.email,
        name: formData.get('name') as string,
        phoneNumber: formData.get('phoneNumber') as string,
        profilePicture: profilePictureUrl,
        // Generate a random password for new users
        password: await hash(Math.random().toString(36), 12),
      },
    });

    // Create company
    const company = await prisma.company.create({
      data: {
        name: formData.get('companyName') as string,
        tinNumber,
        phoneNumber: formData.get('companyPhoneNumber') as string,
        email: formData.get('companyEmail') as string,
        address: formData.get('address') as string,
        sdcId: formData.get('sdcId') as string,
        mrcNumber: formData.get('mrcNumber') as string,
        userId: user.id,
      },
    });

    // Create desktop application request
    const desktopApp = await prisma.desktopApplication.create({
      data: {
        status: 'PENDING',
        userId: user.id,
        companyId: company.id,
      },
    });

    // Log activity
    await prisma.activity.create({
      data: {
        type: 'DESKTOP_APP_REQUESTED',
        description: 'New desktop application request submitted',
        userId: user.id,
        companyId: company.id,
        desktopAppId: desktopApp.id,
      },
    });

    return NextResponse.json({
      message: 'Application submitted successfully',
      applicationId: desktopApp.id,
    });
  } catch (error) {
    console.error('Error processing desktop application request:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 