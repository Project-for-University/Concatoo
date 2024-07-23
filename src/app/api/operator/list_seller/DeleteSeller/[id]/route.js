import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { NextResponse } from 'next/server';
export async function DELETE(request,{params}) {
    try {
        console.log(params.id);
    const del= await prisma.user.delete({
        where:{
            id_user:params.id
        }
    })
    console.log(del);
    return NextResponse.json({ message: 'berhasil' });
    } catch (error) {
        console.log(error);
    }
}