import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from "bcrypt";


const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    secret: 'pintukonser',
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },

            },
            async authorize(credentials) {
                console.log(credentials)
                const { email, password } = credentials
                console.log(email);
                console.log(password);

                // ambil dari db
                const user = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })

                // if (!user) {
                //     return null;
                // }

                // const PW = await bcrypt.compare(password, user.password);
                // console.log(PW)

                // if (!PW) {
                //     return null;
                // }
                if (user) {
                    return {
                        id_user: user.id_user,
                        name: user.username,
                        email: user.email,
                        role: user.role
                    }
                }

            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            console.log(token);
            if (user) {
                token.id_user = user.id_user;
                token.email = user.email;
                token.name = user.name; // Menyesuaikan dengan properti `name` yang digunakan di authorize
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            console.log(session);
            if (token.id_user) {
                session.user.id_user = token.id_user;
            }
            if (token.email) {
                session.user.email = token.email;
            }
            if (token.name) {
                session.user.name = token.name;
            }
            if (token.role) {
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/login'
    }
})

export { handler as GET, handler as POST }
