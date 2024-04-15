import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function GET(req : NextRequest, {params: { email }}: {params: { email: string }}) {
  const { socketId } = await client.user.findUnique({
    where: {
      email
    },
    select: {
      socketId: true,
    }
  })

  return NextResponse.json(user);
}