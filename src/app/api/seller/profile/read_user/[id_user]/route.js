import { PrismaClient } from '@prisma/client';

import { NextResponse } from 'next/server';


const prisma = new PrismaClient();

export async function GET(req, { params }) {
    console.log("🚀 ~ GET ~ params:", params)
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id_user: params.id_user
            }
        });
        return NextResponse.json(findUser);
    } catch (error) {
        console.log(error);
    }
}
