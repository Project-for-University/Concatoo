import { PrismaClient } from '@prisma/client'
import { redirect } from 'next/navigation';
const prisma = new PrismaClient()

export default async function Delete({ params }) {

    const result = await prisma.$transaction(async (prisma) => {
        // Cari acara terlebih dahulu untuk mendapatkan id_kontak dan id_deskripsi
        const acaraToDelete = await prisma.acara.findUnique({
            where: {
                id_acara: params.id
            },
            include: {
                kontak: true,
                deskripsi: true
            }
        });

        if (!acaraToDelete) {
            throw new Error("Acara tidak ditemukan");
        }

        const idKontak = acaraToDelete.id_kontak;
        const idDeskripsi = acaraToDelete.id_deskripsi;

        // Hapus acara terlebih dahulu
        await prisma.acara.delete({
            where: { id_acara: params.id }
        });
        console.log("Acara dihapus");

        // Hapus kontak terkait
        await prisma.kontak.delete({
            where: { id_kontak: idKontak }
        });
        console.log("Kontak dihapus");

        // Hapus deskripsi terkait
        await prisma.deskrpsi.delete({
            where: { id_deskripsi: idDeskripsi }
        });
        console.log("Deskripsi dihapus");

        return { message: "Acara, Kontak, dan Deskripsi berhasil dihapus" };
    });

    if (result) {
        console.log('Berhasil hapus data');
        redirect('/');
    } else {
        console.error('Gagal membuat acara');
    }

}