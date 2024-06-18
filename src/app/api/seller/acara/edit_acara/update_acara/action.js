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
    banner: imageSchema.refine(file => file.size > 0, "Banner harus ada"),
    banner: z.string().min(1, { message: 'tidak boleh kosong' }),
    nama_event: z.string().min(1, { message: 'tidak boleh kosong' }),
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
    const validated = validasi.safeParse(requestData);
    // console.log("Validasi hasil:", validated);

    if (!validated.success) {
        console.error("Validasi gagal:", validated.error.formErrors.fieldErrors);
        return validated.error.formErrors.fieldErrors;
    }

    const data = validated.data;
    // console.log("Data tervalidasi:", data);

    const tanggal = data.tanggal_acara; // Format harus "YYYY-MM-DD"
    const waktu = data.waktu_acara; // Format harus "HH:MM"

    // Gabungkan tanggal dan waktu menjadi satu string ISO-8601
    const tanggalWaktuAcara = `${tanggal}T${waktu}:00Z`;
    // console.log("Tanggal dan waktu acara:", tanggalWaktuAcara);




    try {
        // console.log('masuk');
        const res = await fetch(`/api/seller/acara/edit_acara/update_acara/${data.id_acara}`, {
            method: 'POST',

            body: JSON.stringify({
                nama_event: data.nama_event,
                tanggal_acara: new Date(tanggalWaktuAcara), // Tanggal dengan format baru
                waktu_acara: new Date(tanggalWaktuAcara),
                lokasi: data.lokasi,
                nama_narahubung: data.nama_narahubung,
                email: data.email,
                no_ponsel: data.no_ponsel,
                deskripsi_acara: data.deskripsi_acara,
                syarat_ketentuan: data.syarat_ketentuan
            }),

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
        // console.log('gagal fetch:');
    }


}
