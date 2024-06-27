'use client'

import { z } from "zod";


const fileSchema = z.instanceof(File, { message: "avatar harus ada" })
const imageSchema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith("image/")
)
// console.log(typeof imageSchema);
// console.log(imageSchema);

const validasi = z.object({
    id_user: z.string().min(1, { message: 'id_user harus ada' }),
    avatar: imageSchema.optional().refine(file => file.size < 16777216, "Jangan Lebih dari 16 MB!"),//byte
    name: z.string().max(50, { message: 'maksimum 50 karakter' }).optional(),
    no_ponsel: z.string().max(15, { message: 'maksimum 50 karakter' }).optional(),
});

export async function UpdateProfile(prevState, request) {
    const requestData = Object.fromEntries(request.entries());
    const validated = validasi.safeParse(requestData);
    console.log(validated);


    if (!validated.success) {
        console.error("Validasi gagal:", validated.error.formErrors.fieldErrors);
        return validated.error.formErrors.fieldErrors;
    }
    const data = validated.data;
    console.log(data);


    const formData = new FormData();
    formData.set('id_user', data.id_user);
    formData.set('avatar', data.avatar);
    formData.set('name', data.name);
    formData.set('no_ponsel', data.no_ponsel);


    const res = await fetch('/api/seller/profile', {
        method: 'PATCH',
        body: formData,
    })
    if (res.redirected) {
        window.location.href = res.url;// Tangani redirect secara manual
        return;
    }
    if (res.ok) {
        const response = res.json()
        console.log("🚀 ~ UpdateProfile ~ response:", response)
        return response
    } else {
        throw new Error('Failed to fetch comment');
    }
}