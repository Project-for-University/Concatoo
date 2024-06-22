'use client'

import { z } from "zod";


const fileSchema = z.instanceof(File, { message: "banner harus ada" })
const imageSchema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith("image/")
)
// console.log(typeof imageSchema);
// console.log(imageSchema);

const validasi = z.object({

    id_user: z.string().min(1, { message: 'id_user harus ada' }),
    banner: imageSchema.refine(file => file.size > 0, "Banner harus ada").refine(file => file.size < 16777216, "Jangan Lebih dari 16 MB!"),//byte
    nama_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    nama_narahubung: z.string().min(1, { message: 'tidak boleh kosong' }),
    email: z.string().min(1, { message: 'tidak boleh kosong' }),
    no_ponsel: z.string().min(1, { message: 'tidak boleh kosong' }),
    tanggal_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    waktu_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    lokasi: z.string().min(1, { message: 'tidak boleh kosong' }),
    deskripsi_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    syarat_ketentuan: z.string().min(1, { message: 'tidak boleh kosong' }),
});

export async function CreateAcara(prevState, request) {

    const requestData = Object.fromEntries(request.entries());
    console.log(requestData);
    try {
        const validated = validasi.safeParse(requestData);
        console.log(validated);


        if (!validated.success) {
            console.error("Validasi gagal:", validated.error.formErrors.fieldErrors);
            return validated.error.formErrors.fieldErrors;
        }

        const data = validated.data;
        console.log(data);

        // Gabungkan tanggal dan waktu menjadi satu string ISO-8601

        const tglMp = data.tanggal_acara; // Format harus "YYYY-MM-DD"
        const WP = data.waktu_acara; // Format harus "HH:MM"
        const tanggalA = `${tglMp}T${WP}:00Z`;
        // console.log(data.banner);

        // kalo mau ambil form data memang harus pake get
        // kalo pake log + form data memang bakal kosong
        const formData = new FormData();
        formData.set('id_user', data.id_user);
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

        console.log({
            banner: formData.get('banner'),
            nama_narahubung: formData.get('nama_narahubung'),
            email: formData.get('email'),
            no_ponsel: formData.get('no_ponsel'),
            deskripsi_acara: formData.get('deskripsi_acara'),
            syarat_ketentuan: formData.get('syarat_ketentuan'),
            nama_event: formData.get('nama_event'),
            tanggal_acara: formData.get('tanggal_acara'),
            waktu_acara: formData.get('waktu_acara'),
            lokasi: formData.get('lokasi')
        });
        // logs the value of data.lokasi


        console.log('masuk');
        console.log('/api/seller/acara/buat_acara', formData);
        const res = await fetch('/api/seller/acara/buat_acara', {
            method: 'POST',
            body: formData,
        })
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
        console.error(error);
    }
}

