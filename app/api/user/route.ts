import { NextRequest, NextResponse } from "next/server";
import client from "@/db";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const user = await client.user.create({
        data: {
            email: body.email,
            password: body.password
        }
    });

    console.log(user.id);

    return NextResponse.json({ message: "Signed up" });
}