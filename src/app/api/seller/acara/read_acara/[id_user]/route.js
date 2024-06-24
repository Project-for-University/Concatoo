import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'
export async function GET(request, { params }) {
    console.log("🚀 ~ GET ~ request:", request)
    console.log(params.id_user);




    try {
        // ambil data
        const acaras = await prisma.acara.findMany({
            where: {
                id_user: params.id_user
            },
            include: {
                kontak: true,
                deskripsi: true
            }
        })
        console.log("🚀 ~ GET ~ acaras:", acaras)

        // console.log(acaras);
        return new Response(JSON.stringify(acaras));
    } catch (error) {
        return new Response(JSON.stringify({ error: 'gagal fetch data' }), {
            status: 500,
        });
    } finally {
        await prisma.$disconnect(); // Pastikan koneksi Prisma ditutup dengan benar
    }
}
