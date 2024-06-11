'use client'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';
import { z } from "zod";

const prisma = new PrismaClient();

const validasi = z.object({
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
    console.log(request);
    const requestData = Object.fromEntries(request.entries());
    const validated = validasi.safeParse(requestData);


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

    } catch (error) {
        console.log('gagal fetch:', error);
    }


}
