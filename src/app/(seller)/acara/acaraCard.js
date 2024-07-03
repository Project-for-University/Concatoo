'use client'

import Image from 'next/image';
import Link from 'next/link';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useEffect, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { HiDotsHorizontal, HiOutlineDotsVertical } from 'react-icons/hi';
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
import Loading from '@/app/loading';
import { storage } from '@/app/api/appwrite';

export default function CardAcara() {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [acaras, setAcara] = useState('');
    const [cari, setCari] = useState('');
    const [hasilCari, setHasilCari] = useState([]);



    const getAcara = async (session) => {
        try {
            const acarasResponse = await fetch(`/api/seller/acara/read_acara/${session}`);
            const acarasData = await acarasResponse.json();

            if (acarasData) {
                // Ambil acara pertama

                setAcara(acarasData)
            }
        } catch (error) {
            console.error('Error saat mengambil data acara:', error);
        }
    }




    const findAcara = async (cari, session) => {
        if (cari.length > 0 && session) {
            const res = await fetch(`/api/seller/acara/cari_acara/${cari}/${session}`, {
                method: 'GET'
            })
            const acara = await res.json()
            if (acara == null) {

                setHasilCari([]) // Misalnya, mengatur ke array kosong)
            }
            setHasilCari(acara)
            // console.log("🚀 ~ useEffect ~ res:", acara)
        } else {
            // Setel hasil cari ke nilai default ketika input pencarian kosong atau terlalu pendek
            setHasilCari([]) // Misalnya, mengatur ke array kosong)
        }
    }


    useEffect(() => {
        if (session?.user?.id_user) {
            // Hanya melakukan fetch jika cari tidak kosong
            findAcara(cari, session?.user?.id_user)
            getAcara(session?.user?.id_user)
        }
    }, [cari, session?.user?.id_user]);

    const [isOpen, setIsOpen] = useState({});
    const toggleDropdown = (id) => {
        setIsOpen(prevState => ({ ...prevState, [id]: !prevState[id] }));
    };

    async function DeleteAcara(id_acara, id_banner_split) {
        console.log("🚀 ~ DeleteAcara ~ id_banner_split:", id_banner_split)
        // console.log(id_acara);
        try {
            const response = await fetch(`/api/seller/acara/delete_acara/${id_acara}`, {
                method: 'DELETE',

            });
            if (response.ok) {
                const result = await storage.deleteFile(
                    process.env.NEXT_PUBLIC_BUCKET_ID, // bucketId
                    id_banner_split // fileId
                );

                alert('berhasil hapus data')
                getAcara(session.user?.id_user)


            }
        } catch (error) {
            console.error('Error deleting data:', error);

        }
    }

    if (status == 'loading') {
        <Loading />
    }
    if (acaras.length == 0) {
        return (
            <>
                <div className="flex justify-between mb-4 h-10 mt-4 rounded-lg">
                    <div className="flex">
                        <form className="flex items-center" >
                            <label htmlFor="simple-search" className="sr-only">Cari</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <IoSearchOutline />
                                </div>
                                <input
                                    onChange={(e) => setCari(e.target.value)}
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-3 py-2"
                                    placeholder="Cari"
                                    value={cari}
                                    required />
                            </div>
                        </form>
                        <button onClick={() => router.refresh()} type="submit" className="px-3 rounded-lg py-2 ms-2 text-sm font-medium text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gardient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300">
                            <span className="">Reset</span>
                        </button>
                    </div>

                    <Link href={`acara/buat_acara`} className="px-3 mr-3 py-2 rounded-md text-sm font-medium text-center text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gardient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300">Buat Acara</Link>

                </div>
                <div className="container mx-auto">
                    <div className="grid grid-cols-* grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 mt-4">
                        <div className="border-2 border-gray-300 rounded-lg h-96 sm:h-96 md:h-44 lg:h-44 border-dashed flex justify-center items-center">
                            <p className="font-semibold text-normal text-gray-300">Tidak ada cara</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    if (acaras) {
        return (
            <>
                <div className="flex justify-between mb-4 h-10 mt-4 rounded-lg">
                    <div className="flex">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Cari</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <IoSearchOutline />
                                </div>
                                <input
                                    onChange={(e) => setCari(e.target.value)}
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-3 py-2"
                                    placeholder="Cari"
                                    value={cari}
                                    required />
                            </div>
                        </form>
                        <button onClick={() => router.refresh()} type="submit" className="px-3 rounded-lg py-2 ms-2 text-sm font-medium text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gardient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300">
                            <span className="">Reset</span>
                        </button>
                    </div>

                    <Link href={`acara/buat_acara`} className="px-3 mr-3 py-2 rounded-md text-sm font-medium text-center text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gardient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300">Buat Acara</Link>

                </div>

                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

                        {/* jika panjang string input cara 0 maka tampilkan data dari fetch data dari props */}
                        {/* selain dari 0 tampilkan card hasil carinya */}
                        {hasilCari.length === 0 ?
                            acaras.map(acara => {

                                // Split banner URL
                                const parts = acara.banner.split('/');
                                const id_banner_split = parts[8];
                                console.log("🚀 ~ CardAcara ~ id_banner_split:", id_banner_split)
                                return (
                                    <div key={acara.id_acara} className="relative bg-white">
                                        <Link href={`/detail_acara/${acara.id_acara}`}>
                                            <div className="border-2 border-gray-100 rounded-lg h-96 sm:h-96 md:h-full lg:h-44">
                                                <Image src={acara.banner} className="w-full md:h-24 object-cover rounded-t-md" width={40} height={25} alt="" />
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
                                        <button id={`dropdownHoverButton-${acara.id_acara}`} onClick={() => toggleDropdown(acara.id_acara)} className="absolute top-0 right-0 p-3 bg-gray-50 text-black rounded hover:bg-gray-200 flex items-center justify-center" data-dropdown-toggle={`dropdownHover-${acara.id_acara}`} data-dropdown-trigger="click">
                                            <HiOutlineDotsVertical />
                                        </button>
                                        {isOpen[acara.id_acara] && (
                                            <div id={`dropdownHover-${acara.id_acara}`} className="absolute top-0 right-0 mt-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                                <ul className="py-2 text-sm text-gray-700" aria-labelledby={`dropdownHoverButton-${acara.id_acara}`}>
                                                    <li>
                                                        <Link href={`/acara/edit_acara/${acara.id_acara}/${id_banner_split}`} className="block px-4 py-2 hover:bg-gray-100">Edit</Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => { DeleteAcara(acara.id_acara, id_banner_split) }} className="block text-left w-full px-4 py-2 hover:bg-gray-100">Delete</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )
                            }
                            )
                            : (
                                hasilCari.map(acara => {
                                    const parts = acara.banner.split('/');
                                    const id_banner_split = parts[8];
                                    console.log("🚀 ~ CardAcara ~ id_banner_split:", id_banner_split)

                                    return (
                                        <div key={acara.id_acara} className="relative bg-white">
                                            <Link href={`/detail_acara/${acara.id_acara}`}>
                                                <div className="border-2 border-gray-100 rounded-lg h-96 sm:h-96 md:h-full lg:h-44">
                                                    <Image src={acara.banner} className="w-full md:h-24 object-cover rounded-t-md" width={40} height={25} alt="" />
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
                                            <button onClick={() => toggleDropdown(acara.id_acara)} className="absolute top-0 right-0 p-3 bg-gray-50 text-black rounded hover:bg-gray-200 flex items-center justify-center">
                                                <HiOutlineDotsVertical />
                                            </button>
                                            {isOpen[acara.id_acara] && (
                                                <div className="absolute top-0 right-0 mt-12 bg-white rounded-md shadow-lg py-2">
                                                    <Link href={`/acara/edit_acara/${acara.id_acara}/${id_banner_split}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full">Edit</Link>
                                                    <button onClick={() => { DeleteAcara(acara.id_acara, id_banner_split) }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full">Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    )
                                }

                                )
                            )}
                    </div>
                </div>
            </>
        );
    }



}



