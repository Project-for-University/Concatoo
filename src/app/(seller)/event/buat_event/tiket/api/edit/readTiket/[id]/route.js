'use server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export async function GET(request, { params }) {
    
    console.log(request);
    console.log(params);
    console.log(params.id)


    try {
    const tiket = await prisma.tiket.findFirst()
    console.log(tiket)
    

        if (tiket) {
            return new Response(JSON.stringify(tiket))
        }
    } catch (e) {
        console.log('tidak baik baik saja', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
    }

}