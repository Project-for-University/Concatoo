'use client'

import Navbar from '@/app/(seller)/dashboard/component/navbar';
import Sidebar from '@/app/(seller)/dashboard/component/sidebar';
import { HiOutlineDotsVertical } from "react-icons/hi";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdDeleteOutline, MdOutlineEdit, MdCalendarMonth, MdOutlineAccessTime, MdOutlineLocationOn } from 'react-icons/md';

export default function DetailAcara({ params }) {
    return (
        <Card param={params} />
    )
}

function Card({ param }) {
    // Get acara

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);
    console.log(param.id);
    const [acaras, setAcara] = useState([]);
    console.log("🚀 ~ Card ~ acara:", acaras)
    const [tikets, settikets] = useState([]);
    console.log("🚀 ~ Card ~ tikets:", tikets)
    // console.log(acara);
    // console.log(tikets);

    // setiap reload halaman read acara dan read tiket
    useEffect(() => {
        // get acara
        const fetchAcara = async () => {
            // console.log(param.id);
            const response = await fetch(`/api/seller/detail_acara/read_acara/${param.id}`, {
                method: 'GET',
            });
            const data = await response.json()
            console.log(data);
            if (response) {
                setAcara(data)
                // console.log('berhasil');
            }
        };

        // get tiket sesuai id acara
        const fetchTiket = async () => {
            // console.log(param.id);
            const response = await fetch(`/api/seller/detail_acara/read_tiket/${param.id}`, {
                method: 'GET',
            });
            const data = await response.json()
            console.log(data);
            // console.log(response);
            if (response) {
                settikets(data)
                // console.log('berhasil');
            }
        };
        fetchAcara();
        fetchTiket();

    }, [param.id]);

    // hapus tiket dan read tiket data terbaru
    async function DeleteTiket(id) {
        // console.log(id);
        const res = await fetch(`/api/seller/tiket/delete_tiket/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()

        if (res) {

            const response = await fetch(`/api/seller/detail_acara/read_tiket/${param.id}`, {
                method: 'GET',
            });
            const data = await response.json()

            if (response) {
                settikets(data)
            }
        }
    }

    const tanggalAcara = new Date(acaras.tanggal_acara);
    const formattedDate = tanggalAcara.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1  border-2 border-dashed border-white w-full">

                <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-4  border-2 border-dashed border-white w-full">

                    <div class="flex flex-col bg-gray-200 rounded-lg p-4  lg:col-span-2 md:col-span-1">
                        <Image src={acaras.banner} className="w-full h-80 object-cover rounded-lg" alt="banner" width={500} height={500} />
                        <div class="flex flex-col items-start mt-4">
                            <h4 class="text-xl font-semibold">Deskripsi Acara</h4>
                            <p class="text-sm">{acaras.deskripsi?.deskripsi_acara}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-2 w-full">

                        <div class="flex flex-col bg-gray-200 rounded-lg p-4  ">
                            <div class="flex flex-col items-start">
                                <h4 class="text-xl font-semibold">Nama Acara</h4>
                                <p class="text-sm">Some text about the thing that goes over a few lines.</p>
                                <Link href="" class="p-2 w-full text-whie  leading-none  mt-3   uppercase text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >
                                    Buat Tiket</Link>
                            </div>
                        </div>


                        <div className="flex flex-col bg-gray-200 rounded-lg p-4 relative">
                            <button onClick={toggleDropdown} className="absolute top-0 right-0 mt-2 mr-2">
                                <HiOutlineDotsVertical />
                            </button>
                            {isOpen && (
                                <div className="absolute top-0 right-0 mt-8 mr-2 bg-white text-black rounded shadow-lg">
                                    <button className="block px-4 py-2 text-sm" onClick={() => console.log('Edit clicked')}>Edit</button>
                                    <button className="block px-4 py-2 text-sm" onClick={() => console.log('Delete clicked')}>Delete</button>
                                </div>
                            )}
                            <div className="flex flex-col items-start">
                                <h4 className="text-xl font-semibold">Nama Tiket</h4>
                                <p className="text-sm">Tidak ada tiket</p>
                            </div>
                        </div>

                        {acaras.length == 0 ? (<>
                            <div class="flex flex-col bg-gray-200 rounded-lg p-4  ">
                                <div class="flex flex-col items-start">
                                    <p class="text-sm">Tidak ada tiket</p>
                                </div>
                            </div>
                        </>) : (<>
                            {tikets.map((tiket) => (
                                <div key={tiket.id_tiket} class="flex flex-col bg-gray-200 rounded-lg p-4  ">
                                    <div class="flex flex-col items-start">
                                        <h4 class="text-xl font-semibold">{tiket.nama_tiket}</h4>
                                        <p class="text-sm">{tiket.jumlah_tiket}</p>
                                        <p class="text-sm">{tiket.harga}</p>
                                        <p class="text-sm">{tiket.deskripsi_tiket}</p>
                                        <p class="text-sm">{tiket.tanggal_mulai_penjualan}</p>
                                        <p class="text-sm">{tiket.waktu_akhir_penjualan}</p>
                                        <p class="text-sm">{tiket.waktu_penjualan}</p>
                                        <p class="text-sm">{tiket.tanggal_akhir_penjualan}</p>
                                    </div>

                                    <div className="flex flex-col bg-gray-200 rounded-lg p-4 relative">
                                        <button onClick={toggleDropdown} className="absolute top-0 right-0 mt-2 mr-2">
                                            <HiOutlineDotsVertical />
                                        </button>
                                        {isOpen && (
                                            <div className="absolute top-0 right-0 mt-8 mr-2 bg-white text-black rounded shadow-lg">
                                                <button className="block px-4 py-2 text-sm" onClick={() => console.log('Edit clicked')}>Edit</button>
                                                <button className="block px-4 py-2 text-sm" onClick={() => console.log('Delete clicked')}>Delete</button>
                                            </div>
                                        )}
                                        <div className="flex flex-col items-start">
                                            <h4 className="text-xl font-semibold">Nama Tiket</h4>
                                            <p className="text-sm">Tidak ada tiket</p>
                                        </div>
                                    </div>


                                </div>

                            ))}

                        </>)}

                    </div>
                </div>
            </div>
        </>
    )
}
