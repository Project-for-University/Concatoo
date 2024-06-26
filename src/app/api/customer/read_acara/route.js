import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {

    try {
        const acaras = await prisma.acara.findMany({
            where: {
                tiket: {
                    some: {}
                }
            },
            select: {
                id_acara: true,
                nama_acara: true,
                banner: true,
                tanggal_acara: true,
                lokasi: true,
                tiket: {
                    orderBy: {
                        harga: 'asc'
                    },
                    take: 1,
                }
            }
        })


        // console.log(acaras);

        return new Response(JSON.stringify(acaras), {
            status: 200,

        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ error: 'gagal fetch data' }), {
            status: 500,

        });
    } finally {
        await prisma.$disconnect(); // Pastikan koneksi Prisma ditutup dengan benar
    }
}
