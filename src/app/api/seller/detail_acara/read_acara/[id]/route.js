import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export async function GET(request, { params }) {
    // console.log("berhasil get");
    // console.log(request.id);
    // console.log(params);
    // console.log(params.id);
    const acara = await prisma.acara.findFirst({
        where: {
            id_acara: params.id
        },
        include: {
            deskripsi: true,
            kontak: true,
            user: true
        }
    })
    // console.log(acara);
    return new Response(JSON.stringify(acara))
    // return new Response(JSON.stringify({ message: 'berhasil' }))
}