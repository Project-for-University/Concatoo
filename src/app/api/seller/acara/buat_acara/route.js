'use server'
import { PrismaClient } from '@prisma/client'
import fs from "fs/promises"
const prisma = new PrismaClient();
import crypto from "crypto"


export async function POST(request, { params }) {
    const data = await request.json();
    console.log(data);
    // conver file dan simpan di public
    await fs.mkdir('public/bannerAcara', { recursive: true })
    const bannerPath = `/bannerAcara/${crypto.randomUUID()}-${data.banner.name}`;
    console.log(bannerPath);
    await fs.writeFile(`public${bannerPath}`, Buffer.from(''), { flag: 'wx' });

    // queri
    try {
        const result = await prisma.$transaction(async (prisma) => {
            const newKontak = await prisma.kontak.create({
                data: {
                    nama_narahubung: data.nama_narahubung,
                    email: data.email,
                    no_ponsel: data.no_ponsel,
                }
            })



            const newDeskrpsi = await prisma.deskrpsi.create({
                data: {
                    deskripsi_acara: data.deskripsi_acara,
                    syarat_ketentuan: data.syarat_ketentuan,
                }
            });




            const newAcara = await prisma.acara.create({
                data: {
                    banner: bannerPath,
                    nama_event: data.nama_event,
                    tanggal_acara: data.tanggal_acara,
                    waktu_acara: data.waktu_acara,
                    lokasi: data.lokasi,
                    id_deskripsi: newDeskrpsi.id_deskripsi,
                    id_kontak: newKontak.id_kontak
                }
            });



        });


        return new Response(JSON.stringify({ message: 'berhasil bos' }))

    } catch (e) {
        console.log('tidak baik baik saja', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
    }

}

//             email: data.email,
//             no_ponsel: data.no_ponsel,
//         }
//     });
//     console.log("Kontak baru dibuat:", newKontak);

//     const newDeskrpsi = await prisma.deskrpsi.create({
//         data: {
//             deskripsi_acara: data.deskripsi_acara,
//             syarat_ketentuan: data.syarat_ketentuan,
//         }
//     });
//     console.log("Deskripsi baru dibuat:", newDeskrpsi);

//     const newAcara = await prisma.acara.create({
//         data: {
//             nama_event: data.nama_event,
//             tanggal_acara: new Date(tanggalWaktuAcara), // Tanggal dengan format baru
//             waktu_acara: new Date(tanggalWaktuAcara),
//             lokasi: data.lokasi,
//             id_kontak: newKontak.id_kontak, // ID kontak dari create newKontak
//             id_deskripsi: newDeskrpsi.id_deskripsi, // ID deskripsi dari create newDeskripsi
//         }
//     });
//     console.log("Acara baru dibuat:", newAcara);
//     return newAcara;
// });