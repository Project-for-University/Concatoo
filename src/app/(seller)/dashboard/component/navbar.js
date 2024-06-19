import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
export default function Navbar() {
    const { data: session, status } = useSession()
    // console.log(session);
    // console.log(status);
    return (
        <nav className="bg-white p-4 border">
            <div className="container mx-auto flex justify-between items-center">
                <div className="pl-6 flex">
                    <a href="/dashboard">
                        <Image src={'/asset/logo.png'} alt="logo.png" width={45} height={45}></Image>
                    </a>
                    <p className="pl-2 content-center text-green-500 font-medium">Concert</p>
                </div>
                <form className="max-w-md mx-auto w-full">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Cari Acara" required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2">Cari</button>
                    </div>
                </form>
                <div className="pr-4">
                    {status === 'authenticated' ? (
                        <button
                            onClick={() => signOut()}
                            className="p-2 text-black ml-auto">Keluar</button>
                    ) : (
                        <div className="flex space-x-4 ml-auto">
                            <button className="bg-white rounded-lg hover:bg-orange-100 p-2" onClick={() => signIn()}>Masuk</button>
                            <Link className="bg-white hover:bg-orange-100 p-2" href="/auth/register">Daftar</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}