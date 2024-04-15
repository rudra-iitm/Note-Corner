"use server";
import { useSession } from "next-auth/react";
import client from '@/db'
import { PrismaClient } from '@prisma/client'

export const SaveHandler=async()=>{
    const session=useSession();
    const email=session.data?.user?.email;
    if(!email)
    {
        // toast({
        //     title: "Unable to save!",
        //     variant: "destructive",
        // })
        return;
    }
    console.log(email);
    const prisma = new PrismaClient();
    // const user = await 
    prisma.user.findFirst({
        where: {
            email: email,
        },
    }).then((user) => {console.log(user);});
    // const existingUser = await client.user.findFirst({
    //     where: {
    //         email: email,
    //     },
    //     select: {
    //         id: true,
    //         email: true,
    //         password: true,
    //     }
    // });
    // const user = await client.user.findFirst({
    //     where: {
    //         email: email,
    //     },
    //     // select: {
    //     //     id: true,
    //     //     email: true,
    //     // },
    // })
    // console.log(user);
    // console.log(editorContent);
}