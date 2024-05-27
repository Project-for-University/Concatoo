import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";


const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: 'jwt'
    },
    secret: 'PintuKonser',

    providers: [
        Credentials({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' }
            },

            authorize: async (credentials) => {
                console.log(credentials);

                if (credentials.email === 'tes@gmail.com' && credentials.password === '12341234') {
                    return {
                        id: 1,
                        name: 'tes',
                        email: 'tes@gmail.com',
                        role: 'seller'
                    }
                } else {
                    return null
                }


                // const user = await prisma.user.findUnique({
                //     where: {
                //         email: credentials.email
                //     }
                // })
                // console.log(user);

                // if (!user) {
                //     throw new Error("user not found")
                // }


                // const match = await bcrypt.compare(credentials.password, user.password)
                // console.log(match);

                // if (match) {
                //     console.log("password sama");
                //     return user
                // }
            },
        })
    ],



    callbacks: {
        async jwt({ token, account, profile, user }) {
            if (account?.provider === 'credentials') {
                token.email = user.email
                token.fullname = user.fullname
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if ('email' in token) {
                session.user.email = token.email
            }

            if ('fullname' in token) {
                session.user.fullname = token.fullname
            }
            if ('role' in token) {
                session.user.role = token.role
            }

        }
    }
})