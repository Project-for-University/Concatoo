'use client'


// import { redirect } from 'next/navigation';

// import { useRouter } from 'next/navigation';
import { z } from "zod";


const validasi = z.object({
    id_acara: z.string().min(1, { message: 'id acara tidak di temukan' }),
    id_tiket: z.string().min(1, { message: 'id tiket tidak di temukan' }),
    jumlah_tiket: z.string().min(1, { message: 'tidak boleh kosong' }),
    nama_tiket: z.string().min(1, { message: 'tidak boleh kosong' }),
    harga: z.string().min(1, { message: 'tidak boleh kosong' }),
    deskripsi_tiket: z.string().min(1, { message: 'tidak boleh kosong' }),
    tanggal_mulai_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
    waktu_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
    tanggal_akhir_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
    waktu_akhir_penjualan: z.string().min(1, { message: 'tidak boleh kosong' }),
});

export async function UpdateTiket(prevState, request) {

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

    const tanggal = data.tanggal_mulai_penjualan; // Format harus "YYYY-MM-DD"
    const waktu = data.waktu_penjualan; // Format harus "HH:MM"
    const tanggal_akhir = data.tanggal_akhir_penjualan; // Format harus "YYYY-MM-DD"
    const waktu_akhir = data.waktu_akhir_penjualan; // Format harus "HH:MM"

    // Gabungkan tanggal dan waktu menjadi satu string ISO-8601
    const tanggalWaktuTiket = `${tanggal}T${waktu}:00Z`;
    // console.log("Tanggal dan waktu acara:", tanggalWaktuTiket);
    const tanggalAkhirWaktuTiket = `${tanggal_akhir}T${waktu_akhir}:00Z`;
    // console.log("Tanggal dan waktu acara:", tanggalAkhirWaktuTiket);




    try {
        // console.log('masuk');
        const res = await fetch(`/api/seller/tiket/edit_tiket/update_tiket/${data.id_tiket}/${data.id_acara}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nama_tiket: data.nama_tiket,
                jumlah_tiket: data.jumlah_tiket,
                harga: data.harga,
                deskripsi_tiket: data.deskripsi_tiket,
                tanggal_mulai_penjualan: new Date(tanggalWaktuTiket), // Tanggal dengan format baru
                waktu_penjualan: new Date(tanggalWaktuTiket),
                tanggal_akhir_penjualan: new Date(tanggalAkhirWaktuTiket), // Tanggal dengan format baru
                waktu_akhir_penjualan: new Date(tanggalAkhirWaktuTiket)
            })
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
