'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from "fs/promises"
import { storage } from '@/app/api/appwrite';
const prisma = new PrismaClient();


export async function DELETE(request, { params }) {
    console.log("Params ID:", params.id[0]);
    console.log("Params ID:", params.id[1]);



    try {

        // Cari acara terlebih dahulu untuk mendapatkan id_kontak dan id_deskripsi
        const acaraToDelete = await prisma.acara.findUnique({
            where: {
                id_acara: params.id[0]
            },
            include: {
                kontak: true,
                deskripsi: true,
                tiket: true
            }
        });
        console.log(acaraToDelete);


        const acara = await prisma.acara.delete({
            where: { id_acara: acaraToDelete.id_acara }
        });

        console.log("🚀 acara:", acara)
        if (acara) {


            // const parts = acaraToDelete.banner.split('/');
            // const id_banner_split = parts[8];
            // console.log("🚀 ~ CardAcara ~ id_banner_split:", id_banner_split)
            // console.log(typeof id_banner_split);

            // if (id_banner_split) {
            await storage.deleteFile(
                process.env.NEXT_PUBLIC_BUCKET_BANNER,
                params.id[1],
            );
            // }
            console.log("params.id[1]:", params.id[1])
            console.log("process", process.env.NEXT_PUBLIC_BUCKET_BANNER)


            // console.log("Acara dihapus");


            if (!acaraToDelete) {
                throw new Error("Acara tidak ditemukan");
            }
            // Hapus Tiket terkait
            // Hapus kontak terkait

            await prisma.kontak.delete({
                where: { id_kontak: acaraToDelete.id_kontak }
            });
            // console.log("Kontak dihapus");


            // Hapus deskripsi terkait

            const deskripsi = await prisma.deskrpsi.delete({
                where: { id_deskripsi: acaraToDelete.id_deskripsi }
            });
            // console.log("Deskripsi dihapus");


            // // hapus file banner
            // try {
            //     await fs.unlink(`public${acaraToDelete.banner}`)
            //     // console.log('foto di hapus');
            // } catch (e) {
            //     // console.log('foto gagal di hapus');
            // }


            return NextResponse.json({ message: 'berhasil' });
        }





    } catch (error) {
        console.error("Error deleting acara:");
        console.log(error);
        return NextResponse.json({ message: 'gagal' });
    }
}
