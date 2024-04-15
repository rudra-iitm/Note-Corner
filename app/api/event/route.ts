import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
        const session = await getServerSession();
        const { events } = await req.json();
        console.log('original', events);

        const stringifiedEvents =  JSON.stringify(events);
        console.log('Events', stringifiedEvents);
        // const stringifiedTodos = todos.map((todo: any) => JSON.stringify(todo));

        const user = await client.user.update({
            where: 
            {
                email: session?.user?.email || '',
            },
                data: {
                    Events: stringifiedEvents,
                }
            }
        )

        console.log(user);

        return NextResponse.json({ message: "Event added" });
    }

    export async function GET() {
        const session = await getServerSession();

        const events = await client.user.findFirst({
            where: {
                email: session?.user?.email || '',
            }, select: {
                Events: true,
            }
        });

        console.log(events?.Events);


        return NextResponse.json(JSON.parse(events?.Events || "[]"));
    }
