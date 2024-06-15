
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export async function GET(request, { params }) {
    // console.log("berhasil get");
    // console.log(request.id);
    // console.log(params);
    // console.log(params.id);
    const tikets = await prisma.tiket.findMany({
        where: {
            id_acara: params.id
        }
    })
    // console.log(tikets);
    return new Response(JSON.stringify(tikets))
}