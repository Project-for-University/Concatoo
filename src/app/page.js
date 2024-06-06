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
    console.log(acaras);
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch acaras
                const acarasResponse = await fetch('/api/home/readAcara');
                const acarasData = await acarasResponse.json();

                // Set acaras state
                if (Array.isArray(acarasData)) {
                    setAcara(acarasData);
                } else {
                    console.error("Expected an array of acaras but received:", typeof acarasData);
                    setAcara([]);
                }

                // Fetch tiketTermurah
                const tiketResponse = await fetch('/api/home/ReadTiketTermurah');
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
                acaras.map(acara => {
                    const tanggalAcara = new Date(acara.tanggal_acara);
                    const formattedDate = tanggalAcara.toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    });
                    return (
                        <div className="grid grid-cols-3 gap-4 p-8" key={acara.id_acara}>
                            <div className="bg-white shadow-md rounded-md overflow-hidden">
                                <Image src="" alt="Image 1" className="w-full" width={10} height={10} />
                                <div className="p-4">
                                    <h3 className="">{acara.nama_event}</h3>
                                    <p className="text-gray-600">{formattedDate}</p>
                                    <p className="text-sm text-emerald-600 font-bold">{tiketTermurah?.harga}</p>

                                </div>
                            </div>
                        </div>
                    )
                })
            )}
        </>
    )
}

