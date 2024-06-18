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
                const acarasResponse = await fetch('/api/customer/read_acara', {
                    method: 'GET',



                });
                const acarasData = await acarasResponse.json();

                // Set acaras state
                if (Array.isArray(acarasData)) {
                    setAcara(acarasData);
                } else {
                    console.error("Expected an array of acaras but received:", typeof acarasData);
                    setAcara([]);
                }
                // Fetch tiketTermurah
                const tiketResponse = await fetch('/api/customer/read_tiket_termurah', {
                    method: 'GET',


                });
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
                <div className="w-[500px] h-[500px] bg-white rounded-2xl flex justify-center align-middle items-center mt-2">
                <h1 className="font- semibold text-2xl">tidak ada data</h1>
                </div>
            ) : (
                <div class="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4 p-8">
                    {acaras.map(acara => {
                        const tanggalAcara = new Date(acara.tanggal_acara);
                        const formattedDate = tanggalAcara.toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        });
                        return (
                            <div className="bg-white shadow-md rounded-md overflow-hidden" key={acara.id_acara}>
                                <Image src={acara.banner} alt={acara.banner} className="w-[full] h-[200px] rounded object-cover" width={500} height={500} />
                                <div className="p-4">
                                    <h3 className="font-bold text-xl">{acara.nama_event}</h3>
                                    <p className="text-gray-600">{formattedDate}</p>
                                    <p className="text-sm text-emerald-600 font-bold">{tiketTermurah?.harga}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
            }
        </>
    )
}

