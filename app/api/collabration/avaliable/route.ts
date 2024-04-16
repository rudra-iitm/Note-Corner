import { NextResponse } from "next/server";
import client from "@/db";

export async function GET() {
  const user = await client.user.findMany({
    where: {
      collaborationId: null,
    },
  })
  return NextResponse.json(user);
}