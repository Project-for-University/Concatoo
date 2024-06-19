'use client'

import Navbar from '@/app/(seller)/dashboard/component/navbar';
import Sidebar from '@/app/(seller)/dashboard/component/sidebar';
import { HiOutlineDotsVertical } from "react-icons/hi";
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
    const [isOpen, setIsOpen] = useState(false);
    console.log(param.id);
    const [acara, setAcara] = useState([]);
    console.log("🚀 ~ Card ~ acara:", acara)
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
                method: 'GET',


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
    const tanggalAcara = new Date(acara.tanggal_acara);
    const formattedDate = tanggalAcara.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* <!-- detail acara --> */}
                <div className="sm: rounded-lg border-2 border-dashed border-gray-300 md:full lg:col-span-2 dark:border-gray-600">

                    <div className="rounded-lg md:relative lg:relative border border-gray-200 bg-white p-4 shadow-sm md:p-6 dark:border-gray-700 dark:bg-gray-800">
                        <Image height={100} width={100} className="hidden h-full w-full dark:block" src="" alt="imac image" />
                        <h1>Deskripsi</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex quo nulla voluptatibus qui doloremque distinctio modi saepe placeat, dolorum odit.</p>
                    </div>

                </div>
                {/* <!-- akhir detail acara --> */}
                <div className="rounded-lg border-2 border-dashed border-gray-300 md:full dark:border-gray-600">
                    {/* <!-- tiket --> */}
                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        {/*  */}
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-gray-700 dark:bg-gray-800">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">$7,592.00</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">$8,191.00</dd>
                                </dl>
                            </div>
                        </div>
                        {/* <!-- tiket --> */}
                        <div className="relative inline-block text-left">
                            <div>
                                <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true" onClick={() => setIsOpen(!isOpen)}>
                                    <HiOutlineDotsVertical className="text-gray-900 dark:text-white" />
                                </button>
                            </div>

                            {isOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Edit</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Delete</a>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <!-- akhir tiket --> */}
                    </div>
                    {/* <!-- tiket --> */}
                </div>
            </div>
        </>
    )
}