import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
    // console.log('berhasil masuk');
    // console.log(request);
    // console.log(params);




    try {
        // ambil data
        const acaras = await prisma.acara.findMany({
            include: {
                kontak: true,
                deskripsi: true
            }
        })

        // console.log(acaras);
        return new Response(JSON.stringify(acaras));
    } catch (error) {
        return new Response(JSON.stringify({ error: 'gagal fetch data' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } finally {
        await prisma.$disconnect(); // Pastikan koneksi Prisma ditutup dengan benar
    }
}
