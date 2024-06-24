import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient
export async function GET() {

    try {
        const total_tiket = await prisma.tiket.count()
        return new Response(JSON.stringify(total_tiket))
    } catch (error) {
        console.log(error);
    }

}