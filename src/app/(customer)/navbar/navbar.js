'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";

function Navbar() {
    const { data: session, status } = useSession()
    // console.log(session);
    // console.log(status);

    return (
        // <div className="flex justify-between items-center mb-4 w-full px-4">
        <div className="flex flex-row px-4 border-b-2 border-emerald-600 pb-4">
        <Link href="/">
            <Image src={'/asset/logo.png'} alt="logo.png" className="w-10" width={100} height={100}></Image>
        </Link>
        <form className="max-w-md mx-auto w-full">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Cari Acara" required />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Cari</button>
            </div>
        </form>

            {status === 'authenticated' ? (
                <button
                    onClick={() => signOut()}
                    className="text-black px-3 py-3">Sign out</button>
            ) : (
                <div className="flex space-x-4">
                    <button className="px-3 py-3 bg-transparent text-emerald-900 rounded-lg border-2 border-emerald-400 hover:bg-emerald-500 transition-colors" onClick={() => signIn()}>Masuk</button>
                    <a className="px-3 py-3 bg-emerald-400 text-white rounded-lg hover:bg-emerald-500 transition-colors" href="/auth/register">Register</a>
                </div>
            )}
        </div>
    )
}

export default Navbar
