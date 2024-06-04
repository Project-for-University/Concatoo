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
});

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

    // tanggal mulai penjualan 
    const tglAp = data.tanggal_akhir_penjualan; // Format harus "YYYY-MM-DD"
    const WA = data.waktu_akhir_penjualan; // Format harus "HH:MM"
    const tanggal_akhir = `${tglAp}T${WA}:00Z`;

    console.log("Tanggal dan waktu acara:", tanggal_akhir);





    const newKontak = await prisma.tiket.create({
        data: {
            nama_tiket: data.nama_tiket,
            jumlah_tiket: data.jumlah_tiket,
            harga: parseInt(data.harga),
            deskripsi_tiket: data.deskripsi_tiket,
            tanggal_mulai_penjualan: new Date(tanggal_mulai),
            waktu_penjualan: new Date(tanggal_mulai),
            tanggal_akhir_penjualan: new Date(tanggal_akhir),
            waktu_akhir_penjualan: new Date(tanggal_akhir),
            id_acara: data.id_acara
        }
    });
    console.log("Kontak baru dibuat:", newKontak);


    if (newKontak) {
        console.log('Berhasil membuat acara');
        redirect(`/event/buat_event/acara/detail_acara/${data.id_acara}`);
    } else {
        console.error('Gagal membuat acara');
    }

}
