import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";


const prisma = new PrismaClient();


export async function POST(request, { params }) {
    // console.log(request);
    // console.log(params);
    const data = await request.json()
    // console.log(data);
    const newUser = await prisma.user.create({
        data: {
            username: data.username,
            phonenumber: data.phonenumber,
            email: data.email,
            password: data.password
        },
    });
    return NextResponse.redirect(new URL(`/auth/login`, request.url), 303);
    // return NextResponse.redirect(new URL('/auth/login', request.url), 303)
}