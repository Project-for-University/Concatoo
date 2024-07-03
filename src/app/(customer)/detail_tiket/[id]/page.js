'use client'

import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "../../navbar/navbar";
import Footer from "../../footer/page";

export default function DetailAcara({ params }) {
    return (
        <Card param={params} />
    )
}

function Card({ param }) {
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

    return (
        <>
            <Navbar />
            <div className="m-8 grid gap-4 sm:grid-cols-1 md:grid-cols-1 mb-4">
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
                                                <td className="text-sm pr-3"> Tanggal Acara</td>
                                                <td className="text-sm pl-3">: {new Date(acaras.tanggal_acara).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: '2-digit' })}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-sm pr-3"> Lokasi</td>
                                                <td className="text-sm pl-3">: {acaras.lokasi}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-sm pr-3"> Waktu Acara</td>
                                                <td className="text-sm pl-3">: {new Date(acaras.waktu_acara).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</td>
                                            </tr>
                                        </tbody>
                                    </table>



                                    <h4 className="text-xl font-semibold pb-3 mt-6">Diselenggarakan oleh</h4>
                                    <div className="flex items-center mt-2">
                                        <div className="flex-shrink-0">
                                            {acaras.user ? (
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
                                                    src="" // Ganti dengan path gambar kamu
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
                                    <div className="flex flex-col items-start max-h-72">
                                        <h4 className="text-xl font-semibold  pb-3">{tiket.nama_tiket}</h4>
                                        <p className="text-sm">{tiket.deskripsi_tiket}</p>
                                        <div className="flex justify-between items-center w-full border-t-2 border-gray-200 border-dashed py-3 mt-3">
                                            <p className="text-xl font-semibold text-emerald-600">Rp. {tiket.harga}</p>
                                            <p className="text-sm"> {tiket.jumlah_tiket}</p>
                                        </div>
                                        <Link href={`/transaksi`} className=" bottom-0 mt-10 p-2 w-full text-white leading-none  uppercase bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                            Beli Tiket
                                        </Link>
                                    </div>
                                </div>

                            ))}

                        </>)}

                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}
