import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient
export async function GET(req, { params }) {
    console.log("🚀 ~ GET ~ params:", params)
    console.log("🚀 ~ GET ~ params:", req)

    try {
        //  count  records
        const total_acara = await prisma.acara.count({
            where: {
                id_user: params.id_user
            }
        });



        console.log("🚀 ~ GET ~ total_acara:", total_acara)
        return new Response(JSON.stringify(total_acara))
    } catch (error) {
        console.log(error);
    }

}