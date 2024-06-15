'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export async function POST(request, { params }) {
    const data = await request.json()
    // console.log(request);
    // console.log(params);
    // console.log(params.id)
    // console.log(data)

    try {
        const tikets = await prisma.tiket.findFirst({
            where: { id_tiket: params.id }
        })
        // console.log(tikets)
        const updateTiket = await prisma.tiket.update({
            where: { id_tiket: params.id },
            data: {
                nama_tiket: data.nama_tiket,
                jumlah_tiket: data.jumlah_tiket,
                harga: parseInt(data.harga),
                deskripsi_tiket: data.deskripsi_tiket,
                tanggal_mulai_penjualan: data.tanggal_mulai_penjualan,
                waktu_penjualan: data.waktu_penjualan,
                tanggal_akhir_penjualan: data.tanggal_akhir_penjualan,
                waktu_akhir_penjualan: data.waktu_akhir_penjualan
            },
        })
        // console.log(updateTiket)

        if (tikets) {
            // return redirect('/event')
            return new Response(JSON.stringify({ message: 'berhasil' }))
        }
    } catch (e) {
        // console.log('tidak baik baik saja', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
    }

}