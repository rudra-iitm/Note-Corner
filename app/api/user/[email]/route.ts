import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function GET(req : NextRequest, {params: { email }}: {params: { email: string }}) {
  console.log("email",email)
  const user = await client.user.findFirst({
    where: {
      email
    },
    select: {
      socketId: true
    }
  })
  return NextResponse.json(user?.socketId || null);
}