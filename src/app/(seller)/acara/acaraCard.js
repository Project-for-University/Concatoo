'use client'

import Image from 'next/image';
import Link from 'next/link';
// import Sidebar from '../dashboard/component/sidebar';
// import Navbar from '../dashboard/component/navbar';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { HiDotsHorizontal } from 'react-icons/hi';

export default function CardAcara({ data }) {
    const [acaras, setAcara] = useState(data);
    console.log(acaras);
    const [Del, setmDel] = useState([]);

    async function DeleteAcara(id_acara) {
        // console.log(id_acara);
        try {
            const response = await fetch(`/api/seller/acara/delete_acara/${id_acara}`, {
                method: 'DELETE',

            });

            if (response.ok) {
                // console.log('berhasil hapus');
                // kalo berhasil update read data terbaru
                const acarasResponse = await fetch('/api/seller/acara/read_acara');
                const acarasData = await acarasResponse.json();
                // console.log(acarasData);
                // Set acaras state
                if (Array.isArray(acarasData)) {
                    setAcara(acarasData);
                    setmDel({ message: 'behasil hapus data' })
                } else {
                    console.error("Expected an array of acaras but received:", typeof acarasData);
                    setAcara([]);
                }

            } else {
                const message = await response.json();
                setmDel({ message: 'dadal hapus data', details: message });
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            setmDel({ message: 'gagal hapus data', details: error.message });
        }
    }

    return (
        <>
            <div className="flex justify-between mb-4 h-10 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">Cari</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <IoSearchOutline />
                        </div>
                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Cari" required />
                    </div>
                    <button type="submit" className="px-3 py-2 ms-2 text-sm font-medium text-white bg-emerald-700 rounded-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                        <span className="">Cari</span>
                    </button>
                </form>

                <Link href={`acara/buat_acara`} className="px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Buat Acara</Link>
                {Del?.message && <div className="text-emerald-600">{Del.message}</div>}
            </div>

            <div className="container mx-auto">
                <div className="grid grid-cols-* grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {acaras.length === 0 ? (
                        <div className="border-2 border-dashed rounded-lg border-gray-300 text-gray-300 dark:border-gray-600 h-44 mb-4 flex items-center justify-center">
                            tidak ada acara
                        </div>
                    ) : (
                        acaras.map(acara => (
                            <div key={acara.id_acara}>
                                <Link href={`/detail_acara/${acara.id_acara}`}>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-96 sm:h-96 md:h-full lg:h-44">
                                        <Image src={acara.banner} className="w-full md:h-24 object-cover rounded-t-md" width={100} height={100} alt="" />
                                        <div className="p-5 text-xs">
                                            <p className="font-bold">{acara.nama_acara}</p>
                                            <p className="mb-3 text-gray-700 dark:text-gray-400">
                                                {new Date(acara.tanggal_acara).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: '2-digit',
                                                })}-
                                                {new Date(acara.waktu_acara).toLocaleTimeString('id-ID', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: false,
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}