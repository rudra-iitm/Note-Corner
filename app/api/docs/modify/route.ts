import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
        const session = await getServerSession();
        const  {content,title,id}  = await req.json();
        // console.log(content,title,id);
        if(!content || !title || !id){return NextResponse.json({ message: "No data Provided !!" });}
        // const stringifiedTodos = todos.map((todo: any) => JSON.stringify(todo));
        try
        {
            await client.docknote.update({
            where: {
                id: id
            },
            data: {
                title:title,
                content:content
            }
            });
            return NextResponse.json({ message: "Docs Modified Successfully" });
        }
        catch(e)
        {
            return NextResponse.json({ message: "Unable to save !!" });
        }
    }

