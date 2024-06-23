import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function PATCH(req, { params }) {
    console.log(params.id_user);
    console.log(req);
    try {
        const UbahStatus = await prisma.user.update({
            where: {
                id_user: params.id_user
            },
            data: {
                status: 'NONAKTIF'
            }

        })
        return new Response('berhasil', { status: 200 })
    } catch (e) {
        console.log(e);
    }
}