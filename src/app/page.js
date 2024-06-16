'use client'

import { useEffect, useState } from "react";
import Navbar from "./(customer)/navbar/navbar";
import Image from 'next/image'

export default function Component() {
    return (
        <main className="flex-1 p-4">
            <Navbar />
            <CardAcara />
        </main>
    )
}

function CardAcara() {
    const [acaras, setAcara] = useState([]);
    const [tiketTermurah, setTiketTermurah] = useState(null);
    // console.log(acaras);
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch acaras
                const acarasResponse = await fetch('/api/customer/read_acara');
                const acarasData = await acarasResponse.json();

                // Set acaras state
                if (Array.isArray(acarasData)) {
                    setAcara(acarasData);
                } else {
                    console.error("Expected an array of acaras but received:", typeof acarasData);
                    setAcara([]);
                }

                // Fetch tiketTermurah
                const tiketResponse = await fetch('/api/customer/read_tiket_termurah');
                const tiketData = await tiketResponse.json();
                // Set tiketTermurah state
                setTiketTermurah(tiketData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setAcara([]);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            {acaras.length === 0 ? (
                <h1>tidak ada data</h1>
            ) : (
                <div className="grid grid-cols-4 gap-6 mx-6 my-8">
                    {acaras.map(acara => {
                        const tanggalAcara = new Date(acara.tanggal_acara);
                        const formattedDate = tanggalAcara.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        });
                        return (
                            <div className="bg-white rounded-md overflow-hidden shadow-md" key={acara.id_acara}>
                                <Image src={acara.banner} alt={acara.banner} className="object-cover w-[350px] h-[200px] rounded" width={500} height={500} />
                                <div className="p-4">
                                    <h3 className="">{acara.nama_event}</h3>
                                    <p className="text-gray-600">{formattedDate}</p>
                                    <p className="text-sm text-emerald-600 font-bold">{tiketTermurah?.harga}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

