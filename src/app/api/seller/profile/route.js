import { PrismaClient } from '@prisma/client';
import fs from "fs/promises";
import crypto from "crypto";
import { NextResponse } from 'next/server';
import { URL } from 'url';

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
    try {
        const formData = await req.formData();
        const id_user = formData.get('id_user');
        const avatar = formData.get('avatar');
        const name = formData.get('name');
        const no_ponsel = formData.get('no_ponsel');

        // phone duplikat
        if (no_ponsel) {
            const findUser = await prisma.user.findUnique({
                where: {
                    phonenumber: no_ponsel
                }
            });
            console.log("🚀 ~ findUser:", findUser);
            if (findUser) {
                return NextResponse.json({ error: 'No ponsel sudah digunakan' });
            }
        }

        // update tapi delete img di public dulu
        // const findiduser = await prisma.user.findFirst({
        //     where: { id_user: id_user },
        // });
        // let imagePath = findiduser.avatar;
        // console.log(findiduser);



        if (avatar && avatar.size > 0) {
            const id_banner = ID.unique();
            const url_banner = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BUCKET_ID}/files/${id_banner}/preview?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
            // const bytes = await avatar.arrayBuffer();
            // const buffer = Buffer.from(bytes);
            // if (findiduser.avatar) {
            //     await fs.unlink(`public${findiduser.avatar}`);
            // }
            // imagePath = `/avatar/${crypto.randomUUID()}-${avatar.name}`;

            // await fs.writeFile(`public${imagePath}`, buffer);
            // console.log('berhasil hapus file');
            const responsedel = await storage.deleteFile(
                process.env.NEXT_PUBLIC_BUCKET_ID,
                params.id[1],
            );
            if (responsedel) {
                await storage.createFile(
                    process.env.NEXT_PUBLIC_BUCKET_ID,
                    id_banner,
                    avatar
                );
            }
        }

        const updateData = {};
        if (id_user) updateData.id_user = id_user;
        if (avatar) updateData.avatar = avatar;
        if (name) updateData.name = name;
        if (no_ponsel) updateData.phonenumber = no_ponsel;

        const updateUser = await prisma.user.update({
            where: {
                id_user: id_user,
            },
            data: updateData
        });

        return NextResponse.redirect(new URL('/profile', req.url), 303);

    } catch (error) {
        console.log(error);
    }
}
