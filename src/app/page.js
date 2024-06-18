
import Navbar from "./(customer)/navbar/navbar";

import CardAcaraCustomer from "./(customer)/component/cardAcara";

export default async function Component() {


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
            <CardAcaraCustomer acaraData={acarasData} tiketData={tiketData} />
        </main>
    )
}







