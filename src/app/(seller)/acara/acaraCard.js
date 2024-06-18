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
            {/* buat button search   */}
            <div class="flex justify-between mb-4 h-10 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">

                <form class="flex items-center ">
                    <label for="simple-search" class="sr-only">Cari</label>
                    <div class="relative w-full ">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <IoSearchOutline />
                        </div>
                        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full ps-10 px-3 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Cari" required />
                    </div>
                    <button type="submit" class="px-3 py-2 ms-2 text-sm font-medium text-white bg-emerald-700 rounded-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                        <span class="">Cari</span>
                    </button>
                </form>

                <Link href={`acara/buat_acara`} class="px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Buat Acara</Link>
                {Del?.message && <div className="text-emerald-600">{Del.message}</div>}
            </div>

            {/* buat card */}
            <div class="container mx-auto mt-10 p-4">
                <div class="grid grid-cols-* grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {acaras.map(acara => (
                        <div key={acara.id_acara}>
                            <Link href={`/detail_acara/${acara.id_acara}`}>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-96 sm:h-96 md:h-full lg:h-44">
                                    <Image src={acara.banner} className="w-full md:h-24 object-cover rounded-t-md" width={100} height={100} alt="" />
                                    <div class="p-5 text-xs">
                                        <p className="font-bold">{acara.nama_event}</p>
                                        <p class="mb-3 text-gray-700 dark:text-gray-400">

                                            {new Date(acara.tanggal_acara).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: '2-digit',
                                            })}-
                                            {new Date(acara.waktu_acara).toLocaleTimeString('id-ID', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false,
                                            })}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}

                    {/* <div class="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-96 sm:h-96 md:h-full lg:h-44">
                        <Image width={100} height={100} class="w-full rounded-t-lg object-cover md:h-24" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />
                        <div class="p-5 text-xs">
                            <p className="font-bold">Nama Acara</p>
                            <p class="mb-3 text-gray-700 dark:text-gray-400">Tanggal Acara</p>
                        </div>
                    </div> */}


                </div >
            </div >
            {/* akhir acara */}
            <div div
                class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4" >
                tidak ada acara
            </div >



        </>
    )
}