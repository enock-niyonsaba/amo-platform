import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const licenses = await prisma.license.findMany({
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

  return NextResponse.json(licenses);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { userId, expiresAt, maxUsers } = await req.json();

  if (!userId || !expiresAt || !maxUsers) {
    return new NextResponse(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const license = await prisma.license.create({
      data: {
        key: Math.random().toString(36).substring(2, 15),
        status: "ACTIVE",
        expiresAt: new Date(expiresAt),
        maxUsers,
        userId,
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

    return NextResponse.json(license);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "License creation failed" }), {
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

  const { id, status, expiresAt } = await req.json();

  if (!id) {
    return new NextResponse(JSON.stringify({ error: "Missing license ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const license = await prisma.license.update({
      where: { id },
      data: {
        status,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
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

    return NextResponse.json(license);
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "License update failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 