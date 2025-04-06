import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { code } = await req.json();

  if (!code) {
    return new NextResponse(JSON.stringify({ error: "Missing receipt code" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const receipt = await prisma.receipt.findUnique({
      where: { code },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!receipt) {
      return new NextResponse(JSON.stringify({ error: "Receipt not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json({
      id: receipt.id,
      code: receipt.code,
      amount: receipt.amount,
      items: receipt.items,
      createdAt: receipt.createdAt,
      user: receipt.user,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Verification failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
} 