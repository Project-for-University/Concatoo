
import Navbar from "./(customer)/navbar/navbar";
import { cookies } from 'next/headers'
import CardAcaraCustomer from "./(customer)/component/cardAcara";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";



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
    // Fetch tiketTermurah
    const tiketResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/read_tiket_termurah`, {
        method: 'GET',
    });
    const tiketData = await tiketResponse.json();


    console.log(acarasData);
    console.log(tiketData);
    return (
        <main className="flex-1 ">
            <Navbar />
            <CardAcaraCustomer acaraData={acarasData} tiketData={tiketData} session={session} />
        </main>
    )
}







