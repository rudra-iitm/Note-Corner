import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req : NextRequest) {
  const { email, socketId } = await req.json();
  console.log("data",email,socketId);
  if (!socketId) {
    return NextResponse.json("No Socket Id provided");
  
  }
  const user = await client.user.update({
    where: {
      email
    },
    data: {
      socketId
    }
  })
  console.log("user",user);
  return NextResponse.json(user);
}