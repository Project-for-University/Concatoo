'use client'
import { Suspense, useEffect } from "react";
import Loading from "../loading";
import Image from "next/image";
import { RiMenu2Line } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react"
import { MdAddCircleOutline, MdCorporateFare } from "react-icons/md";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { useState } from 'react';


export default function RootLayout({ children }) {
    const [isOpenProfile, setIsOpen] = useState(false);
    const [User, setUser] = useState('');
    console.log("🚀 ~ RootLayout ~ User:", User)
    const { data: session, status } = useSession()
    console.log("🚀 ~ RootLayout ~ status:", status)
    console.log("🚀 ~ RootLayout ~ session:", session)
    console.log("🚀 ~ RootLayout ~ session:", session?.user?.avatar)
    const pathname = usePathname()


    return (
        <Suspense fallback={<Loading />}>

            <div className="antialiased bg-gray-50">
                <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex justify-start items-center">
                            <button
                                data-drawer-target="drawer-navigation"
                                data-drawer-toggle="drawer-navigation"
                                aria-controls="drawer-navigation"
                                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100"
                            >
                                <RiMenu2Line />
                                <span className="sr-only">Toggle sidebar</span>
                            </button>
                            <Link href={'/'} className="flex items-center justify-between mr-4">
                                <Image src={'/asset/logo.png'} alt="logo.png" width={40} height={40}></Image>
                                <span className="self-center text-2xl font-semibold whitespace-nowrap text-emerald-600">Concatoo</span>
                            </Link>
                            {/* input search */}
                            {/* <label htmlFor="simple-search" className="sr-only">Cari</label>
                            <div className="relative w-96 ml-28">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <IoSearchOutline />
                                </div>
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-3 py-2" placeholder="Cari" required />
                            </div>
                            <button type="submit" className="px-3 py-2 ms-2 text-sm font-medium text-white bg-gradient-to-b from-emerald-300 to-emerald-400 rounded-lg border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300">
                                <span className="">Cari</span>
                            </button> */}
                        </div>
                        <div className="flex items-center lg:order-2">
                            {status === 'authenticated' ? (
                                <>
                                    <div className="relative inline-block text-left">
                                        <button onClick={() => { setIsOpen(!isOpenProfile) }} type="button" className="text-white bg-gradient-to-b from-emerald-300 to-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center" id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover">
                                            <p className="mr-2">{session.user.name}</p>
                                            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                                                {session?.user?.avatar ? (
                                                    <Image


                                                        src={session.user.avatar} // Ganti dengan path gambar kamu
                                                        alt="Iqbal Herlambang"
                                                        width={5} height={5} className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <Image


                                                        src={'/asset/avatar.png'} // Ganti dengan path gambar kamu
                                                        alt="Iqbal Herlambang"
                                                        width={5} height={5} className="w-full h-full object-cover"
                                                    />
                                                )}

                                                {/* <Image src={'/asset/avatar.png'} alt="" width={5} height={5} className="w-full h-full object-cover" /> */}
                                            </div>
                                        </button>

                                        <div id="dropdownHover" className={`z-10 ${isOpenProfile ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute right-0 mt-2`}>
                                            <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownHoverButton">
                                                <li>
                                                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                                                </li>
                                                <li>
                                                    <button onClick={() => signOut({ callbackUrl: '/' })} className="block text-left w-full px-4 py-2 hover:bg-gray-100">Keluar</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex space-x-4 ml-auto">
                                        <button onClick={() => signIn()} type="button" className="text-white px-4 py-2 rounded-md bg-gradient-to-b from-emerald-300 to-emerald-400 focus:ring-4 focus:outline-none focus:ring-emerald-300">Masuk</button>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                </nav>

                <button data-drawer-target="drawer-navigation" data-drawer-toggle="drawer-navigation" aria-controls="drawer-navigation" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>
                <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 mt-4 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidenav" id="drawer-navigation">
                    <div className="overflow-y-auto py-5 px-3 h-full bg-white">
                        <ul className="space-y-2">
                            <li>
                                <Link href={`/dashboard`} className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group ${pathname === '/dashboard' ? 'text-emerald-600 bg-emerald-100' : ''}`}>
                                    <MdCorporateFare className="mr-4" size={24} />
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link href={`/acara`} className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group ${pathname === '/acara' ? 'text-emerald-600 bg-emerald-100' : ''}`}>
                                    <MdAddCircleOutline className="mr-4" size={24} />
                                    <span className="ml-3">Acara</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>


                <main className="h-full p-4 pt-20 md:ml-64">

                    {children}

                    <footer className="bg-white rounded-lg shadow">
                        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                            <div className="sm:flex sm:items-center sm:justify-between">
                                <Link href="/dashboard" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                                    <Image width={80} height={80} src={'/asset/logo.png'} alt="Logo" />
                                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-emerald-600">Concatoo</span>
                                </Link>
                                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                                    <li>
                                        <Link href="/about" className="hover:underline me-4 md:me-6">About</Link>
                                    </li>
                                </ul>
                            </div>
                            <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                            <span className="block text-sm text-gray-500 sm:text-center">© 2024. All Rights Reserved.</span>
                        </div>
                    </footer>
                </main>


            </div >


        </Suspense >
    )
}
