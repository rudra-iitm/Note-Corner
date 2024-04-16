import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function GET() {
    const session = await getServerSession();
    const todos = await client.user.findFirst({
        where: {
            email: session?.user?.email || '',
        }, select: {
            Todo: true,
        }
    });

    const Todos = JSON.parse(todos?.Todo || "[]");

    const completedTodos = Todos.filter((todo: any) => todo.complete);

    const completed = completedTodos.length;

    const incomplete = Todos.length - completed;

    return NextResponse.json({completed, incomplete});
}
