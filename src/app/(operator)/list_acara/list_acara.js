'use client'

import Image from 'next/image'
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function List_acara() {

    return (
        <>
            {/* {acaras.length === 0 || tiketTermurah === null ? (
                <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
                    <div className="border-2 border-dashed border-gray-300 text-gray-300 font-semibold bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl h-80 w-72 flex items-center justify-center">
                        <p>Tidak Ada Acara</p>
                    </div>
                </section>
            ) : ( */}
                <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mb-5">
                    {/* {acaras.map(acara => ( */}
                        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                            <Link href="">
                                <Image src="" alt="" className="h-80 w-72 object-cover rounded-t-xl" width={500} height={500} />
                                <div className="px-4 py-3 w-72">
                                    <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                                    <p className="text-lg font-bold text-black truncate block capitalize">Product Name</p>
                                    <div className="flex items-center">
                                        <p className="text-lg font-semibold text-black cursor-auto my-3">Tanggal</p>
                                        <del>
                                            <p className="text-sm text-gray-600 cursor-auto ml-2">Harga</p>
                                        </del>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    {/* ))} */}
                </section>
            {/* )} */}
        </>
    )
}