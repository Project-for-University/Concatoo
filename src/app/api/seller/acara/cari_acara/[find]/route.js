import { Prisma, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()
export async function GET(req, { params }) {
    console.log("🚀 ~ GET ~ params:", params.find)

    try {
        const searchText = await prisma.acara.findMany({
            where: {
                OR: [
                    {
                        // kalo di mysql constrains itu LIKE atau yang mirip atau ada hurup yang mirip
                        nama_acara: { contains: params.find }
                    },
                    {
                        deskripsi: {
                            deskripsi_acara: { contains: params.find }
                        }
                    }
                ]
            },
            select: {
                banner: true,
                id_acara: true,
                nama_acara: true,
                tanggal_acara: true,
                waktu_acara: true,
                lokasi: true,
                tanggal_acara: true,
                deskripsi: true,
            }


        })
        console.log(searchText);
        return new Response(JSON.stringify(searchText))
    } catch (error) {
        console.log(error);
    }

}