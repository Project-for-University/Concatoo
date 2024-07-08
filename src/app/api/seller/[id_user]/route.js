import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function GET(request, { params }) {
    console.log(params.id_user);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id_user: params.id_user
            }
        })
        console.log("🚀 ~ GET ~ user:", user)
        return new Response(JSON.stringify(user))
    } catch (error) {
        console.log(error);
    }

}