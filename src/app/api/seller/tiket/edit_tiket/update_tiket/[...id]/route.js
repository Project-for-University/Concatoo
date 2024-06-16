'use server'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function POST(request, { params }) {
    console.log(params.id[0]);
    console.log(params.id[1]);
    const data = await request.json()
    // console.log(request);
    // console.log(params);
    // console.log(params.id)
    // console.log(data)

    try {
        const tikets = await prisma.tiket.findFirst({
            where: { id_tiket: params.id[0] }
        })
        // console.log(tikets)
        const updateTiket = await prisma.tiket.update({
            where: { id_tiket: params.id[0] },
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
        return NextResponse.redirect(new URL(`/detail_acara/${params.id[1]}`, request.url), 303);
    } catch (e) {
        // console.log('tidak baik baik saja', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
    }

}