'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { useState } from 'react';


function Navbar() {
    const [isOpenProfile, setIsOpen] = useState(false);
    const { data: session, status } = useSession()

    console.log(session);
    console.log(status);

    return (
        <nav className=" px-4 bg-white antialiased border-b-2">
            <div className=" px-4 py-4 2xl:px-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <div className="shrink-0 mr-24">
                            <a href="/" className="flex items-center justify-between mr-4">
                                <Image src={'/asset/logo.png'} alt="logo.png" width={40} height={40}></Image>
                                <span className="mb-1 text-3xl font-semibold whitespace-nowrap text-emerald-600">concert</span>
                            </a>
                        </div>
                        <label htmlFor="simple-search" className="sr-only">Cari</label>
                            <div className="relative w-96">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <IoSearchOutline />
                                </div>
                                <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-3 py-2" placeholder="Cari" required />
                            </div>
                            <button type="submit" className="px-3 py-2 ms-2 text-sm font-medium text-white bg-gradient-to-b from-emerald-300 to-emerald-400 rounded-lg border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300">
                                <span className="">Cari</span>
                            </button>
                    </div>

                    <div className="flex items-center lg:space-x-2">
                        {status === 'authenticated' ? (
                            <>
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button onClick={() => { setIsOpen(!isOpenProfile) }} type="button" className="text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2" id="options-menu" aria-haspopup="true" aria-expanded="true" >
                                            <p className="mr-2">{session.user.name}</p>
                                            <IoPersonOutline />
                                        </button>
                                    </div>

                                    {isOpenProfile && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
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
                                    <button onClick={() => signIn()} type="button" class="text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">Masuk</button>
                                    {/* <button className="bg-white rounded-lg hover:bg-orange-100 p-2" onClick={() => signIn()}>Masuk</button> */}
                                </div>
                            </>
                        )}



                        {/* <button type="button" data-collapse-toggle="ecommerce-navbar-menu-1" aria-controls="ecommerce-navbar-menu-1" aria-expanded="false" class="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 lg:hidden">
                            <span className="sr-only"> Open Menu </span>
                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
                            </svg>
                        </button> */}
                    </div>
                </div>

                {/* <div id="ecommerce-navbar-menu-1" clas="mt-4 hidden rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                    <ul clas="space-y-3 text-sm font-medium text-gray-900 ">
                        <li>
                            <a href="#" clas="hover:text-primary-700">Home</a>
                        </li>
                        <li>
                            <a href="#" clas="hover:text-primary-700">Best Sellers</a>
                        </li>
                        <li>
                            <a href="#" clas="hover:text-primary-700">Gift Ideas</a>
                        </li>
                        <li>
                            <a href="#" clas="hover:text-primary-700">Games</a>
                        </li>
                        <li>
                            <a href="#" clas="hover:text-primary-700">Electronics</a>
                        </li>
                        <li>
                            <a href="#" clas="hover:text-primary-700">Home & Garden</a>
                        </li>
                    </ul>
                </div> */}
            </div>
        </nav>

    )
}

export default Navbar
