'use client'
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";

export default function Page() {
    const [acaras, setAcara] = useState([]);
    const [Del, setmDel] = useState([]);

    useEffect(() => {
        async function fetchData() {
    
          try {
            // Fetch acaras
            const acarasResponse = await fetch('/api/seller/acara/read_acara', {
              method: 'GET'
            });
            const acarasData = await acarasResponse.json();
            // console.log(acarasData);
            // Set acaras state
            if (acarasData) {
              setAcara(acarasData);
            } else {
              console.error("Expected an array of acaras but received:", typeof acarasData);
              setAcara([]);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setAcara([]);
          }
        }
    
    
        fetchData();
      }, []);

      async function DeleteAcara(id_acara) {
        // console.log(id_acara);
        try {
          const response = await fetch(`/api/seller/acara/delete_acara/${id_acara}`, {
            method: 'DELETE',
    
          });
    
          if (response.ok) {
            // console.log('berhasil hapus');
            // kalo berhasil update read data terbaru
            const acarasResponse = await fetch('/api/seller/acara/read_acara');
            const acarasData = await acarasResponse.json();
            // console.log(acarasData);
            // Set acaras state
            if (Array.isArray(acarasData)) {
              setAcara(acarasData);
              setmDel({ message: 'behasil hapus data' })
            } else {
              console.error("Expected an array of acaras but received:", typeof acarasData);
              setAcara([]);
            }
    
          } else {
            const message = await response.json();
            setmDel({ message: 'dadal hapus data', details: message });
          }
        } catch (error) {
          console.error('Error deleting data:', error);
          setmDel({ message: 'gagal hapus data', details: error.message });
        }
      }
    
    return (
        <>
            {/* buat button search   */}
            <div class="flex justify-between mb-4 h-10 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">

                <form class="flex items-center ">
                    <label for="simple-search" class="sr-only">Cari</label>
                    <div class="relative w-full ">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <IoSearchOutline />
                        </div>
                        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full ps-10 px-3 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500" placeholder="Cari" required />
                    </div>
                    <button type="submit" class="px-3 py-2 ms-2 text-sm font-medium text-white bg-emerald-700 rounded-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
                        <span class="">Cari</span>
                    </button>
                </form>

                <Link href={`acara/buat_acara`} class="px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Buat Acara</Link>  
                {Del?.message && <div className="text-emerald-600">{Del.message}</div>}          
                </div>

            {/* buat card */}
            <div class="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {acaras.map((acara) => (
                <div key={acara.id_acara} class="relative h-full w-full max-w-sm rounded-lg  border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800 md:h-64 ">
                    <Link href={`detail_acara2/${acara.id_acara}`}>
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
                        <Image src={acara.banner} width={200} height={200} class="mb-3 h-40 w-full object-cover rounded-t-lg" alt="Author" />
                        <div class="px-4">
                            <h5 class="mb-1 text-lg font-medium text-gray-900 dark:text-white">{acara.nama_event}</h5>
                            <span class="text-sm text-gray-500 dark:text-gray-400">{new Date(acara.tanggal_acara).toLocaleDateString()} - {new Date(acara.waktu_acara).toLocaleTimeString()}                            </span>
                        </div>
                    </div>
                    </Link>
                </div>
            ))}
            </div>
            <div
                class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
            >
                tidak ada acara

            </div>



        </>
    )
}