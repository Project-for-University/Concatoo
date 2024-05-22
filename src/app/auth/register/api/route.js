'use server'

import { PrismaClient } from '@prisma/client'
import { data } from 'autoprefixer';
import { redirect } from 'next/navigation';
import { z } from "zod";


const prisma = new PrismaClient();


const validasi = z.object({
    username: z.string().min(1),
    phonenumber: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1)
})



export async function POST(request) {


    const formdata = await request.json();
    console.log(formdata);

    // cek validasi 
    const validated = validasi.safeParse({
        username: formdata.username,
        phonenumber: formdata.phonenumber,
        email: formdata.email,
        password: formdata.password,
    })
    if (!validated.success) {
        return validated.error.formErrors.fieldErrors
    }
    const data = validated.data

    const newUser = await prisma.user.create({
        data: {
            username: data.username,
            phonenumber: data.phonenumber,
            email: data.email,
            password: data.password,
        },
    });

    new Response(JSON.stringify(newUser), { status: 201 });
}


// const validate = z.object({
//     username: z.string().min(1),
//     phonenumber: z.string().min(1),
//     email: z.string().min(1),
//     password: z.string().min(1)
// })


// export async function CreateUser(formdata) {
//     const result = validate.safeParse(Object.fromEntries(formdata.entries()))

//     const data = result.data

//     const user = prisma.user.create({
//         data: {
//             username: data.username,
//             phone_number: data.phonenumber,
//             email: data.email,
//             password: data.password
//         }
//     })
//     console.log('berhasil');
// }