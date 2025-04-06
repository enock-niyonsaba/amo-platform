import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

    // For now, we'll return mock data
    // In a real implementation, you would fetch this from your database
    const alerts = [
      {
        id: '1',
        type: 'WARNING',
        title: 'License Expiring Soon',
        message: 'License for user@example.com will expire in 7 days',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        user: {
          name: 'John Doe',
          email: 'user@example.com',
        },
      },
      {
        id: '2',
        type: 'ERROR',
        title: 'Sync Failed',
        message: 'Failed to sync data with external service',
        status: 'ACTIVE',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '3',
        type: 'SUCCESS',
        title: 'Backup Completed',
        message: 'System backup completed successfully',
        status: 'RESOLVED',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    return NextResponse.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { type, message, data } = await req.json();

  if (!type || !message) {
    return new NextResponse(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const alert = await prisma.alert.create({
      data: {
        type,
        message,
        data,
        status: "PENDING",
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(alert);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to create alert" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { id, status, response } = await req.json();

  if (!id || !status) {
    return new NextResponse(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const alert = await prisma.alert.update({
      where: { id },
      data: {
        status,
        response,
        resolvedAt: status === "RESOLVED" ? new Date() : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(alert);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Failed to update alert" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 