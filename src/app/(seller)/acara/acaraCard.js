'use client'

import Image from 'next/image';
import Link from 'next/link';
// import Sidebar from '../dashboard/component/sidebar';
// import Navbar from '../dashboard/component/navbar';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { HiDotsHorizontal, HiOutlineDotsVertical } from 'react-icons/hi';

export default function CardAcara({ data }) {
    const [acaras, setAcara] = useState(data);
    console.log(acaras);


    const [isOpen, setIsOpen] = useState({});
    const toggleDropdown = (id) => {
        setIsOpen(prevState => ({ ...prevState, [id]: !prevState[id] }));
    };

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
                    alert('berhasil hapus data')
                } else {
                    console.error("Expected an array of acaras but received:", typeof acarasData);
                    setAcara([]);
                }

            } else {
                const message = await response.json();

            }
        } catch (error) {
            console.error('Error deleting data:', error);

        }
    }

    return (
        <>
            <div className="flex justify-end mb-4 h-10 rounded-lg">
                {/* <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">Cari</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <IoSearchOutline />
                        </div>
                        <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-3 py-2" placeholder="Cari" required />
                    </div>
                    <button type="submit" className="px-3 py-2 ms-2 text-sm font-medium text-white bg-emerald-700 rounded-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300">
                        <span className="">Cari</span>
                    </button>
                </form> */}

                <Link href={`acara/buat_acara`} className="px-3 mr-3 py-2 rounded-md text-sm font-medium text-center text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gardient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300">Buat Acara</Link>

            </div>

            <div className="container mx-auto">
                <div className="grid grid-cols-* grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {acaras.length === 0 ? (
                        <div className="border-2 border-dashed rounded-lg border-gray-300 text-gray-300 h-44 mb-4 flex items-center justify-center">
                            tidak ada acara
                        </div>
                    ) : (
                        acaras.map(acara => (
                            <div key={acara.id_acara} className="relative bg-white">
                                <Link href={`/detail_acara/${acara.id_acara}`}>
                                    <div className="border-2  border-gray-100 rounded-lg h-96 sm:h-96 md:h-full lg:h-44">
                                        <Image src={acara.banner} className="w-full md:h-24 object-cover rounded-t-md" width={100} height={100} alt="" />
                                        <div className="p-5 text-xs">
                                            <p className="font-bold">{acara.nama_acara}</p>
                                            <p className="mb-3 text-gray-700">
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
                                <button onClick={() => toggleDropdown(acara.id_acara)} className="absolute top-0 right-0 p-3 bg-gray-50 text-black rounded hover:bg-gray-200  flex items-center justify-center">
                                    <HiOutlineDotsVertical />
                                </button>
                                {isOpen[acara.id_acara] && (
                                    <div className="absolute top-0 right-0 mt-12  bg-white rounded-md shadow-lg py-2">
                                        <Link href={`/acara/edit_acara/${acara.id_acara}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full">Edit</Link>
                                        <button onClick={() => { DeleteAcara(acara.id_acara) }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full">Delete</button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}



