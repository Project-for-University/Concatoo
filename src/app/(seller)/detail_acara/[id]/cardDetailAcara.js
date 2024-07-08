'use client'

import Navbar from '@/app/(seller)/dashboard/component/navbar';
import Sidebar from '@/app/(seller)/dashboard/component/sidebar';
import { HiOutlineDotsVertical } from "react-icons/hi";
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdDeleteOutline, MdOutlineEdit, MdCalendarMonth, MdOutlineAccessTime, MdOutlineLocationOn } from 'react-icons/md';



export default function CardDetailAcara({ param }) {
    // Get acara
    const [isOpen, setIsOpen] = useState({});
    const toggleDropdown = (id) => {
        setIsOpen(prevState => ({ ...prevState, [id]: !prevState[id] }));
    };

    console.log(param.id);
    const [acaras, setAcara] = useState([]);
    console.log("🚀 ~ Card ~ acara:", acaras)
    const [tikets, settikets] = useState([]);
    console.log("🚀 ~ Card ~ tikets:", tikets)
    // console.log(acara);
    // console.log(tikets);

    // setiap reload halaman read acara dan read tiket
    useEffect(() => {
        if (param.id) {
            // get acara
            const fetchAcara = async () => {
                // console.log(param.id);
                const response = await fetch(`/api/seller/detail_acara/read_acara/${param.id}`, {
                    method: 'GET',
                });
                const data = await response.json()
                console.log(data);
                console.log(data.user.name);
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
        }

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


    // dropdown
    if (param.id) {
        return (
            <>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 mb-4">

                    <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4 ">

                        <div className="flex flex-col bg-white border-1 shadow rounded-xl p-6  lg:col-span-2 md:col-span-1">
                            <Image src={acaras.banner} className="w-full h-80 object-cover rounded" alt="banner" width={800} height={800} />
                            <div className="flex flex-col items-start mt-4 mb-4">
                                <h4 className="text-xl font-semibold">Informasi Kontak</h4>
                                <p className="text-sm">Nama Narahubung : {acaras.kontak?.nama_narahubung}</p>
                                <p className="text-sm">No Ponsel: {acaras.kontak?.no_ponsel}</p>
                                <p className="text-sm">Email :{acaras.kontak?.email}</p>
                            </div>
                            <div className="flex flex-col items-start mt-4 mb-4">
                                <h4 className="text-xl font-semibold">Deskripsi Acara</h4>
                                <p className="text-sm">{acaras.deskripsi?.deskripsi_acara}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 w-full">

                            <div className="flex flex-col bg-white border-1 shadow rounded-lg p-6  ">
                                <div className="flex flex-col h-full ">
                                    <div>
                                        <h4 className="text-xl font-semibold pb-3">{acaras.nama_acara}</h4>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="text-sm pr-3 text-gray-400"> Tanggal Acara</td>
                                                    <td className="text-sm pl-3 text-gray-400">: {new Date(acaras.tanggal_acara).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: '2-digit' })}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-sm pr-3 text-gray-400"> Lokasi</td>
                                                    <td className="text-sm pl-3 text-gray-400">: {acaras.lokasi}</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-sm pr-3 text-gray-400"> Waktu Acara</td>
                                                    <td className="text-sm pl-3 text-gray-400">: {new Date(acaras.waktu_acara).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <h4 className="text-xl font-semibold pb-3 mt-6">Diselenggarakan oleh</h4>
                                        <div className="flex items-center mt-2">
                                            <div className="flex-shrink-0">
                                                {acaras.user?.avatar ? (
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        src={acaras.user.avatar} // Ganti dengan path gambar kamu
                                                        alt="Iqbal Herlambang"
                                                        className="w-16 h-16 rounded-full object-cover border-2"
                                                    />
                                                ) : (
                                                    <Image
                                                        width={20}
                                                        height={20}
                                                        src={'/asset/avatar.png'} // Ganti dengan path gambar kamu
                                                        alt="Iqbal Herlambang"
                                                        className="w-16 h-16 rounded-full object-cover border-2"
                                                    />
                                                )}

                                            </div>
                                            <div className="ml-4">
                                                {acaras.user ? (
                                                    <p className="text-xl text-gray-400">{acaras.user.name}</p>
                                                ) : (
                                                    <p className="text-xl text-gray-400">Nama tidak tersedia</p>
                                                )}
                                            </div>
                                        </div>

                                    </div>


                                    <Link href={`/tiket/buat_tiket/${acaras.id_acara}`} className=" bottom-0 mt-10 p-2 w-full text-white leading-none  uppercase bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                        Buat Tiket
                                    </Link>
                                </div>
                            </div>

                            {acaras.length == 0 ? (<>
                                <div className="flex flex-col bg-white border-1 shadow rounded-lg p-6  ">
                                    <div className="flex flex-col items-start">
                                        <p className="text-sm">Tidak ada tiket</p>
                                    </div>
                                </div>
                            </>) : (<>
                                {tikets.map((tiket) => (
                                    <div key={tiket.id_tiket} className="flex flex-col bg-white border-1 shadow rounded-lg p-6 relative">
                                        <button onClick={() => toggleDropdown(tiket.id_tiket)} className="absolute top-0 right-0 mt-3 mr-3">
                                            <HiOutlineDotsVertical className="mt-3" />
                                        </button>
                                        {isOpen[tiket.id_tiket] && (
                                            <div className="absolute top-0 right-0 mt-10 mr-2 bg-white text-black rounded shadow-lg">
                                                <Link href={`/tiket/edit_tiket/${tiket.id_tiket}/${acaras.id_acara}`} className="block px-4 py-2 text-sm hover:bg-gray-200">Edit</Link>
                                                <button className="block px-4 py-2 text-sm hover:bg-gray-200" onClick={() => DeleteTiket(tiket.id_tiket)}>Delete</button>
                                            </div>
                                        )}
                                        <div className="flex flex-col items-start max-h-72">
                                            <h4 className="text-xl  pb-3">{tiket.nama_tiket}</h4>
                                            <p className="text-sm">{tiket.deskripsi_tiket}</p>
                                            <div className="flex justify-between w-full">
                                                <p className="text-sm">Mulai: {new Date(tiket.tanggal_mulai_penjualan).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: '2-digit' })}</p>
                                                <p className="text-sm">Berakhir: {new Date(tiket.waktu_akhir_penjualan).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: '2-digit' })}</p>
                                            </div>
                                            <div className="flex justify-between w-full">
                                                <p className="text-sm">{new Date(tiket.waktu_mulai_penjualan).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                                                <p className="text-sm">{new Date(tiket.waktu_akhir_penjualan).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                                            </div>
                                            <div className="flex justify-between items-center w-full border-t-2 border-gray-200 border-dashed py-3 mt-3">
                                                <p className="text-xl font-semibold text-emerald-600">Rp. {tiket.harga}</p>
                                                <p className="text-sm"> {tiket.jumlah_tiket}</p>
                                            </div>
                                        </div>
                                    </div>

                                ))}

                            </>)}

                        </div>
                    </div>
                </div >
            </>
        )
    }


}
