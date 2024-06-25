import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function GET(req, { params }) {
    console.log(params.keyword)
    console.log(req)

    try {
        const acara = await prisma.acara.findMany({
            where: {
                OR: [
                    {
                        nama_acara: { contains: params.keyword }
                    },
                    {
                        deskripsi: {
                            deskripsi_acara: { contains: params.keyword }
                        }
                    }
                ]

            }
        });
        console.log("🚀 ~ GET ~ acara:", acara)

        return new Response(JSON.stringify(acara))
    } catch (e) {
        console.log(e);
    }


}