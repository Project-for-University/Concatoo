import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

import { z } from "zod";

const prisma = new PrismaClient()

const validasi = z.object({
    email: z.string().min(1, { message: "email required" }),
    password: z.string().min(1, { message: "password required" })
})


export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login"
    },
    adapter: PrismaAdapter(prisma),
    providers: [Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials) => {
            console.log(credentials);


            // validasi zod
            const validated = validasi.safeParseAsync(Credentials)
            console.log('hasil validasi');
            const data = (await validated).data

            // cek user apakah ada atau tidak
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            })
            console.log('cek prisma');
            console.log(user);
            if (!user) {
                throw new Error("User not found.")
            }

            // jadi pw user tidak perlu di hash, langsung di compare aja
            //misal pw nya 12341234 langsung di compare sama $2b$10$vzD09aOUUAtWigWb58cJR.I/6Lq930KjCAVSN9NmZG.WD45c7sc1O
            //nanti di cek apakah sama kalo benar ya true
            const match = await bcrypt.compare(credentials.password, user.password);
            console.log('hasil cek pw');
            console.log(match);

            if (user && match) {
                console.log("berhasil login");
                return user
            }

        }
    })],
})