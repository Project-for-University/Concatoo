'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export async function POST(request, { params }) {
    const data = await request.json()
    // console.log(request);
    // console.log(params);
    // console.log(params.id)
    // console.log(data)

    try {
        const acara = await prisma.acara.findFirst({
            where: { id_acara: params.id },
            include: {
                kontak: true,
                deskripsi: true
            }
        })
        const updateAcara = await prisma.acara.update({
            where: { id_acara: params.id },
            data: {
                nama_event: data.nama_event,
                banner: data.banner,
                tanggal_acara: data.tanggal_acara,
                waktu_acara: data.waktu_acara,
                lokasi: data.lokasi,
                kontak: {
                    update: {
                        nama_narahubung: data.nama_narahubung,
                        email: data.email,
                        no_ponsel: data.no_ponsel
                    }
                },
                deskripsi: {
                    update: {
                        deskripsi_acara: data.deskripsi_acara,
                        syarat_ketentuan: data.syarat_ketentuan
                    }
                }
            },
            include: {
                kontak: true,
                deskripsi: true
            }
        })
        // console.log(updateAcara)



        return new Response(JSON.stringify(acara))

    } catch (e) {
        // console.log('tidak baik baik saja', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
    }

}