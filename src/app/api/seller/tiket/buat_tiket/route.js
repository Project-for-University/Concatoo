'use server'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();


export async function POST(request, { params }) {
    const data = await request.json();
    console.log(data);
    try {
        const newKontak = await prisma.tiket.create({
            data: {
                nama_tiket: data.nama_tiket,
                jumlah_tiket: data.jumlah_tiket,
                harga: parseInt(data.harga),
                deskripsi_tiket: data.deskripsi_tiket,
                tanggal_mulai_penjualan: data.tanggal_mulai_penjualan,
                waktu_penjualan: data.waktu_penjualan,
                tanggal_akhir_penjualan: data.tanggal_akhir_penjualan,
                waktu_akhir_penjualan: data.waktu_akhir_penjualan,
                id_acara: data.id_acara
            }
        })
        // console.log('berasil');
        return NextResponse.redirect(new URL(`/detail_acara/${data.id_acara}`, request.url), 303);
    } catch (e) {
        // console.log('tidak baik baik saja', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
    }

}







