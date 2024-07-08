'use client'

import React from 'react';
import { SlCheck, SlClose } from "react-icons/sl";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';



export default function ListSeller() {



    const [data, setData] = useState([]);
    console.log(data);



    const fetchData = async () => {
        const sellerResponse = await fetch(`/api/operator/list_seller/read_seller`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(sellerResponse);
        const sellerData = await sellerResponse.json();
        console.log(sellerData);
        setData(sellerData);
    };

    useEffect(() => {
        fetchData();
    }, []);




    async function Non_aktifkan(id_user) {
        console.log(id_user);

        const res = await fetch(`/api/operator/list_seller/non_aktifkan/${id_user}`, {
            method: 'PATCH',
        });

        if (res.ok) {
            fetchData()
        }
    }
    async function Aktifkan(id_user) {
        console.log(id_user);

        const res = await fetch(`/api/operator/list_seller/aktifkan/${id_user}`, {
            method: 'PATCH',
        });

        if (res.ok) {
            fetchData()
        }
    }

    return (
        <div className="overflow-x-auto mb-8">
            {data.length === 0 ? (
                <div className="border-2 border-dashed rounded-lg border-gray-300 text-gray-300 h-44 mb-4 flex items-center justify-center">
                    tidak ada seller
                </div>
            ) : (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className=" px-6 py-3 border-b-2 border-gray-100 text-left leading-4 text-gray-800 tracking-wider">No</th>
                            <th className="px-6 py-3 border-b-2 border-gray-100 text-left leading-4 text-gray-800 tracking-wider">PP</th>
                            <th className="px-6 py-3 border-b-2 border-gray-100 text-left leading-4 text-gray-800 tracking-wider">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-100 text-left leading-4 text-gray-800 tracking-wider">Email</th>
                            <th className="px-6 py-3 border-b-2 border-gray-100 text-left leading-4 text-gray-800 tracking-wider">No HP</th>
                            <th className="px-6 py-3 border-b-2 border-gray-100 text-left leading-4 text-gray-800 tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((seller, index) => (
                            <tr key={console.log(seller.id_user)}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-gray-500">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-gray-500">{seller.avatar || <Image src={`/asset/avatar.png`} alt="avatar" width={25} height={25} />}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-gray-500">{seller.name}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-gray-500">{seller.email}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-gray-500">{seller.phonenumber || <p>kosong</p>}</td>
                                <td className="flex px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    {/* Example logic for toggling status - this needs actual implementation */}
                                    {seller.status === 'AKTIF' ? (
                                        <button onClick={() => Non_aktifkan(seller.id_user)} className="flex px-3 items-center py-2 text-sm rounded-md font-medium text-center text-rose-500 border border-rose-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-rose-300">
                                            <SlClose className="mr-2" />
                                            Non-Aktifkan
                                        </button>
                                    ) : (
                                        <button onClick={() => Aktifkan(seller.id_user)} className="flex px-3 items-center py-2 text-sm rounded-md font-medium text-center text-emerald-500 border border-emerald-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300">
                                            <SlCheck className="mr-2" />
                                            Aktifkan
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div >
    );
}

