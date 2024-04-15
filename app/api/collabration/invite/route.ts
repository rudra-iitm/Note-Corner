import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req : NextRequest) {
  const { senderEmail, receiverEmail, docId } = await req.json();
  const user = await client.user.update({
    where: {
      email: receiverEmail,
    },
    data: {
      Invite : {
        create : {
          senderEmail,
          docId,
        }
      }
    }
  })
  return NextResponse.json(user);
}