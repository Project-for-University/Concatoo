'use client'


import Link from "next/link"
import Navbar from "./component/navbar"
import Sidebar from "./component/sidebar"

export default function Pages() {

    return (
        <>
            <div className="flex">

                <div className="flex flex-cols-3 w-full mx-4 my-6">
                    <div className="mx-2">
                        <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Acara</h5>
                            <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </Link>
                    </div>
                    <div className="mx-2">
                        <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Total Tiket</h5>
                            <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </Link>
                    </div>
                    <div className="mx-2">
                        <Link href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                            <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </Link>
                    </div>
                </div>
            </div>
            <h1 className="">dashboard</h1>

        </>
    )
}