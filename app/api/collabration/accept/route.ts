import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req : NextRequest) {
  const { senderEmail, receiverEmail, docId } = await req.json();
  const user = await client.user.findFirst({
    where: {
      email: senderEmail,
    },
    select: {
      collaborationId: true,
      id: true,
    }
  })
  const receiverUser = await client.user.findFirst({
    where: {
      email: receiverEmail,
    },
    select: {
      id: true,
    }
  })
  if (user.collaborationId === null) {
    const collabration = await client.collabration.create({
      data: {
        docknoteId: docId,
        user: [user.id, receiverUser.id]
      },
      select: {
        id: true,
      }
    })
    await client.user.update({
      where: {
        email: senderEmail,
      },
      data: {
        collaborationId: collabration.id,
      }
    })
    await client.user.update({
      where: {
        email: receiverEmail,
      },
      data: {
        collaborationId: collabration.id,
      }
    })
  } else {
    await client.collabration.update({
      where: {
        id: user.collaborationId,
      },
      data: {
        user: {
          connect: {
            email: receiverEmail,
          }
        }
      }
    })
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