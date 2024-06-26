'use client'

import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from "react";
import Footer from '../footer/page';
import { Suspense } from "react";

import { useSearchParams } from 'next/navigation';


export default function CardAcaraHasilSearch() {
    const [acaras, setAcara] = useState();
    console.log("🚀 ~ CardAcaraHasilSearch ~ acaras:", acaras)

    const searchParams = useSearchParams();
    const query = searchParams.get('query'); // Menangkap parameter query dari URL
    console.log(query)
    console.log(typeof query)

    // Fetch hasil pencarian berdasarkan parameter query
    const GetAcara = async (query) => {
        const res = await fetch(`/api/customer/search_acara/${query}`)
        const data = await res.json();
        console.log("🚀 ~ GetAcara ~ data:", data)

        if (data) {
            setAcara(data)
        }
        console.log("🚀 ~ GetAcara ~ data:", data)
    }

    useEffect(() => {
        if (query) {
            GetAcara(query)
        }
    }, [query]);


    if (acaras == 0) {
        return (
            <>

                <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    <div className=" text-gray-800 font-semibold bg-white   w-72 flex items-center justify-center">
                        <p>Hasil Pencarian :</p>
                    </div>
                </section>
                <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    <div className="border-2 border-dashed border-gray-300 text-gray-300 font-semibold bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl h-44 w-72 flex items-center justify-center">
                        <p>Acara Tidak ditemukan</p>
                    </div>
                </section>
                <Footer />

            </>
        )
    }


    return (
        <>
            <Suspense >
                <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    <div className=" text-gray-800 font-semibold bg-white   w-72 flex items-center justify-center">
                        <p>Hasil Pencarian :</p>
                    </div>
                </section>
                <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {acaras?.map(acara => {
                        const tiketTermurah = acara.tiket[0]; // tiket termurah sudah diurutkan dan diambil
                        return (
                            <div key={acara.id_acara} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                                <Link href={`/detail_tiket/${acara.id_acara}`}>
                                    <Image src={acara.banner} alt={acara.banner} unoptimized={false} className="h-80 w-72 object-cover rounded-t-xl" width={500} height={500} />
                                    <div className="px-4 py-3 w-72">
                                        <p className="text-base text-gray-700 truncate block capitalize">{acara.nama_acara}</p>
                                        <p className="text-sm text-gray-500 mt-1">{new Date(acara.tanggal_acara).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}</p>
                                        <p className="text-lg font-semibold text-black my-3 mr-1">Rp {tiketTermurah?.harga}</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}

                </section>
            </Suspense>
            <Footer />
        </>
    )


}