import { NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();
  const email = session?.user?.email || "";
  console.log("email",email);
  const user = await client.user.findFirst({
    where: {
      email,
    },
    select: {
      Invite: true,
    }
  })
  console.log("user",user);
  return NextResponse.json(user || null);
}