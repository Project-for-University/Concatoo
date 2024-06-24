import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient
export async function GET() {

    try {
        const total_acara = await prisma.user.count({
            where: {
                role: "SELLER"
            }
        })
        return new Response(JSON.stringify(total_acara))
    } catch (error) {
        console.log(error);
    }

}