'use client'
import { useEffect, useState } from 'react';

import Link from "next/link"
import { useSession } from "next-auth/react"


export default function CardDashboard() {
    const { data: session, status } = useSession()
    console.log("🚀 ~ CardDashboard ~ session:", session)
    const [total_acara, settotal_acara] = useState('');
    console.log("🚀 ~ CardDashboard ~ total_acara:", total_acara)


    const fetchData = async (session) => {
        const resacara = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seller/dashboard/total_acara/${session.user.id_user}`)
        const acara = await resacara.json()
        console.log("🚀 ~ fetchData ~ acara:", acara)
        settotal_acara(acara)

    }

    useEffect(() => {
        if (session) {
            fetchData(session)
        }
    }, [session]);

    return (
        <>

            <div className="flex flex-wrap -mx-2 my-4 ">
                <div className="w-full px-2 sm:w-1/2 md:w-1/3 lg:w-1/4 mt-4 md:-mt-1">
                    <Link href="#" className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                        <p className="font-normal text-gray-500">Total Acara</p>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{total_acara}</h5>
                    </Link>
                </div>

            </div>
        </>
    )
}