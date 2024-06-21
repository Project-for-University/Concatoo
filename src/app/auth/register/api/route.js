import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


export async function POST(request, { params }) {
    console.log(request);
    console.log(params);
    const data = await request.json()
    console.log(data);
    const emailUser = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    });

    const phoneUser = await prisma.user.findFirst({
        where: {
            phonenumber: data.phonenumber
        }
    });

    if (emailUser && phoneUser) {
        return NextResponse.json({ duplikat: ' email dan no hp sudah di gunakan' });
    } else if (emailUser) {
        return NextResponse.json({ duplikat: ' email sudah di gunakan' });
    } else if (phoneUser) {
        return NextResponse.json({ duplikat: ' no hp sudah di gunakan' });
    }
    try {
        const hash = bcrypt.hashSync(data.password, 10);
        if (hash) {
            const newUser = await prisma.user.create({
                data: {
                    username: data.username,
                    phonenumber: data.phonenumber,
                    email: data.email,
                    password: hash
                },
            });

            if (newUser) {
                return NextResponse.redirect(new URL(`/auth/login`, request.url), 303);
            } else {
                return NextResponse.json({ error: 'Failed to create new user' });
            }
        } else {
            return NextResponse.json({ error: 'Failed to create password hash' });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while processing your request' });
    }
}