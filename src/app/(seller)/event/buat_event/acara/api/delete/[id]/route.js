import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function DELETE(request, { params }) {
    console.log("Params ID:", params.id);

    try {
        const result = await prisma.$transaction(async (prisma) => {
            // // Cari acara terlebih dahulu untuk mendapatkan id_kontak dan id_deskripsi
            // const acaraToDelete = await prisma.acara.findUnique({
            //     where: {
            //         id_acara: params.id,
            //     },
            //     include: {
            //         kontak: true,
            //         deskripsi: true,
            //     },
            // });

            // console.log("Acara to delete:", acaraToDelete);

            // if (!acaraToDelete) {
            //     throw new Error("Acara tidak ditemukan");
            // }

            // const idKontak = acaraToDelete.kontak.id_kontak;
            // const idDeskripsi = acaraToDelete.deskripsi.id_deskripsi;

            // console.log("ID Kontak:", idKontak);
            // console.log("ID Deskripsi:", idDeskripsi);

            // // Hapus kontak terkait terlebih dahulu
            try {
                const kontaks = await prisma.kontak.delete({
                    where: { id_kontak: idKontak },
                });
                console.log("Deleted Kontak:", kontaks);
            } catch (error) {
                console.error("Error deleting kontak:", error);
                throw new Error("Gagal menghapus kontak");
            }

            // // Hapus deskripsi terkait
            // try {
            //     const desk = await prisma.deskripsi.delete({
            //         where: { id_deskripsi: idDeskripsi },
            //     });
            //     console.log("Deleted Deskripsi:", desk);
            // } catch (error) {
            //     console.error("Error deleting deskripsi:", error);
            //     throw new Error("Gagal menghapus deskripsi");
            // }

            // // Hapus acara setelah kontak dan deskripsi dihapus
            // try {
            //     const acaras = await prisma.acara.delete({
            //         where: { id_acara: params.id },
            //     });
            //     console.log("Deleted Acara:", acaras);
            // } catch (error) {
            //     console.error("Error deleting acara:", error);
            //     throw new Error("Gagal menghapus acara");
            // }

            return { message: "Acara, Kontak, dan Deskripsi berhasil dihapus" };
        });

        console.log("Transaction Result:", result);

        // Memicu revalidasi pada jalur yang relevan
        await revalidatePath('/event');

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error deleting data:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
