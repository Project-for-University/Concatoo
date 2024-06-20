'use client'


import { z } from "zod";



const validasi = z.object({
    id_acara: z.string().min(1, { message: 'tidak boleh kosong' }),
    nama_tiket: z.string().min(1, { message: 'tidak boleh kosong' }),
    jumlah_tiket: z.string().min(1, { message: 'tidak boleh kosong' }),
    harga: z.string().min(1, { message: 'tidak boleh kosong' }),
    deskripsi_tiket: z.string().min(1, { message: 'tidak boleh kosong' }),
    // tangal & waktu
    tanggal_mulai_penjualan: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    waktu_mulai_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
    tanggal_akhir_penjualan: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
    waktu_akhir_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
});

export async function CreateTiket(prevState, request) {
    const requestData = Object.fromEntries(request.entries());
    console.log(requestData);
    const validated = validasi.safeParse(requestData);
    console.log("Validasi hasil:", validated);

    if (!validated.success) {
        console.error("Validasi gagal:", validated.error.formErrors.fieldErrors);
        return validated.error.formErrors.fieldErrors;
    }

    const data = validated.data;
    // console.log("Data tervalidasi:", data);


    // Gabungkan tanggal dan waktu menjadi satu string ISO-8601

    // tanggal mulai penjualan 
    const tglMp = data.tanggal_mulai_penjualan; // Format harus "YYYY-MM-DD"
    const WP = data.waktu_mulai_penjualan; // Format harus "HH:MM"
    const tanggal_mulai = `${tglMp}T${WP}:00Z`;

    // console.log("Tanggal dan waktu acara:", tanggal_mulai);

    // tanggal akhir penjualan 
    const tglAp = data.tanggal_akhir_penjualan; // Format harus "YYYY-MM-DD"
    const WA = data.waktu_akhir_penjualan; // Format harus "HH:MM"
    const tanggal_akhir = `${tglAp}T${WA}:00Z`;

    // console.log("Tanggal dan waktu acara:", tanggal_akhir);


    try {
        // console.log('masuk');
        const res = await fetch(`/api/seller/tiket/buat_tiket`, {
            method: 'POST',

            body: JSON.stringify({
                id_acara: data.id_acara,
                nama_tiket: data.nama_tiket,
                jumlah_tiket: data.jumlah_tiket,
                harga: data.harga,
                deskripsi_tiket: data.deskripsi_tiket,
                tanggal_mulai_penjualan: new Date(tanggal_mulai), // Tanggal dengan format baru
                waktu_mulai_penjualan: new Date(tanggal_mulai), // Tanggal dengan format baru
                tanggal_akhir_penjualan: new Date(tanggal_akhir), // Tanggal dengan format baru
                waktu_akhir_penjualan: new Date(tanggal_akhir), // Tanggal dengan format baru

            }),


        });
        if (res.redirected) {
            window.location.href = res.url;// Tangani redirect secara manual
            return;
        }

        if (res.ok) {
            console.log('berhasil');
            return await res.json();
        } else {
            throw new Error('Failed to fetch comment');
        }


    } catch (error) {
        console.log('gagal fetch:', error);
    }




}
