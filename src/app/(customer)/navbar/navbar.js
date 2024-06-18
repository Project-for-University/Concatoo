'use client'
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";

function Navbar() {
    const { data: session, status } = useSession()
    // console.log(session);
    // console.log(status);

    return (
        <nav class=" px-4 bg-white antialiased dark:bg-gray-800 border-b-2">
            <div class=" px-4 py-4 2xl:px-0">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-8">
                        <div class="shrink-0">
                            <a href="/" className="flex items-center justify-between mr-4">
                                <Image src={'/asset/logo.png'} alt="logo.png" width={40} height={40}></Image>
                                <span className="mb-1 text-3xl font-semibold whitespace-nowrap text-emerald-600">concert</span>
                            </a>
                        </div>

                        <ul class="hidden items-center justify-start gap-6 py-3 sm:justify-center md:gap-8 lg:flex">
                            <li>
                                <a href="#" title="" class="hover:text-primary-700 dark:hover:text-primary-500 flex text-sm font-medium text-gray-900 dark:text-white"> Home </a>
                            </li>
                            <li class="shrink-0">
                                <a href="#" title="" class="hover:text-primary-700 dark:hover:text-primary-500 flex text-sm font-medium text-gray-900 dark:text-white"> Best Sellers </a>
                            </li>
                            <li class="shrink-0">
                                <a href="#" title="" class="hover:text-primary-700 dark:hover:text-primary-500 flex text-sm font-medium text-gray-900 dark:text-white"> Gift Ideas </a>
                            </li>
                            <li class="shrink-0">
                                <a href="#" title="" class="hover:text-primary-700 dark:hover:text-primary-500 text-sm font-medium text-gray-900 dark:text-white"> Todays Deals </a>
                            </li>
                            <li class="shrink-0">
                                <a href="#" title="" class="hover:text-primary-700 dark:hover:text-primary-500 text-sm font-medium text-gray-900 dark:text-white"> Sell </a>
                            </li>
                        </ul>
                    </div>

                    <div class="flex items-center lg:space-x-2">
                        {status === 'authenticated' ? (
                            <>
                                <button id="userDropdownButton1" data-dropdown-toggle="userDropdown1" type="button" class="inline-flex items-center justify-center rounded-lg p-2 text-sm font-medium leading-none text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                    <svg class="me-1 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    Account
                                    <svg class="ms-1 h-4 w-4 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </button>

                                <div id="userDropdown1" class="z-10 hidden w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700">
                                    <ul class="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                                        <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> My Account </a></li>
                                        <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> My Orders </a></li>
                                        <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Settings </a></li>
                                        <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Favourites </a></li>
                                        <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Delivery Addresses </a></li>
                                        <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Billing Data </a></li>
                                    </ul>

                                    <div class="p-2 text-sm font-medium text-gray-900 dark:text-white">
                                        <button className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => signOut()}>Keluar</button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex space-x-4 ml-auto">
                                    <button onClick={() => signIn()} type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ">Masuk</button>
                                    {/* <button className="bg-white rounded-lg hover:bg-orange-100 p-2" onClick={() => signIn()}>Masuk</button> */}
                                </div>
                            </>
                        )}



                        <button type="button" data-collapse-toggle="ecommerce-navbar-menu-1" aria-controls="ecommerce-navbar-menu-1" aria-expanded="false" class="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 lg:hidden dark:text-white dark:hover:bg-gray-700">
                            <span class="sr-only"> Open Menu </span>
                            <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div id="ecommerce-navbar-menu-1" class="mt-4 hidden rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-600 dark:bg-gray-700">
                    <ul class="space-y-3 text-sm font-medium text-gray-900 dark:text-white dark:text-white">
                        <li>
                            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Home</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Best Sellers</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Gift Ideas</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Games</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Electronics</a>
                        </li>
                        <li>
                            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Home & Garden</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default Navbar
