'use client'
import { Suspense } from "react";
import Loading from "../loading";
import Image from "next/image";
import { RiMenu2Line } from "react-icons/ri";
import { useSession } from "next-auth/react"
import { MdAddCircleOutline, MdCorporateFare } from "react-icons/md";
import Link from "next/link";
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }) {
    const { data: session, status } = useSession()
    const pathname = usePathname()

    return (
        <Suspense fallback={<Loading />}>

            <div className="antialiased bg-gray-50 dark:bg-gray-900">
                <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex justify-start items-center">
                            <button
                                data-drawer-target="drawer-navigation"
                                data-drawer-toggle="drawer-navigation"
                                aria-controls="drawer-navigation"
                                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <RiMenu2Line />
                                <span className="sr-only">Toggle sidebar</span>
                            </button>
                            <a href="https://flowbite.com" className="flex items-center justify-between mr-4">
                                <Image src={'/asset/logo.png'} alt="logo.png" width={30} height={30}></Image>
                                <span className="self-center text-2xl font-semibold whitespace-nowrap text-emerald-600">concert</span>
                            </a>

                        </div>
                        <div className="flex items-center lg:order-2">
                            {status === 'authenticated' ? (
                                <>
                                    <button
                                        type="button"
                                        className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdownuser_profile"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <Image width={500} height={500}
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                                            alt="user photo"
                                        />
                                    </button>
                                    {/* <!-- Dropdown menu --> */}
                                    <div
                                        className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 "
                                        id="dropdownuser_profile">
                                        <div className="py-3 px-4">
                                            <span
                                                className="block text-sm font-semibold text-gray-900 dark:text-white"
                                            >Neil Sims</span
                                            >
                                            <span
                                                className="block text-sm text-gray-900 truncate dark:text-white"
                                            >name@flowbite.com</span
                                            >
                                        </div>
                                        <ul
                                            className="py-1 text-gray-700 dark:text-gray-300"
                                            aria-labelledby="dropdown"
                                        >
                                            <li>
                                                <Link
                                                    href="#"
                                                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                                                >
                                                    My profile
                                                </Link>
                                            </li>
                                        </ul>
                                        <ul className="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
                                            <li>
                                                <button
                                                    onClick={() => signOut()}
                                                    className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                    Keluar
                                                </button>
                                            </li>
                                        </ul>
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
                    class="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                    aria-label="Sidenav"
                    id="drawer-navigation"
                >
                    <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800 ">
                        {/* <ul class="space-y-2 pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"> */}
                        <ul class="space-y-2">
                            <li>
                                <Link
                                    href={`/dashboard`}
                                    class={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/dashboard' ? 'text-emerald-600 bg-emerald-100' : ''}`}
                                >
                                    <MdCorporateFare className="mr-4" size={24} />
                                    <span class="ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={`/acara2`}
                                    class={`flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${pathname === '/acara2' ? 'text-emerald-600 bg-emerald-100' : ''}`}
                                >
                                    <MdAddCircleOutline className="mr-4" size={24} />
                                    <span class="ml-3">Acara</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                </aside>



                <main class="h-auto p-4 pt-20 md:ml-64 border-2 border-dashed border-gray-300">
                    {children}


                    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 sticky">
                        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                            <div class="sm:flex sm:items-center sm:justify-between">
                                <Link href="/dashboard" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                                    <Image width={80} height={80} src={'/asset/logo.png'} alt="Logo" />
                                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Concert</span>
                                </Link>
                                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
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
                            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024. All Rights Reserved.</span>
                        </div>
                    </footer>
                </main>


            </div >


        </Suspense >
    )
}
