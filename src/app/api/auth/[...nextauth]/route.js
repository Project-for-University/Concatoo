import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

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
                const { email, password } = credentials;

                // ambil dari db
                const user = await prisma.user.findUnique({
                    where: { email: email }
                });
                console.log(user);

                // Jika user tidak ditemukan, kembalikan null
                if (!user) {
                    return null;
                }
                if (user) {
                    if (user.password === password) {
                        return {
                            id_user: user.id_user,
                            name: user.username,
                            email: user.email,
                            role: user.role
                        };
                    }
                }

                // Bandingkan password yang dimasukkan dengan password yang ada di database
                // const isValidPassword = await bcrypt.compare(password, user.password);
                // if (!isValidPassword) {
                //     return null;
                // }

                // Kembalikan objek user jika otentikasi berhasil

            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id_user = user.id_user;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id_user: token.id_user,
                email: token.email,
                name: token.name,
                role: token.role,
            };
            return session;
        }
    },
    pages: {
        signIn: '/auth/login'
    }
});

export { handler as GET, handler as POST };
