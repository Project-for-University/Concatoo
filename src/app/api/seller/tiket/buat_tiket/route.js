'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export async function POST(request, { params }) {
    const data = await request.json();
    console.log(data);
    try {
        // const newKontak = await prisma.tiket.create({
        //     data: {
        //         nama_tiket: data.nama_tiket,
        //         jumlah_tiket: data.jumlah_tiket,
        //         harga: parseInt(data.harga),
        //         deskripsi_tiket: data.deskripsi_tiket,
        //         tanggal_mulai_penjualan: data.tanggal_mulai,
        //         waktu_penjualan: data.tanggal_mulai,
        //         tanggal_akhir_penjualan: data.tanggal_akhir,
        //         waktu_akhir_penjualan: data.tanggal_akhir,
        //         id_acara: data.id_acara
        //     }
        // })
        console.log('berasil');
        return new Response(JSON.stringify({ message: 'alhamdulikkah' }))
    } catch (e) {
        console.log('tidak baik baik saja', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
    }

}






