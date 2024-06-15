'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export async function GET(request, { params }) {

    // console.log(request);
    // console.log(params);
    // console.log(params.id)


    try {
        const acara = await prisma.acara.findFirst({
            where: { id_acara: params.id },
            include: {
                kontak: true,
                deskripsi: true
            }
        })
        // console.log(acara)


        if (acara) {
            return new Response(JSON.stringify(acara))
        }
    } catch (e) {
        // console.log('tidak baik baik saja', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
    }

}