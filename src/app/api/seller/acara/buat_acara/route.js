'use server'
import { PrismaClient } from '@prisma/client'
import fs from "fs/promises"
const prisma = new PrismaClient();
import crypto from "crypto"


export async function POST(req, { params }) {
    const formData = await req.formData();
    const banner = formData.get('banner');
    const namaNarahubung = formData.get('nama_narahubung');
    const email = formData.get('email');
    const noPonsel = formData.get('no_ponsel');
    const deskripsiAcara = formData.get('deskripsi_acara');
    const syaratKetentuan = formData.get('syarat_ketentuan');
    const namaEvent = formData.get('nama_event');
    const tanggalAcara = formData.get('tanggal_acara');
    const waktuAcara = formData.get('waktu_acara');
    const lokasi = formData.get('lokasi');

    console.log(banner);
    console.log(namaNarahubung);
    console.log(email);
    console.log(noPonsel);
    console.log(deskripsiAcara);
    console.log(syaratKetentuan);
    console.log(namaEvent);
    console.log(tanggalAcara);
    console.log(waktuAcara);
    console.log(lokasi);

    const bytes = await banner.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    // const path = `/tmp/${file.name}`
    // await writeFile(path, buffer)
    // const data = await request.json();
    // console.log(formDataValues);



    // queri
    try {
        // generate image
        await fs.mkdir("public/bannerAcara", { recursive: true })
        const imagePath = `/bannerAcara/${crypto.randomUUID()}-${banner.name}`


        const result = await prisma.$transaction(async (prisma) => {
            const newKontak = await prisma.kontak.create({
                data: {
                    nama_narahubung: namaNarahubung,
                    email: email,
                    no_ponsel: noPonsel,
                }
            })



            const newDeskrpsi = await prisma.deskrpsi.create({
                data: {
                    deskripsi_acara: deskripsiAcara,
                    syarat_ketentuan: syaratKetentuan,
                }
            });




            const newAcara = await prisma.acara.create({
                data: {
                    banner: imagePath,
                    nama_event: namaEvent,
                    tanggal_acara: tanggalAcara,
                    waktu_acara: waktuAcara,
                    lokasi: lokasi,
                    id_deskripsi: newDeskrpsi.id_deskripsi,
                    id_kontak: newKontak.id_kontak
                }
            });

            await fs.writeFile(`public${imagePath}`, buffer)

        });



        return new Response(JSON.stringify({ message: 'berhasil bos' }))

    } catch (e) {
        console.log('tidak baik baik saja', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
    }

}
