import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";


const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    callbacks: {

    },
    providers: [
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },

            authorize: async (credentials) => {
                console.log(credentials);



                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                console.log(user);

                if (!user) {
                    throw new Error("user not found")
                }


                const match = await bcrypt.compare(credentials.password, user.password)
                console.log(match);

                if (match) {
                    console.log("password sama");
                    return user
                }

            }
        })
    ],
})