'use client'
import { Suspense } from "react";
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
    const { data: session, status } = useSession()
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
                                        <div>
                                            <button onClick={() => { setIsOpen(!isOpenProfile) }} type="button" className="text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center me-2 mb-2" id="options-menu" aria-haspopup="true" aria-expanded="true" >
                                                <p className="mr-2">{session.user.name}</p>
                                                <div class="w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-white">
                                                    <Image src={'/asset/logo.png'} alt="" width={5} height={5} class="w-full h-full object-cover" />
                                                </div>
                                            </button>
                                        </div>

                                        {isOpenProfile && (
                                            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                <div className="py-1 hover:bg-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    {/* <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</Link> */}
                                                    <button onClick="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 " role="menuitem">Pengaturan</button>
                                                </div>
                                                <div className="py-1 flex justify-between hover:bg-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                                    {/* <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</Link> */}
                                                    <button onClick={() => signOut({ callbackUrl: '/' })} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 " role="menuitem">Keluar</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex space-x-4 ml-auto">
                                        <button onClick={() => signIn()} type="button" className="text-white px-4 py-2 rounded-md bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300">Masuk</button>
                                        {/* <button classNameName="bg-white rounded-lg hover:bg-orange-100 p-2" onClick={() => signIn()}>Masuk</button> */}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <aside
                    className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 mt-4 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0"
                    aria-label="Sidenav"
                    id="drawer-navigation"
                >
                    <div className="overflow-y-auto py-5 px-3 h-full bg-white">
                        {/* <ul className="space-y-2 pt-5 mt-5 space-y-2 border-t border-gray-200"> */}
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href={`/dashboard`}
                                    className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group ${pathname === '/dashboard' ? 'text-emerald-600 bg-emerald-100' : ''}`}
                                >
                                    <MdCorporateFare className="mr-4" size={24} />
                                    <span className="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/acara`}
                                    className={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group ${pathname === '/acara' ? 'text-emerald-600 bg-emerald-100' : ''}`}
                                >
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
                                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:underline">Contact</a>
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
