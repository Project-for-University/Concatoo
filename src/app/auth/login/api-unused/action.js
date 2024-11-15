
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation";

import { z } from "zod";



const validasi = z.object({
    email: z.string().min(1, { message: "email required" }),
    password: z.string().min(1, { message: "password required" })
})


export default async function ActionLogin(prevState, formdata) {
    // console.log(formdata);
    const validated = validasi.safeParse(Object.fromEntries(formdata.entries()))
    // console.log(validated);
    // kirim pesan eror jika validasi = false
    // di kirim ke useFormState
    if (!validated.success) {
        return validated.error.formErrors.fieldErrors
    }
    const data = validated.data
    // console.log(data);
    const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
    })
    if (res.status === 401) {
        return { error: 'Email atau Password Salah/Tidak Ada' }
    }
}