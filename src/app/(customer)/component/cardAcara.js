'use client'
import Image from 'next/image'
import { useEffect, useState } from "react";

export default function CardAcaraCustomer({ acaraData, tiketData }) {
    const [acaras, setAcara] = useState(acaraData);
    const [tiketTermurah, setTiketTermurah] = useState(tiketData);
    console.log(acaras);
    console.log(tiketTermurah);
    // console.log(acaras);

    return (
        <>
            {acaras.length === 0 || tiketTermurah === null ? (

                <section id="Projects" class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */}
                    <div class="border-2 border-dashed border-gray-300 text-gray-300 font-semibold  bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl h-80 w-72 flex items-center justify-center">
                        <p>Tidak Ada Acara</p>
                    </div>

                    {/* <!--   🛑 Product card 1 - Ends Here  --> */}
                </section>
                // <!-- 🛑 Grid Section - Ends Here -->






            ) : (
                <section id="Projects" class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    {acaras.map(acara => {
                        {/* <!--   ✅ Product card 1 - Starts Here 👇 --> */ }
                        <div class="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                            <a href="#">
                                <Image src={acara.banner} alt={acara.banner} className="h-80 w-72 object-cover rounded-t-xl" width={500} height={500} />
                                <div class="px-4 py-3 w-72">
                                    <span class="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                    <p class="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                    <div class="flex items-center">
                                        <p class="text-lg font-semibold text-black cursor-auto my-3">{new Date(acara.tanggal_acara).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}</p>
                                        <del>
                                            <p class="text-sm text-gray-600 cursor-auto ml-2">{tiketTermurah?.harga}</p>
                                        </del>
                                        {/* <div class="ml-auto">
                                    buat button
                                    </div> */}
                                    </div>
                                </div>
                            </a>
                        </div>
                    })}
                    {/* <!--   🛑 Product card 1 - Ends Here  --> */}
                </section>


            )
            }
        </>
    )
}