import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const authOptions = NextAuth({
    session: {
        strategy: 'jwt'
    },
    // Kunci rahasia yang digunakan untuk mengenkripsi token.
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
                try {
                    const { email, password } = credentials;

                    // ambil dari db
                    const user = await prisma.user.findUnique({
                        where: { email: email }
                    });

                    // Jika user tidak ditemukan, kembalikan pesan kesalahan
                    if (!user) {
                        throw new Error('Email Tidak Ditemukan')
                    }

                    const isMatch = await bcrypt.compare(password, user.password);

                    // Jika password tidak cocok, kembalikan pesan kesalahan
                    if (!isMatch) {
                        throw new Error('Password Salah')
                    } else if (isMatch) {
                        return {
                            id_user: user.id_user,
                            name: user.username,
                            email: user.email,
                            role: user.role
                        };
                    }

                    // Jika semuanya baik-baik saja, kembalikan objek pengguna

                } catch (e) {
                    console.log(e);
                }
            },
        })
    ],
    callbacks: {
        // jwt: Callback yang memodifikasi token JWT ketika pengguna berhasil login.
        async jwt({ token, user }) {
            if (user) {
                token.id_user = user.id_user;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }
            return token;
        },
        // session: Callback yang memodifikasi objek sesi berdasarkan informasi dalam token.
        async session({ session, token }) {
            session.user = {
                id_user: token.id_user,
                email: token.email,
                name: token.name,
                role: token.role,
            };
            if (token.role === 'SELER') {
                session.redirect = '/dashboard';
            } else if (token.role === 'CUSTOMER') {
                session.redirect = '/home';
            } else {
                session.redirect = '/'; // Redirect to unauthorteized page
            }
            return session;
        },
    },
    pages: {
        signIn: '/auth/login'
    }
});

export { authOptions as GET, authOptions as POST };
