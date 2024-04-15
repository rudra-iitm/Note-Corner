import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession();
    const { todo } = await req.json();
    console.log(todo);
    console.log(session);

    return NextResponse.json({ message: "Todo added" });
}

export async function GET(req: NextRequest) {
    const session = await getServerSession();
    console.log(session);
    return NextResponse.json({ message: session });
}