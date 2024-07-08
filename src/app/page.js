
import Navbar from "./(customer)/navbar/navbar";
import { cookies } from 'next/headers'
import CardAcaraCustomer from "./(customer)/component/cardAcara";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic'


export default async function Component() {

    const session = await getServerSession(authOptions)
    console.log(session);
    const cookieStore = cookies()
    const theme = cookieStore.get('theme')

    // Fetch acaras
    const acarasResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/read_acara`, {
        method: 'GET',
    });
    const acarasData = await acarasResponse.json();
    console.log("🚀 ~ Component ~ acarasData:", acarasData)
    // Fetch tiketTermurah


    console.log(acarasData);
    return (
        <main className="flex-1 ">
            <Navbar />
            <CardAcaraCustomer acaraData={acarasData} session={session} />
        </main>
    )
}







