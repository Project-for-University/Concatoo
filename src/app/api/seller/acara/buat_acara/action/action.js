'use client'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';
import { z } from "zod";
import { useRouter } from 'next/router';
const prisma = new PrismaClient();

const fileSchema = z.object({
    name: z.string(),
    lastModified: z.number(),
    lastModifiedDate: z.date(),
    webkitRelativePath: z.string(),
    size: z.number(),
    type: z.string(),
});
const imageSchema = fileSchema
    .refine(file => file.size > 0, { message: 'Gambar tidak boleh kosong' })
    .refine(file => file.type.startsWith('image/'), { message: 'File harus berupa gambar' });

const validasi = z.object({
    banner: imageSchema,
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

export async function CreateAcara(prevState, request) {
    const requestData = Object.fromEntries(request.entries());
    console.log(requestData);
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


    try {
        console.log('masuk');
        const res = await fetch('/api/seller/acara/buat_acara', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                banner: data.banner,
                nama_narahubung: data.nama_narahubung,
                email: data.email,
                no_ponsel: data.no_ponsel,
                deskripsi_acara: data.deskripsi_acara,
                syarat_ketentuan: data.syarat_ketentuan,
                nama_event: data.nama_event,
                tanggal_acara: new Date(tanggalA), // Tanggal dengan format baru
                waktu_acara: new Date(tanggalA),
                lokasi: data.lokasi,
            })
        });

        const datares = await res.json();
        console.log(datares);

        router.push('/acara')


    } catch (error) {
        console.log('gagal fetch:', error);
    }


}
