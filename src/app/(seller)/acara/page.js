'use client'


import Image from 'next/image';
import Link from 'next/link';
import Sidebar from '../dashboard/component/sidebar';
import Navbar from '../dashboard/component/navbar';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { useEffect, useState } from 'react';






export default function Acara() {

  // get data acara
  const [acaras, setAcara] = useState([]);
  const [Del, setmDel] = useState([]);
  // console.log(Del);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch acaras
        const acarasResponse = await fetch('/api/seller/acara/read_acara');
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
        method: 'DELETE'
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
    <div className="">
      <Navbar />
      {/* <div className="flex justify-center">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li class="inline-flex items-center">
              <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                </svg>
                Home
              </a>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <a href="#" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Projects</a>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Flowbite</span>
              </div>
            </li>
          </ol>
        </nav>
      </div> */}

      <div className="flex justify-between">
        <Sidebar />
        <main className="flex-1 p-4">
          <Link className="bg-gradient-to-b from-emerald-300 to-emerald-400 hover:bg-emerald-100 text-white border rounded-lg p-2  " href={`acara/buat_acara`}>+ Tambah Acara</Link>
          {Del?.message && <div className="text-emerald-600">{Del.message}</div>}
          <div className="grid grid-cols-3 gap-4 p-8">
            {acaras.map((acara) => (
              <div key={acara.id_acara} className="relative bg-white rounded-md overflow-hidden w-fit" >
                <Link href={`detail_acara/${acara.id_acara}`}>
                  <Image src={acara.banner} width={500} height={200} alt="Picture of the author" className="object-cover w-[350px] h-[200px] rounded" />
                  <div className="flex justify-between p-4">
                    <h3 className="font-bold">{acara.nama_event}</h3>
                    <p className="text-gray-600">
                      {new Date(acara.tanggal_acara).toLocaleDateString()} - {new Date(acara.waktu_acara).toLocaleTimeString()}
                    </p>
                  </div>
                </Link>
                <div className="absolute top-4 right-4 flex space-x-4">
                  <Link href={`acara/edit_acara/${acara.id_acara}`} className='bg-white p-2 rounded-full'>
                    <MdOutlineEdit className="text-emerald-500 hover:text-emerald-700" />
                  </Link>

                  <button onClick={() => { DeleteAcara(acara.id_acara) }} className='bg-white p-2 rounded-full'>
                    <MdDeleteOutline className="text-emerald-500 hover:text-emerald-700" />
                  </button>
                </div>
              </div>
            ))}

          </div>
        </main>
      </div >
    </div >
  )
}
