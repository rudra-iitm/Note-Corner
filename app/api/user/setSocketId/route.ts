import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req : NextRequest) {
  const { email, socketId } = await req.json();
  const user = await client.user.update({
    where: {
      email
    },
    data: {
      socketId
    }
  })
  return NextResponse.json(user);
}