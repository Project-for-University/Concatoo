'use client'


import { redirect } from 'next/navigation';
import { z } from "zod";






const validasi = z.object({
    username: z.string().min(1, { message: 'tidak boleh kosong' }),
    phonenumber: z.string().min(1, { message: 'tidak boleh kosong' }),
    email: z.string().email({ message: 'harus email' }),
    password: z.string().min(1, { message: 'tidak boleh kosong' })
})
export async function CreateUser(prevState, request) {
    const validated = validasi.safeParse(Object.fromEntries(request.entries()))
    // console.log(validated);
    if (!validated.success) {
        return validated.error.formErrors.fieldErrors
    }
    const data = validated.data
    // console.log(data);



    // fetch
    try {
        const res = await fetch(`/auth/register/api`, {
            method: 'POST',
            body: JSON.stringify({
                username: data.username,
                phonenumber: data.phonenumber,
                email: data.email,
                password: data.password
            }),
        })
        if (res.redirected) {
            window.location.href = res.url;// Tangani redirect secara manual
            return;
        }

        if (res.ok) {
            const data = await res.json();
            console.log("🚀 ~ CreateUser ~ data:", data)
            return data
        } else {
            throw new Error('Failed to fetch comment');
        }
    } catch (e) {
        // console.log(e);
    }
}

