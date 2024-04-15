import { NextRequest, NextResponse } from "next/server";
import client from "@/db";
import { getServerSession } from "next-auth";

export async function POST(req: NextRequest) {
        const session = await getServerSession();
        const  {content,title}  = await req.json();
        console.log(content,title);
        if(!content || !title){return NextResponse.json({ message: "No data Provided !!" });}
        // const stringifiedTodos = todos.map((todo: any) => JSON.stringify(todo));
        if(!session?.user?.email){return NextResponse.json({ message: "No user found !!" });}
        console.log(session?.user?.email);
        const user = await client.user.findFirst({
            where: 
            {
                email: session?.user?.email 
            },
            select: {
                id: true
            }
        }
        )
        if(!user){return NextResponse.json({ message: "Unable to save !!" });}
        console.log(user);
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
                    title:title,
                    content:content,
                    DocknotesId:ds.id
                }
            });
            if(!docknote){return NextResponse.json({ message: "Unable to save !!" });}
            console.log(docknote);
            ds.docknotesids.push(docknote.id);
            return NextResponse.json({ message: "Event added" , id:docknote.id });
            // const docknoteArray = 
        }
        else{
            console.log(44);
            const docknote=await client.docknote.create({
                data:{
                    title:title,
                    content:content,
                    DocknotesId:docknotes.id
                }
            });
            // docknotes.
            // docknotes.docknote.push(docknote);
            if(!docknote){return NextResponse.json({ message: "Unable to save !!" });}
            console.log(docknote);
            docknotes.docknotesids.push(docknote.id);
            return NextResponse.json({ message: "Event added" , id:docknote.id });
        }
    }

