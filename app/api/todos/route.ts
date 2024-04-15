import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
        const session = await getServerSession();
        const { todos } = await req.json();

        const stringifiedTodos =  JSON.stringify(todos);
        // const stringifiedTodos = todos.map((todo: any) => JSON.stringify(todo));
        console.log('Todos', stringifiedTodos);

        const user = await client.user.update({
            where: 
            {
                email: session?.user?.email || '',
            },
                data: {
                    Todo: stringifiedTodos,
                }
            }
        )

        console.log(user);

        return NextResponse.json({ message: "Todo added" });
    }

    export async function GET() {
        const session = await getServerSession();

        const todos = await client.user.findFirst({
            where: {
                email: session?.user?.email || '',
            }, select: {
                Todo: true,
            }
        });

        console.log(todos?.Todo);


        return NextResponse.json(JSON.parse(todos?.Todo || "[]"));
    }
