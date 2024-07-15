'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from "fs/promises"
const prisma = new PrismaClient();
import { storage } from '@/app/api/appwrite';

export async function DELETE(request, { params }) {
    // console.log("Params ID:", params.id);


    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Cari acara terlebih dahulu untuk mendapatkan id_kontak dan id_deskripsi
            const acaraToDelete = await prisma.acara.findUnique({
                where: {
                    id_acara: params.id
                },
                include: {
                    kontak: true,
                    deskripsi: true,
                    tiket: true
                }
            });
            console.log(acaraToDelete);

            try {
                const acara = await prisma.acara.delete({
                    where: { id_acara: acaraToDelete.id_acara }
                });

                console.log("🚀 ~ result ~ acara:", acara)
                if (acara) {

                    const parts = acara.banner.split('/');
                    const id_banner_split = parts[8];
                    console.log("🚀 ~ CardAcara ~ id_banner_split:", id_banner_split)


                    await storage.deleteFile(
                        process.env.NEXT_PUBLIC_BUCKET_BANNER,
                        id_banner_split,
                    );
                }
                // console.log("Acara dihapus");

            } catch (e) {

                console.log(e);

            }
            if (!acaraToDelete) {
                throw new Error("Acara tidak ditemukan");
            }
            // Hapus Tiket terkait
            // Hapus kontak terkait
            try {
                await prisma.kontak.delete({
                    where: { id_kontak: acaraToDelete.id_kontak }
                });
                // console.log("Kontak dihapus");
            } catch (e) {
                console.log(e);
                // console.log("Kontak gagal dihapus");

            }

            // Hapus deskripsi terkait
            try {
                await prisma.deskrpsi.delete({
                    where: { id_deskripsi: acaraToDelete.id_deskripsi }
                });
                // console.log("Deskripsi dihapus");
            } catch (e) {
                console.log(e);
                // console.log("Deskripsi gagal dihapus");

            }

            // // hapus file banner
            // try {
            //     await fs.unlink(`public${acaraToDelete.banner}`)
            //     // console.log('foto di hapus');
            // } catch (e) {
            //     // console.log('foto gagal di hapus');
            // }


        });

        return NextResponse.json({ message: 'berhasil' });

    } catch (error) {
        console.error("Error deleting acara:");
        console.log(error);
        return NextResponse.json({ message: 'gagal' });
    }
}
