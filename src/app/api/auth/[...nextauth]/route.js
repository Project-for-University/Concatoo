import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

const prisma = new PrismaClient();

export const authOptions = NextAuth({
    session: {
        strategy: 'jwt'
    },
    // Kunci rahasia yang digunakan untuk mengenkripsi token.
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // CredentialsProvider({
        //     type: 'credentials',
        //     name: 'Credentials',
        //     credentials: {
        //         email: { label: 'Email', type: 'email' },
        //         password: { label: 'Password', type: 'password' },
        //     },
        //     async authorize(credentials) {
        //         try {
        //             const { email, password } = credentials;

        //             // ambil dari db
        //             const user = await prisma.user.findUnique({
        //                 where: { email: email }
        //             });

        //             // Jika user tidak ditemukan, kembalikan pesan kesalahan
        //             if (!user) {
        //                 throw new Error('Email Tidak Ditemukan')
        //             }

        //             const isMatch = await bcrypt.compare(password, user.password);

        //             // Jika password tidak cocok, kembalikan pesan kesalahan
        //             if (!isMatch) {
        //                 throw new Error('Password Salah')
        //             } else if (isMatch) {
        //                 return {
        //                     id_user: user.id_user,
        //                     name: user.username,
        //                     email: user.email,
        //                     role: user.role
        //                 };
        //             }

        //             // Jika semuanya baik-baik saja, kembalikan objek pengguna

        //         } catch (e) {
        //             console.log(e);
        //         }
        //     },
        // })
    ],
    callbacks: {
        // ketika berhasil login itu akan ngisi token dengan jwt dan kita tentukan isi dari token itu mau apa saja di sini ya saya mau masukin data di bawah ini
        async jwt({ token, user, account, profile }) {
            console.log(token);
            if (profile) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: profile.email,
                    },
                })
                console.log(user);
                if (!user) {
                    throw new Error('No user found')
                }
                token.id_user = user.id_user
                token.role = user.role;
            }
            console.log(token);
            return token
        },
        // if (user) {
        //     token.id_user = user.id_user;
        //     token.email = user.email;
        //     token.name = user.name;
        //     token.role = user.role;
        // }
        // return token;
        // setelah token di isi oleh jwt
        // kita tentukan session dari token jwt yang kita tentukan di atas 
        // artinya ketika berhasil login itu kita ya nyimpen data ide_use,email,name,dan role
        // async session({ session, token }) {
        //     session.user = {
        //         id_user: token.id_user,
        //         email: token.email,
        //         name: token.name,
        //         role: token.role,
        //     };
        //     if (token.role === 'SELER') {
        //         session.redirect = '/dashboard';
        //     } else if (token.role === 'CUSTOMER') {
        //         session.redirect = '/home';
        //     } else {
        //         session.redirect = '/'; // Redirect to unauthorteized page
        //     }
        //     return session;
        // },

        // async session({ session, token, user }) {
        //     // Send properties to the client, like an access_token and user id from a provider.

        //     session.user.id = token.id

        //     return session
        // },
        async session({ session, token }) {
            console.log(token);
            // Ensure the user object exists in the session

            if (token.role) {
                session.user = session.user,
                    session.user.role = token.role; // Assign role to session
                session.user.id_user = token.id_user; // Assign role to session

                // Redirect based on role
                // switch (token.role) {
                //     case 'SELER':
                //         session.redirect = '/dashboard';
                //         break;
                //     case 'CUSTOMER':
                //         session.redirect = '/home';
                //         break;
                //     default:
                //         session.redirect = '/'; // Redirect to unauthorized page if role is not recognized
                // }
            } else {
                session.redirect = '/login'; // Redirect to login if no role is found
            }
            console.log(session);
            return session;
        },
        async signIn({ account, profile }) {
            console.log(account);
            console.log(profile);
            try {
                if (!profile?.email) {
                    throw new Error('No profile')
                }

                const UserStatus = await prisma.user.findUnique({
                    where: {
                        email: profile.email
                    }
                })
                if (UserStatus == null) {
                    await prisma.user.upsert({
                        where: {
                            email: profile.email,
                        },
                        create: {
                            name: profile.name,
                            email: profile.email,
                            role: 'SELLER'
                        },
                        update: {
                            email: profile.email
                        }
                    })
                    return true
                }

                if (UserStatus.status === 'NONAKTIF') {
                    return null
                }


                // await prisma.user.update({
                //     where: {
                //         email: profile.email,
                //     },
                //     data: {
                //         email: profile.email
                //     }
                // })
                // return true //kalo true bisa login kalo null ke halaman /auth/error
            } catch (e) {
                console.log(e);
            }

        },

    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',// url halamana erro atau tidak bisa login
    }
});

export { authOptions as GET, authOptions as POST };
