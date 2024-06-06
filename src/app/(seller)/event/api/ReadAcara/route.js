import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const acaras = await prisma.acara.findMany({
            select: {
                id_acara: true,
                nama_event: true,
                banner: true,
                tanggal_acara: true,
                lokasi: true,
                waktu_acara: true
            }

        })


        console.log(acaras);

        return new Response(JSON.stringify(acaras), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
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
