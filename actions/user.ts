"use server"
import bcrypt from "bcrypt";

import client from "@/db"

export async function signup(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    });

    // console.log(user.id);

    return "Signed up!"
}