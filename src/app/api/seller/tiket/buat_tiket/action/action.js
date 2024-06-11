'use server'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';
import { number, z } from "zod";

const prisma = new PrismaClient();

const validasi = z.object({
    id_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    nama_tiket: z.string().min(1, { message: 'tidak boleh kosong' }),
    jumlah_tiket: z.string().min(1, { message: 'tidak boleh kosong' }),
    harga: z.string().min(1, { message: 'tidak boleh kosong' }),
    deskripsi_tiket: z.string().min(1, { message: 'tidak boleh kosong' }),
    // tangal & waktu
    tanggal_mulai_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
    waktu_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
    tanggal_akhir_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
    waktu_akhir_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
}); 2

export async function CreateTiket(prevState, request) {
    console.log(request);
    const requestData = Object.fromEntries(request.entries());
    const validated = validasi.safeParse(requestData);
    console.log("Validasi hasil:", validated);

    if (!validated.success) {
        console.error("Validasi gagal:", validated.error.formErrors.fieldErrors);
        return validated.error.formErrors.fieldErrors;
    }

    const data = validated.data;
    console.log("Data tervalidasi:", data);


    // Gabungkan tanggal dan waktu menjadi satu string ISO-8601

    // tanggal mulai penjualan 
    const tglMp = data.tanggal_mulai_penjualan; // Format harus "YYYY-MM-DD"
    const WP = data.waktu_penjualan; // Format harus "HH:MM"
    const tanggal_mulai = `${tglMp}T${WP}:00Z`;

    console.log("Tanggal dan waktu acara:", tanggal_mulai);

    // tanggal akhir penjualan 
    const tglAp = data.tanggal_akhir_penjualan; // Format harus "YYYY-MM-DD"
    const WA = data.waktu_akhir_penjualan; // Format harus "HH:MM"
    const tanggal_akhir = `${tglAp}T${WA}:00Z`;

    console.log("Tanggal dan waktu acara:", tanggal_akhir);


    try {
        console.log('masuk');
        const res = await fetch('/api/seller/tiket/buat_tiket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_acara: '123123'
            })
        });

        if (!res.ok) {
            console.log('tidak baik baik saja');
        }

        const datares = await res.json();
        console.log(datares);
        console.log('berhasil');
    } catch (error) {
        console.log('gagal fetch:', error);
    }




}
