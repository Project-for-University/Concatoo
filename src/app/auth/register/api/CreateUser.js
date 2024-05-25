'use server'

import { PrismaClient } from '@prisma/client'
import { data } from 'autoprefixer';
import { redirect } from 'next/navigation';
import { object, z } from "zod";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();


const validasi = z.object({
    username: z.string().min(1, { message: 'tidak boleh kosong' }),
    phonenumber: z.string().min(1, { message: 'tidak boleh kosong' }),
    email: z.string().email({ message: 'harus email' }),
    password: z.string().min(1, { message: 'tidak boleh kosong' })
})



export async function CreateUser(prevState, request) {
    const validated = validasi.safeParse(Object.fromEntries(request.entries()))
    // const formdata = await request.json();
    console.log(validated);

    // // cek validasi 
    // const validated = validasi.safeParse({
    //     username: formdata.username,
    //     phonenumber: formdata.phonenumber,
    //     email: formdata.email,
    //     password: formdata.password,
    // })
    if (!validated.success) {
        return validated.error.formErrors.fieldErrors
    }
    const data = validated.data


    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(data.password, salt);
    const newUser = await prisma.user.create({
        data: {
            username: data.username,
            phonenumber: data.phonenumber,
            email: data.email,
            password: hash
        },
    });
    redirect('/auth/login')





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