'use client'

import Navbar from '@/app/(seller)/dashboard/component/navbar';
import Sidebar from '@/app/(seller)/dashboard/component/sidebar';

import 'flowbite';
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
    const [acara, setAcara] = useState([]);
    const [tikets, settikets] = useState([]);
    // console.log(acara);
    // console.log(tikets);

    // setiap reload halaman read acara dan read tiket
    useEffect(() => {
        // get acara
        const fetchAcara = async () => {
            // console.log(param.id);
            const response = await fetch(`/api/seller/detail_acara/read_acara/${param.id}`, {
                method: 'GET'
            });
            const data = await response.json()
            // console.log(response);
            if (response) {
                setAcara(data)
                // console.log('berhasil');
            }
        };

        // get tiket sesuai id acara
        const fetchTiket = async () => {
            // console.log(param.id);
            const response = await fetch(`/api/seller/detail_acara/read_tiket/${param.id}`, {
                method: 'GET'
            });
            const data = await response.json()
            // console.log(data);
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
        // console.log(res);
        // console.log(data);
        if (res) {
            // console.log('berhasil');
            const response = await fetch(`/api/seller/detail_acara/read_tiket/${param.id}`, {
                method: 'GET'
            });
            const data = await response.json()
            // console.log(data);
            // console.log(response);
            if (response) {
                settikets(data)
                // console.log('berhasil');
            }
        }


    }
    const tanggalAcara = new Date(acara.tanggal_acara);
    const formattedDate = tanggalAcara.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return (
        <>
            <Navbar />
            <div className="flex">
                <Sidebar />
                <div className="w-full">
                    {/* detail acara */}
                    <div className="flex grid-cols-2 gap-2">
                        <div className="rounded-xl w-full h-fit bg-white shadow-md mx-6 mt-4">
                            <Image src="" width={8} height={8} alt="Musikal Keluarga Cemara" className="w-full lg:w-1/2 object-cover" />
                        </div>
                        <div className="w-auto h-fit p-6 mx-auto my-4 bg-white rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold">{acara.nama_event}</h1>
                            <p className="text-gray-600 mt-2 flex"> <MdCalendarMonth className="mr-2" />{formattedDate}</p>
                            <p className="text-gray-600 flex"><MdOutlineAccessTime className="mr-2" />{new Date(acara.waktu_acara).toLocaleTimeString()}</p>
                            <p className="text-gray-600 flex"><MdOutlineLocationOn className="mr-2" />{acara.lokasi}</p>
                            <div className="mt-4">
                                <Link key={acara.id_acara} href={`/tiket/buat_tiket/${acara.id_acara}`} className="block w-48 text-white bg-gradient-to-t from-amber-500 to-orange-300 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-gray-500">Buat Tiket</Link>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {/* Tiket */}
                        <div>
                            {tikets.length === 0 ? (
                                <p>tidak ada tiket</p>
                            ) : (
                                tikets.map((tiket) => {
                                    const tglM = new Date(tiket.tanggal_mulai_penjualan);
                                    const tanggal_mulai = tglM.toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    });
                                    const tglA = new Date(tiket.tanggal_akhir_penjualan);
                                    const tanggal_akhir = tglA.toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    });
                                    const waktuMulai = new Date(tiket.waktu_penjualan).toLocaleTimeString();
                                    const waktuAkhir = new Date(tiket.waktu_akhir_penjualan).toLocaleTimeString();

                                    return (
                                        <div key={tiket.id_tiket} className="shadow-lg rounded-lg overflow-hidden my-4 mx-6 w-1/2 bg-white">
                                            <h1 className="text-2xl font-bold pl-6 pt-4">{tiket.nama_tiket}</h1>
                                            <div className="flex justify-between">
                                                <div className="p-6 lg:w-1/2">
                                                    <p className="text-gray-600 mt-2">Jumlah Tiket :{tiket.jumlah_tiket}</p>
                                                    <p className="text-gray-600 font-bold">Rp.{tiket.harga}</p>
                                                    <p className="text-gray-600">{tiket.deskripsi_tiket}</p>
                                                </div>
                                                <div className="p-6 lg:w-1/2">
                                                    <p className="text-gray-600 flex"><MdCalendarMonth className="mr-2" />{tanggal_mulai} - {tanggal_akhir}</p>
                                                    <p className="text-gray-600 flex"><MdOutlineAccessTime className="mr-2" />{waktuMulai} - {waktuAkhir}</p>
                                                </div>
                                            </div>
                                            <div className="flex p-4 justify-end mr-6">
                                                <Link href={`/tiket/edit_tiket/${tiket.id_tiket}`}>
                                                    <MdOutlineEdit className="text-gray-500 hover:text-orange-700" />
                                                </Link>
                                                <button className="pl-2" onClick={() => DeleteTiket(tiket.id_tiket)}>
                                                    <MdDeleteOutline className="text-gray-500 hover:text-orange-700" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                        {/* Akhir Tiket */}
                    </div>
                </div>
            </div>
        </>
    )
}