import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return new Response(JSON.stringify(users))
    } catch (e) {

    } finally {
        await prisma.$disconnect
    }
}