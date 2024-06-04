'use server'

import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';
import { z } from "zod";

const prisma = new PrismaClient();

const validasi = z.object({
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




    const result = await prisma.$transaction(async (prisma) => {
        const newKontak = await prisma.kontak.create({
            data: {
                nama_narahubung: data.nama_narahubung,
                email: data.email,
                no_ponsel: data.no_ponsel,
            }
        });
        console.log("Kontak baru dibuat:", newKontak);

        const newDeskrpsi = await prisma.deskrpsi.create({
            data: {
                deskripsi_acara: data.deskripsi_acara,
                syarat_ketentuan: data.syarat_ketentuan,
            }
        });
        console.log("Deskripsi baru dibuat:", newDeskrpsi);

        const newAcara = await prisma.acara.create({
            data: {
                nama_event: data.nama_event,
                tanggal_acara: new Date(tanggalWaktuAcara), // Tanggal dengan format baru
                waktu_acara: new Date(tanggalWaktuAcara),
                lokasi: data.lokasi,
                id_kontak: newKontak.id_kontak, // ID kontak dari create newKontak
                id_deskripsi: newDeskrpsi.id_deskripsi, // ID deskripsi dari create newDeskripsi
            }
        });
        console.log("Acara baru dibuat:", newAcara);
        return newAcara;
    });

    if (result) {
        console.log('Berhasil membuat acara');
        redirect('/event');
    } else {
        console.error('Gagal membuat acara');
    }

}
