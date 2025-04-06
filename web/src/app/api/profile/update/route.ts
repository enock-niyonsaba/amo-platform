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
    const name = formData.get('name') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const profilePicture = formData.get('profilePicture') as File;

    // Validate required fields
    if (!name || !phoneNumber) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Handle profile picture upload
    let profilePictureUrl = null;
    if (profilePicture) {
      // In a real implementation, you would upload this to a storage service
      // For now, we'll just store the filename
      profilePictureUrl = `uploads/${profilePicture.name}`;
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        phoneNumber,
        profilePicture: profilePictureUrl,
        mustChangePassword: false,
        lastPasswordChange: new Date(),
      },
    });

    // Log the profile update
    await prisma.activity.create({
      data: {
        type: 'USER_UPDATED',
        description: 'User profile updated',
        userId: updatedUser.id,
        oldValue: JSON.stringify({
          name: session.user.name,
          phoneNumber: session.user.phoneNumber,
        }),
        newValue: JSON.stringify({
          name,
          phoneNumber,
        }),
      },
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        phoneNumber: updatedUser.phoneNumber,
        profilePicture: updatedUser.profilePicture,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 