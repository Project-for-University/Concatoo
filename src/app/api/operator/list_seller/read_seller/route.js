// Langkah 1: Impor PrismaClient
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Langkah 2: Buat fungsi async untuk mendapatkan pengguna
export async function GET() {
    try {
        // Langkah 3: Gunakan prisma.user.findMany() untuk mendapatkan semua pengguna
        const users = await prisma.user.findMany({
            where: {
                role: 'SELLER'
            }
        });
        console.log("🚀 ~ GET ~ users:", users)

        // Langkah 4: Kembalikan hasilnya

        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
