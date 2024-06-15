import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export async function DELETE(request, { params }) {
    // console.log(params.id);
    // console.log("berhasil get");
    // console.log(request);
    try {
        const acara = await prisma.tiket.delete({
            where: {
                id_tiket: params.id
            }
        })
        // console.log(acara);
        return new Response(JSON.stringify({ message: 'berhasil' }))
    } catch (error) {
        return new Response(JSON.stringify({ message: 'gagal' }))

    }
}