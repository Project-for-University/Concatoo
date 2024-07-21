'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Navbar() {
    const [query, setQuery] = useState('');
    console.log("🚀 ~ Navbar ~ query:", query)
    const [acara, setAcara] = useState([]);
    const [isOpenProfile, setIsOpen] = useState(false);
    const { data: session, status } = useSession()

    const router = useRouter();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim().length > 0) {
            router.push(`/search_acara?query=${encodeURIComponent(query)}`);
        }
    };


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
                                <span className="mb-1 text-3xl font-semibold whitespace-nowrap text-emerald-600">Concatoo</span>
                            </a>
                        </div>
                        <label htmlFor="simple-search" className="sr-only">Cari</label>
                        <form onSubmit={handleSearchSubmit} className="flex">
                            <label htmlFor="simple-search" className="sr-only">Cari</label>
                            <div className="relative w-full lg:w-96 hidden lg:block">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <IoSearchOutline />
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-3 py-2"
                                    placeholder="Cari"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)} // Mengupdate `query` setiap kali input berubah
                                />

                            </div>
                            <button type="submit" className="px-3 py-2 ms-2 text-sm font-medium text-white bg-gradient-to-b from-emerald-300 to-emerald-400 rounded-lg border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 hidden lg:block">
                                <span>Cari</span>
                            </button>
                        </form>
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
                                    <button onClick={() => signIn()} type="button" className="text-white bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">Masuk</button>
                                    {/* <button className="bg-white rounded-lg hover:bg-orange-100 p-2" onClick={() => signIn()}>Masuk</button> */}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
