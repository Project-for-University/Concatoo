import { PrismaClient } from '@prisma/client'

import { redirect } from 'next/navigation'
const prisma = new PrismaClient()



export default async function Delete({ params }) {
    const deleteUser = await prisma.user.delete({
        where: {
            id: params.id_pengguna
        }
    })
}
