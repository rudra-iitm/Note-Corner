"use server"

import client from "@/db"

export async function signup(email: string, password: string) {
    const user = await client.user.create({
        data: {
            email: email,
            password: password
        }
    });

    console.log(user.id);

    return "Signed up!"
}