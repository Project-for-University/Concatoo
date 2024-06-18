import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const tiketTermurah = await prisma.tiket.findFirst({
            orderBy: {
                harga: 'asc',
            }, take: 1
        });


        // console.log(tiketTermurah);

        return new Response(JSON.stringify(tiketTermurah), {
            status: 200,

        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'gagal fetch data' }), {
            status: 500,

        });
    } finally {
        await prisma.$disconnect(); // Pastikan koneksi Prisma ditutup dengan benar
    }
}
