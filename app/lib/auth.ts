import client from "@/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: "email", type: "text", placeholder: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials: any) {
            console.log(credentials);
            const existingUser = await client.user.findFirst({
                where: {
                    email: credentials.email,
                },
                select: {
                    id: true,
                    email: true,
                    password: true,
                }
            });

            if (existingUser && existingUser?.password) {
                const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
                if (!passwordMatch) {
                    return null;
                }
                return {id: existingUser.id, email: existingUser.email};
            } 

            return null;
        },  
    })
    ],
    secret: process.env.NEXTAUTH_SECRET || "default-secret",
    callbacks: {
        async session({token, session}: any) {
            session.user.id = token.sub
            return session
        }
    }
}
