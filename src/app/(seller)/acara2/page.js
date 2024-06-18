import Image from "next/image";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
export default function Page() {
    return (
        <>
            {/* buat button search   */}
            <div class="flex justify-between mb-4 h-10 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">

                <form class="flex items-center ">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full ">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <IoSearchOutline />
                        </div>
                        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 px-3 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                    </div>
                    <button type="submit" class="px-3 py-2 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <span class="">Search</span>
                    </button>
                </form>

                <button type="button" class="px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Small</button>            </div>

            {/* buat card */}
            <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="relative h-full w-full max-w-sm rounded-lg  border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 md:h-64 ">
                    <div class="absolute right-0 flex px-4 pt-4">
                        <button id="dropdownButton" data-dropdown-toggle="dropdown" class=" border-2 inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700" type="button">
                            <span class="sr-only">Open dropdown</span>
                            <HiDotsHorizontal />
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div id="dropdown" class="z-10 hidden w-44 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700">
                            <ul class="py-2" aria-labelledby="dropdownButton">
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Export Data</a>
                                </li>
                                <li>
                                    <a href="#" class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="flex flex-col w-full">
                        <Image width={200} height={200} class="mb-3 h-40 w-full object-cover rounded-t-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png" alt="Bonnie image" />
                        <div class="px-4">
                            <h5 class="mb-1 text-lg font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                            <span class="text-sm text-gray-500 dark:text-gray-400">Rp 200.000</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
            >
                tidak ada acara

            </div>



        </>
    )
}