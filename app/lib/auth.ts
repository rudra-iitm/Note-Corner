import client from "@/db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: "email", type: "text", placeholder: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials: any) {

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
    jwt: async ({ user, token }: any) => {
        if (user) {
            token.uid = user.id;
            token.expires = Math.floor(Date.now() / 1000) + 3600*2; 
        }
        return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
          session.user.id = token.uid
      }
      return session
  }
}
