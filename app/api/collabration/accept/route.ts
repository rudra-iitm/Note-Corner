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
  if (user?.collaborationId === null) {
    const collabration = await client.collabration.create({
      data: {
        docknoteId: docId,
        users: [user.id, receiverUser?.id || ""]
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
    const collabration = await client.collabration.findFirst({
      where: {
        id: user?.collaborationId,
      },
      select: {
        users: true,
      }
    })
    const newUsers = collabration?.users;
    newUsers?.push(receiverUser?.id || "");
    await client.collabration.update({
      where: {
        id: user?.collaborationId,
      },
      data: {
        users: newUsers,
      }
    })
    await client.user.update({
      where: {
        email: receiverEmail,
      },
      data: {
        collaborationId: user?.collaborationId,
      }
    })
    await client.user.update({
      where: {
        email: senderEmail,
      },
      data: {
        Invite:{
          deleteMany: {
            senderEmail,
          }
        }
      }
    })
  }
  return NextResponse.json("invite accepted");
}