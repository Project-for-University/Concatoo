// 'use server'
// import { PrismaClient } from '@prisma/client'
// import { NextResponse } from 'next/server';
// import fs from 'fs/promises';
// import { ID } from 'appwrite';
// import { storage } from '@/app/api/appwrite';
// const prisma = new PrismaClient();


// export async function PUT(req, { params }) {
//     // const data = await request.json()
//     // console.log(request);
//     // console.log(params);
//     // console.log(params.id)
//     // console.log(data)
//     try {
//         const formData = await req.formData();
//         console.log(formData);
//         const banner = formData.get('banner');
//         console.log("🚀 ~ PUT ~ banner:", banner)
//         const namaNarahubung = formData.get('nama_narahubung');
//         const email = formData.get('email');
//         const noPonsel = formData.get('no_ponsel');
//         const deskripsiAcara = formData.get('deskripsi_acara');
//         const syaratKetentuan = formData.get('syarat_ketentuan');
//         const namaAcara = formData.get('nama_acara');
//         const tanggalAcara = formData.get('tanggal_acara');
//         const waktuAcara = formData.get('waktu_acara');
//         const lokasi = formData.get('lokasi');






//         const result = await prisma.$transaction(async (prisma) => {
//             const id_banner = ID.unique()
//             const url_banner = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_BANNER}/files/${id_banner}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`


//             const acara = await prisma.acara.findFirst({
//                 where: { id_acara: params.id[0] },
//                 include: {
//                     kontak: true,
//                     deskripsi: true
//                 }
//             })
//             // let imagePath
//             // console.log(acara);
//             if (banner != null && banner.size > 0) {

//                 // const parts = banner.split('/');
//                 // const id_banner_split = parts[8];
//                 // console.log("🚀 ~ result ~ id_banner_split:", id_banner_split)

//                 const responsedel = await storage.deleteFile(
//                     process.env.NEXT_PUBLIC_BUCKET_BANNER, // Ganti dengan ID bucket Anda
//                     params.id[1],
//                 );
//                 if (responsedel) {
//                     const responsecreate = await storage.createFile(
//                         process.env.NEXT_PUBLIC_BUCKET_BANNER, // Ganti dengan ID bucket Anda
//                         id_banner,
//                         banner//harus ada ID.unique()
//                     );
//                 }

//                 // const bytes = await banner.arrayBuffer()
//                 // const buffer = Buffer.from(bytes)
//                 // await fs.unlink(`public${acara.banner}`)
//                 // // await fs.mkdir("public/bannerAcara", { recursive: true })
//                 // imagePath = `/bannerAcara/${crypto.randomUUID()}-${banner.name}`

//                 // await fs.writeFile(`public${imagePath}`, buffer)
//                 console.log('berhasil hapus file');
//             }

//             const updateAcara = await prisma.acara.update({
//                 where: { id_acara: params.id[0] },
//                 data: {
//                     nama_acara: namaAcara,
//                     banner: url_banner,
//                     tanggal_acara: tanggalAcara,
//                     waktu_acara: waktuAcara,
//                     lokasi: lokasi,
//                     kontak: {
//                         update: {
//                             nama_narahubung: namaNarahubung,
//                             email: email,
//                             no_ponsel: noPonsel
//                         }
//                     },
//                     deskripsi: {
//                         update: {
//                             deskripsi_acara: deskripsiAcara,
//                             syarat_ketentuan: syaratKetentuan
//                         }
//                     }
//                 },
//                 include: {
//                     kontak: true,
//                     deskripsi: true
//                 }
//             })

//         });
//         // console.log(updateAcara)



//         return NextResponse.redirect(new URL('/acara', req.url), 303);

//     } catch (e) {
//         console.log('gagal update', e);
//         return new Response(JSON.stringify({ message: 'tidak baik baik saja' }))
//     }

// }
'use server'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import { ID } from 'appwrite';
import { storage } from '@/app/api/appwrite';

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
    try {
        const formData = await req.formData();
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

        const result = await prisma.$transaction(async (prisma) => {
            const id_banner = ID.unique();
            const url_banner = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_BANNER}/files/${id_banner}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;

            const acara = await prisma.acara.findFirst({
                where: { id_acara: params.id[0] },
                include: {
                    kontak: true,
                    deskripsi: true
                }
            });

            if (banner != null && banner.size > 0) {
                const responsedel = await storage.deleteFile(
                    process.env.NEXT_PUBLIC_BUCKET_BANNER,
                    params.id[1],
                );
                if (responsedel) {
                    await storage.createFile(
                        process.env.NEXT_PUBLIC_BUCKET_BANNER,
                        id_banner,
                        banner
                    );
                }

                const updateAcara = await prisma.acara.update({
                    where: { id_acara: params.id[0] },
                    data: {
                        nama_acara: namaAcara,
                        banner: url_banner,
                        tanggal_acara: tanggalAcara,
                        waktu_acara: waktuAcara,
                        lokasi: lokasi,
                        kontak: {
                            update: {
                                nama_narahubung: namaNarahubung,
                                email: email,
                                no_ponsel: noPonsel
                            }
                        },
                        deskripsi: {
                            update: {
                                deskripsi_acara: deskripsiAcara,
                                syarat_ketentuan: syaratKetentuan
                            }
                        }
                    },
                    include: {
                        kontak: true,
                        deskripsi: true
                    }
                });
            } else {
                const updateAcara = await prisma.acara.update({
                    where: { id_acara: params.id[0] },
                    data: {
                        nama_acara: namaAcara,
                        tanggal_acara: tanggalAcara,
                        waktu_acara: waktuAcara,
                        lokasi: lokasi,
                        kontak: {
                            update: {
                                nama_narahubung: namaNarahubung,
                                email: email,
                                no_ponsel: noPonsel
                            }
                        },
                        deskripsi: {
                            update: {
                                deskripsi_acara: deskripsiAcara,
                                syarat_ketentuan: syaratKetentuan
                            }
                        }
                    },
                    include: {
                        kontak: true,
                        deskripsi: true
                    }
                });
            }
        });

        return NextResponse.redirect(new URL('/acara', req.url), 303);

    } catch (e) {
        console.log('gagal update', e);
        return new Response(JSON.stringify({ message: 'tidak baik baik saja' }));
    }
}
