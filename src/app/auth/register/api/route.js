'use server'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';



import { z } from "zod";


const prisma = new PrismaClient();



// export async function POST(request) {
//     try {
//         // const data = await request.json(); // Parse JSON from request
//         // console.log(data);
//         const formdata = await request.json();

//         const newUser = await prisma.user.create({
//             data: {
//                 username: formdata.get('username'),
//                 phonenumber: formdata.get('phonenumber'),
//                 email: formdata.get('email'),
//                 password: formdata.get('password'),
//             },
//         });

//         return new Response(JSON.stringify(newUser), { status: 201 });
//     } catch (e) {
//         console.error(e);
//         return new Response(JSON.stringify({ error: e.message }), { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// }


const validate = z.object({
    username: z.string().min(1),
    phonenumber: z.string().min(1),
    email: z.string().min(1),
    password: z.string().min(1)
})


export async function CreateUser(formdata) {
    const result = validate.safeParse(Object.fromEntries(formdata.entries()))

    const data = result.data

    const user = prisma.user.create({
        data: {
            username: data.username,
            phone_number: data.phonenumber,
            email: data.email,
            password: data.password
        }
    })
    console.log('berhasil');
}