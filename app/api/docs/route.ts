import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
        const session = await getServerSession();
        const { events } = await req.json();
        // const stringifiedTodos = todos.map((todo: any) => JSON.stringify(todo));

        const user = await client.user.findFirst({
            where: 
            {
                email: session?.user?.email || '',
            },
            select: {
                id: true
            }
        }
        )

        console.log(user);

        return NextResponse.json({ message: "Event added" });
    }

