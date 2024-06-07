'use server'
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
    console.log("Params ID:", params.id);

    try {
        await prisma.$transaction(async (prisma) => {
            // Cari acara terlebih dahulu untuk mendapatkan id_kontak dan id_deskripsi
            const acaraToDelete = await prisma.acara.findUnique({
                where: {
                    id_acara: params.id,
                },
                include: {
                    kontak: true,
                    deskripsi: true,
                },
            });
            console.log(acaraToDelete);

            if (!acaraToDelete) {
                return NextResponse.json({ message: 'tidak ada id di temukan' });
            }


            try {
                const acaras = await prisma.acara.delete({
                    where: {
                        id_acara: acaraToDelete.id_acara
                    },

                });
                console.log("Deleted Acara:", acaras);
            } catch (error) {
                console.log("gagal del Acara");

            }
            // Hapus kontak terkait terlebih dahulu
            try {
                const kontaks = await prisma.kontak.delete({
                    where: {
                        id_kontak: acaraToDelete.id_kontak
                    }
                });
                console.log("aDA", kontaks);
            } catch (error) {
                console.log('gagal del kontak');
            }

            // Hapus deskripsi terkait
            try {
                console.log(acaraToDelete.id_deskripsi);
                const desk = await prisma.deskrpsi.delete({
                    where: {
                        id_deskripsi: acaraToDelete.id_deskripsi
                    }
                })
                console.log("Deleted Deskripsi:", desk);
            } catch (e) {
                console.log("gagal del deskripsi:");

            }

            // Hapus acara setelah kontak dan deskripsi dihapus

        });

        return NextResponse.json({ message: 'berhasil' });

    } catch (error) {
        console.error("Error deleting acara:");
        return NextResponse.json({ message: 'gagal' });
    }
}
