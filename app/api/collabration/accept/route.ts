import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req : NextRequest) {
  const { senderEmail, receiverEmail, docId } = await req.json();
  const user = await client.user.findFirst({
    where: {
      email: senderEmail,
    },
    select: {
      collaboratoinId: true,
    }
  })
  if (user.collaboratoinId === null) {
  } else {
    
  }
  const user = await client.user.update({
    where: {
      email: senderEmail,
    },
    data: {
      Invite : {
        create : {
          receiverEmail,
          docId,
        }
      }
    }
  })
  return NextResponse.json(user);
}