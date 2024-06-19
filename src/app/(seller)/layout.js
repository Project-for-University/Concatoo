'use client'
import { Suspense } from "react";
import Loading from "../loading";
import Image from "next/image";
import { RiMenu2Line } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react"
import { MdAddCircleOutline, MdCorporateFare } from "react-icons/md";
import Link from "next/link";
import { usePathname } from 'next/navigation'


export default function RootLayout({ children }) {

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
                                <span className="self-center text-2xl font-semibold whitespace-nowrap text-emerald-600">concert</span>
                            </Link>

                        </div>
                        <div className="flex items-center lg:order-2">
                            {status === 'authenticated' ? (
                                <>
                                    <button id="userDropdownButton1" data-dropdown-toggle="userDropdown1" type="button" class="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100">
                                        <svg class="me-1 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        Account
                                        <svg class="ms-1 h-4 w-4 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div id="userDropdown1" class="z-10 hidden w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow">
                                        <ul class="p-2 text-start text-sm font-medium text-gray-900">
                                            <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"> My Account </a></li>

                                        </ul>

                                        <div class="p-2 text-sm font-medium text-gray-900">
                                            <button className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100" onClick={() => signOut()}>Keluar</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex space-x-4 ml-auto">
                                        <button className="bg-white rounded-lg hover:bg-orange-100 p-2" onClick={() => signIn()}>Masuk</button>
                                        <Link className="bg-white hover:bg-orange-100 p-2" href="/auth/register">Daftar</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <aside
                    class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0"
                    aria-label="Sidenav"
                    id="drawer-navigation"
                >
                    <div class="overflow-y-auto py-5 px-3 h-full bg-white">
                        {/* <ul class="space-y-2 pt-5 mt-5 space-y-2 border-t border-gray-200"> */}
                        <ul class="space-y-2">
                            <li>
                                <Link
                                    href={`/dashboard`}
                                    class={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group ${pathname === '/dashboard' ? 'text-emerald-600 bg-emerald-100' : ''}`}
                                >
                                    <MdCorporateFare className="mr-4" size={24} />
                                    <span class="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/acara2`}
                                    class={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg hover:bg-gray-100 group ${pathname === '/acara2' ? 'text-emerald-600 bg-emerald-100' : ''}`}
                                >
                                    <MdAddCircleOutline className="mr-4" size={24} />
                                    <span class="ml-3">Acara</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </aside>



                <main class="h-screen p-4 pt-20 md:ml-64 border-2 border-dashed border-gray-300">
                    {children}


                    <footer class="bg-white rounded-lg shadow">
                        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                            <div class="sm:flex sm:items-center sm:justify-between">
                                <Link href="/dashboard" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                                    <Image width={80} height={80} src={'/asset/logo.png'} alt="Logo" />
                                    <span class="self-center text-2xl font-semibold whitespace-nowrap">Concert</span>
                                </Link>
                                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                                    <li>
                                        <a href="#" class="hover:underline me-4 md:me-6">About</a>
                                    </li>
                                    <li>
                                        <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                                    </li>
                                    <li>
                                        <a href="#" class="hover:underline">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                            <span class="block text-sm text-gray-500 sm:text-center">© 2024. All Rights Reserved.</span>
                        </div>
                    </footer>
                </main>


            </div >


        </Suspense >
    )
}
