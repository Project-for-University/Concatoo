'use server'

import { signIn } from "../auth"
import { z } from "zod";

const validasi = z.object({
    email: z.string().min(1, { message: "email required" }),
    password: z.string().min(1, { message: "password required" })
})

export default async function LoginAction(prevState, formData) {

    // validasi data 
    const validated = validasi.safeParse(Object.fromEntries(formData.entries()))
    console.log(validated);

    // kirim pesan eror jika validasi = false
    // di kirim ke useFormState
    if (!validated.success) {
        return validated.error.formErrors.fieldErrors
    }

    const data = validated.data
    console.log(data);

    await signIn("credentials", data)
}