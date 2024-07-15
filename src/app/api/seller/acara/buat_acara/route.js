'user serve'
import { PrismaClient } from '@prisma/client'
import fs from "fs/promises"
const prisma = new PrismaClient();
import crypto from "crypto"
import { NextResponse } from 'next/server';
import { URL } from 'url';
import { ID } from 'appwrite';
import { storage } from '@/app/api/appwrite';



export async function POST(req, { params }) {
    try {
        const formData = await req.formData();
        console.log(formData);
        const id_user = formData.get('id_user');
        const banner = formData.get('banner');
        const namaNarahubung = formData.get('nama_narahubung');
        const email = formData.get('email');
        const noPonsel = formData.get('no_ponsel');
        const deskripsiAcara = formData.get('deskripsi_acara');
        const syaratKetentuan = formData.get('syarat_ketentuan');
        const namaAcara = formData.get('nama_acara');
        const tanggalAcara = formData.get('tanggal_acara');
        const waktuAcara = formData.get('waktu_acara');
        const lokasi = formData.get('lokasi');

        // console.log(banner);
        // console.log(namaNarahubung);
        // console.log(email);
        // console.log(noPonsel);
        // console.log(deskripsiAcara);
        // console.log(syaratKetentuan);
        // console.log(namaEvent);
        // console.log(tanggalAcara);
        // console.log(waktuAcara);
        // console.log(lokasi);

        // const bytes = await banner.arrayBuffer()
        // const buffer = Buffer.from(bytes)


        // queri
        // try {
        // generate image
        // await fs.mkdir("public/bannerAcara", { recursive: true })
        // const imagePath = `/bannerAcara/${crypto.randomUUID()}-${banner.name}`


        const result = await prisma.$transaction(async (prisma) => {
            const id_banner = ID.unique()
            const url_banner = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_BANNER}/files/${id_banner}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`


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
                    id_user: id_user,
                    banner: url_banner,
                    nama_acara: namaAcara,
                    tanggal_acara: tanggalAcara,
                    waktu_acara: waktuAcara,
                    lokasi: lokasi,
                    id_deskripsi: newDeskrpsi.id_deskripsi,
                    id_kontak: newKontak.id_kontak
                }
            });
            if (newAcara) {
                const response = await storage.createFile(
                    process.env.NEXT_PUBLIC_BUCKET_BANNER, // Ganti dengan ID bucket Anda
                    id_banner,
                    banner//harus ada ID.unique()
                );
            }
            // await fs.writeFile(`public${imagePath}`, buffer)

        });
        console.log(result);

        // console.log('berhasil create acara');
        return NextResponse.redirect(new URL('/acara', req.url), 303);

    } catch (e) {
        console.log(e);
    }


}
