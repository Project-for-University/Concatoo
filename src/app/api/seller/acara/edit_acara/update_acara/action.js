'use client'

import { redirect } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import { z } from "zod";


const fileSchema = z.instanceof(File, { message: "banner harus ada" })
const imageSchema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith("image/")
)

// console.log(typeof imageSchema);
// console.log(imageSchema);

const validasi = z.object({
    id_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    banner: imageSchema.optional(),
    // banner: z.string().min(1, { message: 'tidak boleh kosong' }),
    nama_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    tanggal_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    waktu_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    lokasi: z.string().min(1, { message: 'tidak boleh kosong' }),
    nama_narahubung: z.string().min(1, { message: 'tidak boleh kosong' }),
    email: z.string().min(1, { message: 'tidak boleh kosong' }),
    no_ponsel: z.string().min(1, { message: 'tidak boleh kosong' }),
    deskripsi_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    syarat_ketentuan: z.string().min(1, { message: 'tidak boleh kosong' }),
});

export async function UpdateAcara(prevState, request) {
    // const router = useRouter();
    const requestData = Object.fromEntries(request.entries());
    console.log("🚀 ~ UpdateAcara ~ requestData:", requestData)
    const validated = validasi.safeParse(requestData);
    console.log("Validasi hasil:", validated);

    if (!validated.success) {
        console.error("Validasi gagal:", validated.error.formErrors.fieldErrors);
        return validated.error.formErrors.fieldErrors;
    }

    const data = validated.data;
    console.log("Data tervalidasi:", data);

    // const tanggal = data.tanggal_acara; // Format harus "YYYY-MM-DD"
    // const waktu = data.waktu_acara; // Format harus "HH:MM"

    // Gabungkan tanggal dan waktu menjadi satu string ISO-8601
    // console.log("Tanggal dan waktu acara:", tanggalWaktuAcara);
    const tglMp = data.tanggal_acara; // Format harus "YYYY-MM-DD"
    const WP = data.waktu_acara; // Format harus "HH:MM"
    const tanggalA = `${tglMp}T${WP}:00Z`;
    // console.log(data.banner);





    const formData = new FormData();
    console.log("🚀 ~ UpdateAcara ~ formData:", formData)


    formData.set('banner', data.banner);
    formData.set('nama_narahubung', data.nama_narahubung);
    formData.set('email', data.email);
    formData.set('no_ponsel', data.no_ponsel);
    formData.set('deskripsi_acara', data.deskripsi_acara);
    formData.set('syarat_ketentuan', data.syarat_ketentuan);
    formData.set('nama_acara', data.nama_acara);
    formData.set('tanggal_acara', new Date(tanggalA).toISOString());
    formData.set('waktu_acara', new Date(tanggalA).toISOString());
    formData.set('lokasi', data.lokasi);
    try {
        const res = await fetch(`/api/seller/acara/edit_acara/update_acara/${data.id_acara}`, {
            method: 'PUT',
            body: formData,
        });

        if (res.redirected) {
            window.location.href = res.url;// Tangani redirect secara manual
            return;
        }

        if (res.ok) {
            return await res.json();
        } else {
            throw new Error('Failed to fetch comment');
        }
    } catch (error) {
        console.log("🚀 ~ UpdateAcara ~ error:", error)

    }


}
