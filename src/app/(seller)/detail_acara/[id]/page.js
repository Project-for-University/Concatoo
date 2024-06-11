'use client'

import Navbar from '@/app/(seller)/dashboard/component/navbar';
import Sidebar from '@/app/(seller)/dashboard/component/sidebar';

import 'flowbite';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';

export default function DetailAcara({ params }) {
    return (
        <Card param={params} />
    )
}

function Card({ param }) {
    // Get acara
    const [acara, setAcara] = useState([]);
    const [tikets, settikets] = useState([]);
    console.log(acara);
    console.log(tikets);



    // setiap reload halaman read acara dan read tiket
    useEffect(() => {
        // get acara
        const fetchAcara = async () => {
            console.log(param.id);
            const response = await fetch(`/api/seller/detail_acara/read_acara/${param.id}`, {
                method: 'GET'
            });
            const data = await response.json()
            console.log(response);
            if (response) {
                setAcara(data)
                console.log('berhasil');
            }
        };

        // get tiket sesuai id acara
        const fetchTiket = async () => {
            console.log(param.id);
            const response = await fetch(`/event/buat_event/acara/detail_acara/api/read_tiket/${param.id}`, {
                method: 'GET'
            });
            const data = await response.json()
            console.log(data);
            console.log(response);
            if (response) {
                settikets(data)
                console.log('berhasil');
            }
        };
        fetchAcara();
        fetchTiket();

    }, [param.id]);


    // hapus tiket dan read tiket data terbaru
    async function DeleteTiket(id) {
        console.log(id);
        const res = await fetch(`/api/seller/acara/delete_acara/${id}`, {
            method: 'DELETE',
        })
        const data = await res.json()
        console.log(res);
        console.log(data);
        if (res) {
            console.log('berhasil');
            const response = await fetch(`/event/buat_event/acara/detail_acara/api/read_tiket/${param.id}`, {
                method: 'GET'
            });
            const data = await response.json()
            console.log(data);
            console.log(response);
            if (response) {
                settikets(data)
                console.log('berhasil');
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
            <div className='flex'>
                <Sidebar />
                <div className="w-full p-4">
                    {/* detail acara */}
                    <div className="shadow-md rounded-lg overflow-hidden">
                        <div className="flex flex-col lg:flex-row">
                            <img src="https://via.placeholder.com/300x150" alt="Musikal Keluarga Cemara" className="w-full lg:w-1/2 object-cover" />
                            <div className="p-6 lg:w-1/2">
                                <h1 className="text-2xl font-bold">{acara.nama_event}</h1>
                                <p className="text-gray-600 mt-2">{formattedDate}</p>
                                <p className="text-gray-600">{new Date(acara.waktu_acara).toLocaleTimeString()}</p>
                                <p className="text-gray-600">{acara.lokasi}</p>
                                <div className="mt-4">
                                    <Link key={acara.id_acara} href={`/tiket/buat_tiket/${acara.id_acara}`} className="block w-48 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Buat Tiket</Link>
                                </div>
                            </div>
                        </div>
                        <div className="p-2">
                            <b>Deskripsi</b><br />
                            <p>{acara.deskripsi?.deskripsi_acara}</p>
                        </div>
                    </div>

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
                                    <div key={tiket.id_tiket} className="shadow-lg rounded-lg overflow-hidden mt-10 w-1/2">
                                        <h1 className="text-2xl font-bold pl-4 pt-4">{tiket.nama_tiket}</h1>
                                        <div className="flex justify-between">
                                            <div className="p-6 lg:w-1/2">
                                                <p className="text-gray-600 mt-2">Jumlah Tiket :{tiket.jumlah_tiket}</p>
                                                <p className="text-gray-600">Rp.{tiket.harga}</p>
                                                <p className="text-gray-600">{tiket.deskripsi_tiket}</p>
                                            </div>
                                            <div className="p-6 lg:w-1/2">
                                                <p className="text-gray-600">{tanggal_mulai} - {tanggal_akhir}</p>
                                                <p className="text-gray-600">{waktuMulai} - {waktuAkhir}</p>
                                            </div>
                                        </div>
                                        <div className="flex p-4 justify-end mr-6">
                                            <Link href={`/event/buat_event/tiket/api/edit/${tiket.id_tiket}`}>
                                                <MdOutlineEdit className="text-gray-500 hover:text-gray-700" />
                                            </Link>

                                            <button className="pl-2" onClick={() => DeleteTiket(tiket.id_tiket)}>
                                                <MdDeleteOutline className="text-gray-500 hover:text-gray-700" />
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
        </>
    )
}