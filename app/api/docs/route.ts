import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
        const session = await getServerSession();
        const  {content}  = await req.json();
        console.log(content);
        if(!content){return NextResponse.json({ message: "No data Provided !!" });}
        // const stringifiedTodos = todos.map((todo: any) => JSON.stringify(todo));
        // console.log(session?.user?.email);
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
        if(!user){return NextResponse.json({ message: "Unable to save !!" });}
        // console.log(user);
        const docknotes = await client.docknotes.findFirst({
            where: {
                userId: user?.id || '',
            },
        });
        // console.log(22);
        // console.log(docknotes);
        if(!docknotes)
        {
            console.log(33);
            const ds=await client.docknotes.create({
                data: {
                    userId: user.id,
                }
            });   
            console.log(ds);
            const docknote=await client.docknote.create({
                data:{
                    titles:content,
                    DocknotesId:ds.id
                }
            });
            console.log(docknote);
            // const docknoteArray = 
        }

        // console.log(1);
        // if (docknotes) {
        //     console.log(11);
        //     // Docknotes database exists for the current user
        // } else {
        //     console.log(3);
        //     // Docknotes database does not exist for the current user
        // }
        // // console.log(user);
        
        return NextResponse.json({ message: "Event added" });
    }

